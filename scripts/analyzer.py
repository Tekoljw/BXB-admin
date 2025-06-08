#!/usr/bin/env python3
"""
Codebase analyzer for BeDAO-ho project
"""

import os
import sys
import json
import re
from pathlib import Path
from collections import defaultdict, Counter

def analyze_file_structure(project_path):
    """Analyze file structure and count file types"""
    project_path = Path(project_path)
    
    file_count = 0
    file_types = Counter()
    directory_count = 0
    
    for root, dirs, files in os.walk(project_path):
        # Skip hidden directories and common ignore directories
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__', 'venv', 'env']]
        
        directory_count += len(dirs)
        
        for file in files:
            if not file.startswith('.'):
                file_count += 1
                ext = Path(file).suffix.lower()
                if ext:
                    file_types[ext] += 1
                else:
                    file_types['no_extension'] += 1
    
    return {
        'file_count': file_count,
        'directory_count': directory_count,
        'file_types': dict(file_types.most_common(10))  # Top 10 file types
    }

def analyze_package_json(project_path):
    """Analyze package.json for Node.js projects"""
    package_json_path = Path(project_path) / 'package.json'
    
    if not package_json_path.exists():
        return None
    
    try:
        with open(package_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        analysis = {
            'name': data.get('name', 'Unknown'),
            'version': data.get('version', 'Unknown'),
            'description': data.get('description', ''),
            'main': data.get('main', 'index.js'),
            'scripts': data.get('scripts', {}),
            'dependencies': data.get('dependencies', {}),
            'devDependencies': data.get('devDependencies', {}),
            'engines': data.get('engines', {}),
            'license': data.get('license', 'Unknown')
        }
        
        # Detect framework/library based on dependencies
        deps = {**analysis['dependencies'], **analysis['devDependencies']}
        
        if 'react' in deps:
            analysis['framework'] = 'React'
        elif 'vue' in deps:
            analysis['framework'] = 'Vue'
        elif 'angular' in deps or '@angular/core' in deps:
            analysis['framework'] = 'Angular'
        elif 'express' in deps:
            analysis['framework'] = 'Express'
        elif 'next' in deps:
            analysis['framework'] = 'Next.js'
        elif 'nuxt' in deps:
            analysis['framework'] = 'Nuxt.js'
        elif 'svelte' in deps:
            analysis['framework'] = 'Svelte'
        else:
            analysis['framework'] = 'Vanilla/Other'
        
        return analysis
        
    except Exception as e:
        print(f"Error analyzing package.json: {e}", file=sys.stderr)
        return None

def analyze_python_requirements(project_path):
    """Analyze Python requirements and setup files"""
    project_path = Path(project_path)
    
    analysis = {
        'requirements': {},
        'framework': 'Unknown',
        'entry_points': []
    }
    
    # Check requirements.txt
    requirements_path = project_path / 'requirements.txt'
    if requirements_path.exists():
        try:
            with open(requirements_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        if '==' in line:
                            name, version = line.split('==', 1)
                            analysis['requirements'][name.strip()] = version.strip()
                        elif '>=' in line:
                            name, version = line.split('>=', 1)
                            analysis['requirements'][name.strip()] = f">={version.strip()}"
                        else:
                            analysis['requirements'][line] = 'latest'
        except Exception as e:
            print(f"Error reading requirements.txt: {e}", file=sys.stderr)
    
    # Detect framework based on requirements
    if 'django' in analysis['requirements']:
        analysis['framework'] = 'Django'
        if (project_path / 'manage.py').exists():
            analysis['entry_points'].append('manage.py')
    elif 'flask' in analysis['requirements']:
        analysis['framework'] = 'Flask'
    elif 'fastapi' in analysis['requirements']:
        analysis['framework'] = 'FastAPI'
    elif 'tornado' in analysis['requirements']:
        analysis['framework'] = 'Tornado'
    
    # Look for common entry points
    common_files = ['app.py', 'main.py', 'server.py', 'run.py']
    for file in common_files:
        if (project_path / file).exists():
            analysis['entry_points'].append(file)
    
    return analysis

def analyze_git_info(project_path):
    """Analyze git repository information"""
    git_path = Path(project_path) / '.git'
    
    if not git_path.exists():
        return None
    
    try:
        # Read git config
        config_path = git_path / 'config'
        if config_path.exists():
            with open(config_path, 'r', encoding='utf-8') as f:
                config_content = f.read()
            
            # Extract remote URL
            remote_match = re.search(r'url = (.+)', config_content)
            remote_url = remote_match.group(1) if remote_match else 'Unknown'
            
            return {
                'remote_url': remote_url,
                'has_git': True
            }
    except Exception as e:
        print(f"Error analyzing git info: {e}", file=sys.stderr)
    
    return {'has_git': True}

def analyze_readme(project_path):
    """Analyze README file for project information"""
    project_path = Path(project_path)
    
    readme_files = ['README.md', 'readme.md', 'README.txt', 'README.rst']
    
    for readme_file in readme_files:
        readme_path = project_path / readme_file
        if readme_path.exists():
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract title (first heading)
                title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                title = title_match.group(1) if title_match else 'Unknown'
                
                # Count sections
                sections = len(re.findall(r'^#+\s+', content, re.MULTILINE))
                
                return {
                    'file': readme_file,
                    'title': title,
                    'length': len(content),
                    'sections': sections,
                    'has_installation': 'install' in content.lower() or 'setup' in content.lower(),
                    'has_usage': 'usage' in content.lower() or 'getting started' in content.lower()
                }
                
            except Exception as e:
                print(f"Error reading {readme_file}: {e}", file=sys.stderr)
    
    return None

def analyze_project(project_path):
    """Main project analysis function"""
    project_path = Path(project_path)
    
    if not project_path.exists():
        print(f"Error: Project path {project_path} does not exist", file=sys.stderr)
        return None
    
    analysis = {
        'project_path': str(project_path.absolute()),
        'project_name': project_path.name,
        'analysis_timestamp': str(Path.cwd()),
    }
    
    # File structure analysis
    analysis['file_structure'] = analyze_file_structure(project_path)
    
    # Determine project type and analyze accordingly
    package_json_analysis = analyze_package_json(project_path)
    python_analysis = analyze_python_requirements(project_path)
    
    if package_json_analysis:
        analysis['project_type'] = 'node'
        analysis['package_json'] = package_json_analysis
        analysis['dependencies'] = package_json_analysis['dependencies']
        analysis['scripts'] = package_json_analysis['scripts']
        analysis['framework'] = package_json_analysis.get('framework', 'Unknown')
    elif python_analysis['requirements']:
        analysis['project_type'] = 'python'
        analysis['python_info'] = python_analysis
        analysis['dependencies'] = python_analysis['requirements']
        analysis['framework'] = python_analysis['framework']
        analysis['entry_points'] = python_analysis['entry_points']
    else:
        analysis['project_type'] = 'unknown'
        analysis['dependencies'] = {}
    
    # Git information
    git_info = analyze_git_info(project_path)
    if git_info:
        analysis['git_info'] = git_info
    
    # README analysis
    readme_info = analyze_readme(project_path)
    if readme_info:
        analysis['readme'] = readme_info
    
    # Additional file analysis
    config_files = []
    for config_file in ['.env', '.env.example', 'config.json', 'config.js', 'settings.py']:
        if (project_path / config_file).exists():
            config_files.append(config_file)
    
    if config_files:
        analysis['config_files'] = config_files
    
    return analysis

def main():
    if len(sys.argv) != 2:
        print("Usage: python analyzer.py <project_path>", file=sys.stderr)
        sys.exit(1)
    
    project_path = sys.argv[1]
    analysis = analyze_project(project_path)
    
    if analysis:
        # Output as JSON for consumption by the web interface
        print(json.dumps(analysis, indent=2))
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
