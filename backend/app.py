from flask import Flask, jsonify
from flask_cors import CORS
from config import config
import os
from routes.chat import chat_bp

def create_app(config_name=None):
    """Create and configure Flask app"""
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    cors_origins = os.getenv(
        'CORS_ORIGINS_REGEX',
        r'^https?://(localhost|127\.0\.0\.1)(:\d+)?$'
    )
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": cors_origins,
            "methods": ["GET", "POST", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Register blueprints
    app.register_blueprint(chat_bp)
    
    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'service': 'Legal Aid Chatbot API'
        }), 200
    
    # Root endpoint
    @app.route('/', methods=['GET'])
    def root():
        return jsonify({
            'name': 'Pakistani Legal Aid Chatbot API',
            'version': '1.0.0',
            'description': 'AI-powered legal aid chatbot based on Pakistani laws and constitution',
            'endpoints': {
                'health': '/health',
                'chat': '/api/chat/message',
                'categories': '/api/chat/categories',
                'history': '/api/chat/history/<session_id>'
            }
        }), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
