class DevEnvironmentManager {
    constructor() {
        this.initializeEventListeners();
        this.consoleOutput = document.getElementById('console-output');
        this.statusIndicator = document.getElementById('status-indicator');
        this.setupPeriodicStatusCheck();
    }

    initializeEventListeners() {
        document.getElementById('clone-btn').addEventListener('click', () => this.cloneRepository());
        document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeCodebase());
        document.getElementById('install-deps-btn').addEventListener('click', () => this.installDependencies());
        document.getElementById('start-server-btn').addEventListener('click', () => this.startServer());
        document.getElementById('clear-console').addEventListener('click', () => this.clearConsole());
    }

    setupPeriodicStatusCheck() {
        // Check status every 5 seconds
        setInterval(() => this.updateStatus(), 5000);
        this.updateStatus(); // Initial check
    }

    async updateStatus() {
        try {
            const response = await fetch('/api/status');
            const status = await response.json();
            
            // Update UI based on status
            this.updateButtonStates(status);
            this.updateStatusIndicator(status);
            
            // Update file explorer if cloned
            if (status.cloned && !document.getElementById('file-explorer').hasChildNodes()) {
                this.updateFileExplorer();
            }
            
        } catch (error) {
            console.error('Status update error:', error);
        }
    }

    updateButtonStates(status) {
        document.getElementById('analyze-btn').disabled = !status.cloned;
        document.getElementById('install-deps-btn').disabled = !status.analyzed;
        document.getElementById('start-server-btn').disabled = !status.deps_installed;
        
        // Update button text based on status
        if (status.server_running) {
            document.getElementById('start-server-btn').innerHTML = 
                '<i class="fas fa-stop"></i> Server Running';
            document.getElementById('start-server-btn').classList.remove('btn-info');
            document.getElementById('start-server-btn').classList.add('btn-success');
        }
    }

    updateStatusIndicator(status) {
        let statusText = 'Ready';
        let statusClass = 'bg-secondary';
        
        if (status.server_running) {
            statusText = 'Server Running';
            statusClass = 'bg-success';
        } else if (status.deps_installed) {
            statusText = 'Dependencies Installed';
            statusClass = 'bg-info';
        } else if (status.analyzed) {
            statusText = 'Analyzed';
            statusClass = 'bg-warning';
        } else if (status.cloned) {
            statusText = 'Cloned';
            statusClass = 'bg-primary';
        }
        
        this.statusIndicator.textContent = statusText;
        this.statusIndicator.className = `badge ${statusClass}`;
    }

    logToConsole(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colorClass = `console-${type}`;
        
        const logLine = document.createElement('div');
        logLine.className = `console-line ${colorClass}`;
        logLine.textContent = `[${timestamp}] ${message}`;
        
        this.consoleOutput.appendChild(logLine);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
    }

    clearConsole() {
        this.consoleOutput.innerHTML = '';
        this.logToConsole('Console cleared', 'info');
    }

    showLoading(buttonId, originalText) {
        const button = document.getElementById(buttonId);
        button.disabled = true;
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Processing...`;
        return () => {
            button.disabled = false;
            button.innerHTML = originalText;
        };
    }

    async cloneRepository() {
        const repoUrl = document.getElementById('repo-url').value;
        const targetDir = document.getElementById('target-dir').value;
        
        const restoreButton = this.showLoading('clone-btn', '<i class="fas fa-download"></i> Clone Repository');
        
        this.logToConsole('Starting repository clone...', 'info');
        
        try {
            const response = await fetch('/api/clone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repo_url: repoUrl,
                    target_dir: targetDir
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.logToConsole(result.message, 'success');
                if (result.output) {
                    this.logToConsole(result.output, 'info');
                }
                this.updateStatus(); // Refresh status
            } else {
                this.logToConsole(result.message, 'error');
                if (result.error) {
                    this.logToConsole(result.error, 'error');
                }
            }
            
        } catch (error) {
            this.logToConsole(`Clone error: ${error.message}`, 'error');
        } finally {
            restoreButton();
        }
    }

    async analyzeCodebase() {
        const restoreButton = this.showLoading('analyze-btn', '<i class="fas fa-search"></i> Analyze Codebase');
        
        this.logToConsole('Starting codebase analysis...', 'info');
        
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.logToConsole(result.message, 'success');
                this.displayAnalysisResults(result.data);
                this.updateStatus(); // Refresh status
            } else {
                this.logToConsole(result.message, 'error');
                if (result.error) {
                    this.logToConsole(result.error, 'error');
                }
            }
            
        } catch (error) {
            this.logToConsole(`Analysis error: ${error.message}`, 'error');
        } finally {
            restoreButton();
        }
    }

    async installDependencies() {
        const restoreButton = this.showLoading('install-deps-btn', '<i class="fas fa-download"></i> Install Dependencies');
        
        this.logToConsole('Installing dependencies...', 'info');
        
        try {
            const response = await fetch('/api/install-deps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.logToConsole(result.message, 'success');
                if (result.output) {
                    this.logToConsole(result.output, 'info');
                }
                this.updateStatus(); // Refresh status
            } else {
                this.logToConsole(result.message, 'error');
                if (result.error) {
                    this.logToConsole(result.error, 'error');
                }
            }
            
        } catch (error) {
            this.logToConsole(`Dependency installation error: ${error.message}`, 'error');
        } finally {
            restoreButton();
        }
    }

    async startServer() {
        const restoreButton = this.showLoading('start-server-btn', '<i class="fas fa-play"></i> Start Development Server');
        
        this.logToConsole('Starting development server...', 'info');
        
        try {
            const response = await fetch('/api/start-server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.logToConsole(result.message, 'success');
                this.logToConsole('Server is starting in the background...', 'info');
                this.updateStatus(); // Refresh status
            } else {
                this.logToConsole(result.message, 'error');
            }
            
        } catch (error) {
            this.logToConsole(`Server start error: ${error.message}`, 'error');
        } finally {
            restoreButton();
        }
    }

    displayAnalysisResults(data) {
        const analysisContainer = document.getElementById('analysis-results');
        analysisContainer.innerHTML = '';
        
        // Project type
        const projectTypeDiv = document.createElement('div');
        projectTypeDiv.className = 'analysis-section';
        projectTypeDiv.innerHTML = `
            <h6>Project Type</h6>
            <div class="analysis-item">
                <i class="fas fa-code"></i> ${data.project_type || 'Unknown'}
            </div>
        `;
        analysisContainer.appendChild(projectTypeDiv);
        
        // Dependencies
        if (data.dependencies && Object.keys(data.dependencies).length > 0) {
            const depsDiv = document.createElement('div');
            depsDiv.className = 'analysis-section';
            depsDiv.innerHTML = '<h6>Dependencies</h6>';
            
            Object.entries(data.dependencies).forEach(([name, version]) => {
                const depItem = document.createElement('div');
                depItem.className = 'analysis-item';
                depItem.innerHTML = `<i class="fas fa-cube"></i> ${name}: ${version}`;
                depsDiv.appendChild(depItem);
            });
            
            analysisContainer.appendChild(depsDiv);
        }
        
        // Scripts (for Node.js projects)
        if (data.scripts && Object.keys(data.scripts).length > 0) {
            const scriptsDiv = document.createElement('div');
            scriptsDiv.className = 'analysis-section';
            scriptsDiv.innerHTML = '<h6>Available Scripts</h6>';
            
            Object.entries(data.scripts).forEach(([name, command]) => {
                const scriptItem = document.createElement('div');
                scriptItem.className = 'analysis-item';
                scriptItem.innerHTML = `<i class="fas fa-terminal"></i> ${name}: ${command}`;
                scriptsDiv.appendChild(scriptItem);
            });
            
            analysisContainer.appendChild(scriptsDiv);
        }
        
        // File structure summary
        if (data.file_count) {
            const filesDiv = document.createElement('div');
            filesDiv.className = 'analysis-section';
            filesDiv.innerHTML = `
                <h6>File Structure</h6>
                <div class="analysis-item">
                    <i class="fas fa-file"></i> Total files: ${data.file_count}
                </div>
            `;
            
            if (data.file_types) {
                Object.entries(data.file_types).forEach(([ext, count]) => {
                    const fileTypeItem = document.createElement('div');
                    fileTypeItem.className = 'analysis-item';
                    fileTypeItem.innerHTML = `<i class="fas fa-file-code"></i> ${ext}: ${count} files`;
                    filesDiv.appendChild(fileTypeItem);
                });
            }
            
            analysisContainer.appendChild(filesDiv);
        }
    }

    async updateFileExplorer() {
        try {
            const response = await fetch('/api/file-explorer');
            const result = await response.json();
            
            if (result.success) {
                this.renderFileTree(result.structure);
            }
        } catch (error) {
            console.error('File explorer update error:', error);
        }
    }

    renderFileTree(structure, container = null, level = 0) {
        if (!container) {
            container = document.getElementById('file-explorer');
            container.innerHTML = '';
            container.className = 'file-explorer-container';
        }
        
        if (!structure) return;
        
        structure.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `file-tree-item file-tree-level-${Math.min(level, 3)}`;
            
            if (item.type === 'directory') {
                itemDiv.innerHTML = `
                    <span class="file-tree-icon"><i class="fas fa-folder"></i></span>
                    <span class="file-tree-directory">${item.name}/</span>
                `;
                
                if (item.children && item.children.length > 0) {
                    const childrenContainer = document.createElement('div');
                    this.renderFileTree(item.children, childrenContainer, level + 1);
                    itemDiv.appendChild(childrenContainer);
                }
            } else {
                const sizeText = item.size ? this.formatFileSize(item.size) : '';
                itemDiv.innerHTML = `
                    <span class="file-tree-icon"><i class="fas fa-file"></i></span>
                    <span class="file-tree-file">${item.name}</span>
                    <span class="file-size">${sizeText}</span>
                `;
            }
            
            container.appendChild(itemDiv);
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
}

// Initialize the development environment manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DevEnvironmentManager();
});
