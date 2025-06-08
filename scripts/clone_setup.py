#!/usr/bin/env python3
"""
Repository cloning and setup script for BeDAO-ho project
"""

import os
import sys
import subprocess
import json
import argparse
from pathlib import Path

def run_command(cmd, cwd=None, timeout=300):
    """Run a command and return the result"""
    try:
        result = subprocess.run(
            cmd, 
            shell=True, 
            capture_output=True, 
            text=True, 
            cwd=cwd,
            timeout=timeout
        )
        return result.returncode == 0, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return False, "", "Command timed out"
    except Exception as e:
        return False, "", str(e)

def clone_repository(repo_url, target_dir):
    """Clone the repository"""
    print(f"Cloning {repo_url} to {target_dir}...")
    
    # Remove existing directory if it exists
    if os.path.exists(target_dir):
        print(f"Directory {target_dir} already exists. Please remove it first.")
        return False
    
    success, stdout, stderr = run_command(f"git clone {repo_url} {target_dir}")
    
    if success:
        print("Repository cloned successfully!")
        print(stdout)
        return True
    else:
        print(f"Failed to clone repository: {stderr}")
        return False

def analyze_project_structure(project_path):
    """Analyze the project structure to determine type and dependencies"""
    project_path = Path(project_path)
    
    if not project_path.exists():
        return None
    
    analysis = {
        "project_type": "unknown",
        "dependencies": {},
        "scripts": {},
        "entry_points": [],
        "config_files": []
    }
    
    # Check for Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        analysis["project_type"] = "node"
        try:
            with open(package_json, 'r') as f:
                data = json.load(f)
                analysis["dependencies"] = data.get("dependencies", {})
                analysis["scripts"] = data.get("scripts", {})
                analysis["entry_points"].append("package.json")
        except Exception as e:
            print(f"Error reading package.json: {e}")
    
    # Check for Python project
    requirements_txt = project_path / "requirements.txt"
    setup_py = project_path / "setup.py"
    pyproject_toml = project_path / "pyproject.toml"
    
    if requirements_txt.exists() or setup_py.exists() or pyproject_toml.exists():
        if analysis["project_type"] == "unknown":
            analysis["project_type"] = "python"
        
        if requirements_txt.exists():
            analysis["config_files"].append("requirements.txt")
            try:
                with open(requirements_txt, 'r') as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith('#'):
                            if '==' in line:
                                name, version = line.split('==', 1)
                                analysis["dependencies"][name] = version
                            else:
                                analysis["dependencies"][line] = "latest"
            except Exception as e:
                print(f"Error reading requirements.txt: {e}")
    
    # Look for common entry points
    common_entry_points = [
        "app.py", "main.py", "server.py", "index.js", "app.js", "server.js"
    ]
    
    for entry_point in common_entry_points:
        if (project_path / entry_point).exists():
            analysis["entry_points"].append(entry_point)
    
    # Check for framework-specific files
    if (project_path / "manage.py").exists():
        analysis["framework"] = "django"
        analysis["entry_points"].append("manage.py")
    
    if (project_path / "angular.json").exists():
        analysis["framework"] = "angular"
        analysis["config_files"].append("angular.json")
    
    if (project_path / "vue.config.js").exists():
        analysis["framework"] = "vue"
        analysis["config_files"].append("vue.config.js")
    
    return analysis

def install_dependencies(project_path, project_type):
    """Install project dependencies"""
    project_path = Path(project_path)
    
    if project_type == "node":
        print("Installing Node.js dependencies...")
        success, stdout, stderr = run_command("npm install", cwd=project_path)
        
        if success:
            print("Node.js dependencies installed successfully!")
            return True
        else:
            print(f"Failed to install Node.js dependencies: {stderr}")
            return False
    
    elif project_type == "python":
        print("Installing Python dependencies...")
        
        # Try requirements.txt first
        requirements_file = project_path / "requirements.txt"
        if requirements_file.exists():
            success, stdout, stderr = run_command(
                "pip install -r requirements.txt", 
                cwd=project_path
            )
            
            if success:
                print("Python dependencies installed successfully!")
                return True
            else:
                print(f"Failed to install Python dependencies: {stderr}")
                return False
        else:
            print("No requirements.txt found")
            return True
    
    else:
        print(f"Unknown project type: {project_type}")
        return False

def setup_development_environment(project_path):
    """Set up the complete development environment"""
    print("Setting up development environment...")
    
    # Analyze project
    analysis = analyze_project_structure(project_path)
    if not analysis:
        print("Failed to analyze project structure")
        return False
    
    print(f"Detected project type: {analysis['project_type']}")
    
    # Install dependencies
    if not install_dependencies(project_path, analysis['project_type']):
        return False
    
    # Create a project info file
    info_file = Path(project_path) / "project_info.json"
    with open(info_file, 'w') as f:
        json.dump(analysis, f, indent=2)
    
    print("Development environment setup complete!")
    return True

def main():
    parser = argparse.ArgumentParser(description="Clone and setup BeDAO-ho repository")
    parser.add_argument(
        "--repo-url", 
        default="https://github.com/Tekoljw/BeDAO-ho.git",
        help="Repository URL to clone"
    )
    parser.add_argument(
        "--target-dir", 
        default="./BeDAO-ho",
        help="Target directory for cloning"
    )
    parser.add_argument(
        "--skip-clone", 
        action="store_true",
        help="Skip cloning and just setup existing directory"
    )
    
    args = parser.parse_args()
    
    # Clone repository
    if not args.skip_clone:
        if not clone_repository(args.repo_url, args.target_dir):
            sys.exit(1)
    
    # Setup development environment
    if not setup_development_environment(args.target_dir):
        sys.exit(1)
    
    print("\n" + "="*50)
    print("SETUP COMPLETE!")
    print("="*50)
    print(f"Project location: {os.path.abspath(args.target_dir)}")
    print("Next steps:")
    print("1. Review the project_info.json file for project details")
    print("2. Check the README.md for specific setup instructions")
    print("3. Start the development server according to project type")
    print("="*50)

if __name__ == "__main__":
    main()
