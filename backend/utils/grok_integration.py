import os
import requests
from typing import Optional

GROK_API_URL = "https://api.x.ai/v1/chat/completions"

class GrokClient:
    """Client for interacting with Grok API"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GROK_API_KEY")
        if not self.api_key:
            raise ValueError("GROK_API_KEY environment variable not set")
        self.base_url = GROK_API_URL
    
    def chat(self, messages: list, temperature: float = 0.7, max_tokens: int = 2000) -> str:
        """
        Send a chat request to Grok API
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            temperature: Temperature for response generation
            max_tokens: Maximum tokens in response
            
        Returns:
            Response text from Grok API
        """
        headers = {
            "Authorization": f"******",
            "Content-Type": "application/json",
        }
        
        payload = {
            "messages": messages,
            "model": "grok-2",
            "temperature": temperature,
            "max_tokens": max_tokens,
        }
        
        try:
            response = requests.post(
                self.base_url,
                json=payload,
                headers=headers,
                timeout=30
            )
            response.raise_for_status()
            
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except requests.exceptions.RequestException as e:
            raise Exception(f"Grok API error: {str(e)}")
    
    def get_legal_advice(self, query: str, context: str = "") -> str:
        """
        Get legal advice from Grok based on Pakistani laws
        
        Args:
            query: User's legal question
            context: Additional context about the question
            
        Returns:
            Legal advice response
        """
        system_message = """You are an expert Pakistani legal advisor with deep knowledge of:
- The Constitution of Pakistan (1973)
- Pakistan Penal Code
- Civil Procedure Code
- Criminal Procedure Code
- Family Law Ordinance
- Labor Laws of Pakistan
- Business laws in Pakistan

Provide accurate legal guidance based on Pakistani laws and constitution. Always:
1. Cite relevant articles/sections from Pakistani laws
2. Explain the law in simple Urdu/English
3. Provide practical guidance
4. Recommend consulting with a qualified lawyer for complex cases
5. Include relevant contact information for legal aid organizations in Pakistan

Be professional, empathetic, and practical in your responses."""
        
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"{context}\n\nQuestion: {query}" if context else f"Question: {query}"}
        ]
        
        return self.chat(messages, temperature=0.5, max_tokens=2000)
