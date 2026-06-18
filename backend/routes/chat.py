from flask import Blueprint, request, jsonify
from utils.grok_integration import GrokClient
from utils.legal_knowledge import get_legal_category_info, get_all_categories
import os

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

# Store conversation history per session
conversations = {}

@chat_bp.route('/message', methods=['POST'])
def send_message():
    """Send a legal query and get response from Grok API"""
    try:
        data = request.get_json()
        message = data.get('message')
        session_id = data.get('session_id', 'default')
        category = data.get('category', '')
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Initialize Grok client
        grok_client = GrokClient()
        
        # Build context if category specified
        context = ""
        if category:
            cat_info = get_legal_category_info(category)
            if cat_info:
                context = f"Category: {cat_info.get('name')}\nMain Law: {cat_info.get('main_law')}"
        
        # Get response from Grok
        response_text = grok_client.get_legal_advice(message, context)
        
        # Store in conversation history
        if session_id not in conversations:
            conversations[session_id] = []
        
        conversations[session_id].append({
            'role': 'user',
            'content': message
        })
        conversations[session_id].append({
            'role': 'assistant',
            'content': response_text
        })
        
        return jsonify({
            'success': True,
            'response': response_text,
            'session_id': session_id
        })
    
    except ValueError:
        return jsonify({'error': 'Invalid request parameters'}), 400
    except Exception as e:
        # Log error but don't expose stack trace to client
        import logging
        logging.error(f"Error processing request: {str(e)}")
        error_text = str(e)
        if error_text.startswith('Grok API error') or 'GROK_API_KEY environment variable not set' in error_text:
            return jsonify({'error': error_text}), 502
        return jsonify({'error': 'Error processing request. Please try again.'}), 500

@chat_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all legal categories"""
    try:
        categories = get_all_categories()
        return jsonify({
            'success': True,
            'categories': categories
        })
    except Exception as e:
        import logging
        logging.error(f"Error fetching categories: {str(e)}")
        return jsonify({'error': 'Error fetching categories'}), 500

@chat_bp.route('/history/<session_id>', methods=['GET'])
def get_history(session_id):
    """Get conversation history for a session"""
    try:
        history = conversations.get(session_id, [])
        return jsonify({
            'success': True,
            'history': history,
            'session_id': session_id
        })
    except Exception as e:
        import logging
        logging.error(f"Error fetching history: {str(e)}")
        return jsonify({'error': 'Error fetching history'}), 500

@chat_bp.route('/clear/<session_id>', methods=['DELETE'])
def clear_history(session_id):
    """Clear conversation history for a session"""
    try:
        if session_id in conversations:
            del conversations[session_id]
        return jsonify({
            'success': True,
            'message': 'Conversation cleared'
        })
    except Exception as e:
        import logging
        logging.error(f"Error clearing history: {str(e)}")
        return jsonify({'error': 'Error clearing history'}), 500
