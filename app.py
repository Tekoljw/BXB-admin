import os
import subprocess
import json
import threading
import time
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import logging

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global state for tracking operations
operation_status = {
    'cloned': False,
    'analyzed': False,
    'deps_installed': False,
    'server_running': False,
    'project_path': None,
    'project_type': None,
    'analysis_data': {}
}

@app.route('/')
def index():
    """Serve the main dashboard"""
    return send_from_directory('.', 'index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

@app.route('/api/clone', methods=['POST'])
def clone_repository():
    """Clone the BeDAO-ho repository"""
    try:
        data = request.get_json()
        repo_url = data.get('repo_url', 'https://github.com/Tekoljw/BeDAO-ho.git')
        target_dir = data.get('target_dir', './BeDAO-ho')
        
        # Ensure target directory doesn't exist or is empty
        if os.path.exists(target_dir):
            return jsonify({
                'success': False, 
                'message': f'Directory {target_dir} already exists. Please choose a different name or remove the existing directory.'
            })
        
        # Clone the repository
        result = subprocess.run([
            'git', 'clone', repo_url, target_dir
        ], capture_output=True, text=True, timeout=300)
        
        if result.returncode == 0:
            operation_status['cloned'] = True
            operation_status['project_path'] = target_dir
            
            return jsonify({
                'success': True,
                'message': f'Successfully cloned repository to {target_dir}',
                'output': result.stdout
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to clone repository',
                'error': result.stderr
            })
            
    except subprocess.TimeoutExpired:
        return jsonify({
            'success': False,
            'message': 'Clone operation timed out'
        })
    except Exception as e:
        logger.error(f"Clone error: {e}")
        return jsonify({
            'success': False,
            'message': f'Error during clone: {str(e)}'
        })

@app.route('/api/analyze', methods=['POST'])
def analyze_codebase():
    """Analyze the cloned codebase"""
    try:
        if not operation_status['cloned'] or not operation_status['project_path']:
            return jsonify({
                'success': False,
                'message': 'Repository not cloned yet'
            })
        
        project_path = operation_status['project_path']
        
        # Run the analyzer script
        result = subprocess.run([
            'python', 'scripts/analyzer.py', project_path
        ], capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0:
            analysis_data = json.loads(result.stdout)
            operation_status['analyzed'] = True
            operation_status['analysis_data'] = analysis_data
            operation_status['project_type'] = analysis_data.get('project_type', 'unknown')
            
            return jsonify({
                'success': True,
                'message': 'Analysis completed successfully',
                'data': analysis_data
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Analysis failed',
                'error': result.stderr
            })
            
    except Exception as e:
        logger.error(f"Analysis error: {e}")
        return jsonify({
            'success': False,
            'message': f'Error during analysis: {str(e)}'
        })

@app.route('/api/install-deps', methods=['POST'])
def install_dependencies():
    """Install project dependencies"""
    try:
        if not operation_status['analyzed']:
            return jsonify({
                'success': False,
                'message': 'Project not analyzed yet'
            })
        
        project_path = operation_status['project_path']
        project_type = operation_status['project_type']
        
        # Change to project directory
        original_cwd = os.getcwd()
        os.chdir(project_path)
        
        try:
            if project_type == 'node':
                # Install npm dependencies
                result = subprocess.run(['npm', 'install'], capture_output=True, text=True, timeout=300)
            elif project_type == 'python':
                # Install pip dependencies
                result = subprocess.run(['pip', 'install', '-r', 'requirements.txt'], capture_output=True, text=True, timeout=300)
            else:
                return jsonify({
                    'success': False,
                    'message': f'Unknown project type: {project_type}'
                })
            
            if result.returncode == 0:
                operation_status['deps_installed'] = True
                return jsonify({
                    'success': True,
                    'message': 'Dependencies installed successfully',
                    'output': result.stdout
                })
            else:
                return jsonify({
                    'success': False,
                    'message': 'Failed to install dependencies',
                    'error': result.stderr
                })
                
        finally:
            os.chdir(original_cwd)
            
    except Exception as e:
        logger.error(f"Dependency installation error: {e}")
        return jsonify({
            'success': False,
            'message': f'Error installing dependencies: {str(e)}'
        })

@app.route('/api/start-server', methods=['POST'])
def start_development_server():
    """Start the development server for the project"""
    try:
        if not operation_status['deps_installed']:
            return jsonify({
                'success': False,
                'message': 'Dependencies not installed yet'
            })
        
        project_path = operation_status['project_path']
        project_type = operation_status['project_type']
        analysis_data = operation_status['analysis_data']
        
        # Determine start command based on project analysis
        start_command = None
        if project_type == 'node':
            package_json = analysis_data.get('package_json', {})
            scripts = package_json.get('scripts', {})
            
            if 'start' in scripts:
                start_command = ['npm', 'start']
            elif 'dev' in scripts:
                start_command = ['npm', 'run', 'dev']
            elif 'serve' in scripts:
                start_command = ['npm', 'run', 'serve']
            
        elif project_type == 'python':
            # Look for common Python entry points
            if os.path.exists(os.path.join(project_path, 'app.py')):
                start_command = ['python', 'app.py']
            elif os.path.exists(os.path.join(project_path, 'main.py')):
                start_command = ['python', 'main.py']
            elif os.path.exists(os.path.join(project_path, 'manage.py')):
                start_command = ['python', 'manage.py', 'runserver', '0.0.0.0:8000']
        
        if not start_command:
            return jsonify({
                'success': False,
                'message': 'Could not determine how to start the application. Please check the project documentation.'
            })
        
        # Start the server in a separate thread
        def run_server():
            original_cwd = os.getcwd()
            os.chdir(project_path)
            try:
                subprocess.run(start_command)
            finally:
                os.chdir(original_cwd)
                operation_status['server_running'] = False
        
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        operation_status['server_running'] = True
        
        return jsonify({
            'success': True,
            'message': f'Development server started with command: {" ".join(start_command)}',
            'command': start_command
        })
        
    except Exception as e:
        logger.error(f"Server start error: {e}")
        return jsonify({
            'success': False,
            'message': f'Error starting server: {str(e)}'
        })

@app.route('/api/file-explorer')
def get_file_explorer():
    """Get file structure for the explorer"""
    try:
        if not operation_status['cloned']:
            return jsonify({
                'success': False,
                'message': 'Repository not cloned yet'
            })
        
        project_path = operation_status['project_path']
        
        def get_directory_structure(path, max_depth=3, current_depth=0):
            """Recursively get directory structure"""
            if current_depth >= max_depth:
                return None
            
            items = []
            try:
                for item in sorted(os.listdir(path)):
                    if item.startswith('.'):
                        continue
                    
                    item_path = os.path.join(path, item)
                    if os.path.isdir(item_path):
                        children = get_directory_structure(item_path, max_depth, current_depth + 1)
                        items.append({
                            'name': item,
                            'type': 'directory',
                            'path': item_path,
                            'children': children
                        })
                    else:
                        items.append({
                            'name': item,
                            'type': 'file',
                            'path': item_path,
                            'size': os.path.getsize(item_path)
                        })
            except PermissionError:
                pass
            
            return items
        
        structure = get_directory_structure(project_path)
        
        return jsonify({
            'success': True,
            'structure': structure
        })
        
    except Exception as e:
        logger.error(f"File explorer error: {e}")
        return jsonify({
            'success': False,
            'message': f'Error getting file structure: {str(e)}'
        })

@app.route('/api/status')
def get_status():
    """Get current operation status"""
    return jsonify(operation_status)

if __name__ == '__main__':
    # Ensure required directories exist
    os.makedirs('static', exist_ok=True)
    os.makedirs('scripts', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
