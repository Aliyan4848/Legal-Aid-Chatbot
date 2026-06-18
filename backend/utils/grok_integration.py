import os
from typing import Optional

from groq import Groq

class GrokClient:
    """Client for interacting with Grok API"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY") or os.getenv("GROK_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable not set")
        self.client = Groq(api_key=self.api_key)
        self.model = os.getenv("GROQ_MODEL", os.getenv("GROK_MODEL", "llama-3.3-70b-versatile"))
    
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
        try:
            response = self.client.chat.completions.create(
                messages=messages,
                model=self.model,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            return response.choices[0].message.content
        except Exception as e:
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
