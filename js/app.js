let currentEditingId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    updateDashboard();
    updateCompareCheckboxes();
    loadTheme();
});

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Update nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    // Refresh data when switching tabs
    if (tabName === 'dashboard') {
        updateDashboard();
    } else if (tabName === 'projects') {
        loadProjects();
    } else if (tabName === 'compare') {
        updateCompareCheckboxes();
    }
}

// Add new project
function addProject(event) {
    event.preventDefault();

    const project = {
        id: Date.now(),
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        category: document.getElementById('projectCategory').value,
        owner: document.getElementById('projectOwner').value,
        quality: parseInt(document.getElementById('quality').value),
        cost: parseInt(document.getElementById('cost').value),
        impact: parseInt(document.getElementById('impact').value),
        timeline: parseInt(document.getElementById('timeline').value),
        viability: parseInt(document.getElementById('viability').value),
        notes: document.getElementById('projectNotes').value,
        createdAt: new Date().toISOString()
    };

    addProjectToStorage(project);
    document.getElementById('projectForm').reset();
    switchTab('projects');
    loadProjects();
    updateDashboard();
    showNotification('Projet créé avec succès!');
}

// Load and display projects
function loadProjects() {
    const projects = getProjects();
    const projectsList = document.getElementById('projectsList');

    if (projects.length === 0) {
        projectsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Aucun projet créé. <a href="#" onclick="switchTab(\'create\')" style="color: var(--primary-color);">Créer le premier</a></p>';
        return;
    }

    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <span class="project-category">${project.category}</span>
                </div>
                <div class="project-rating">${getAverageRating(project).toFixed(1)}⭐</div>
            </div>
            <p class="project-description">${project.description || 'Pas de description'}</p>
            <div class="project-criteria">
                <div class="criteria"><span class="criteria-label">Qualité:</span> <span class="criteria-value">${project.quality}/5</span></div>
                <div class="criteria"><span class="criteria-label">Coût:</span> <span class="criteria-value">${project.cost}/5</span></div>
                <div class="criteria"><span class="criteria-label">Impact:</span> <span class="criteria-value">${project.impact}/5</span></div>
                <div class="criteria"><span class="criteria-label">Délai:</span> <span class="criteria-value">${project.timeline}/5</span></div>
                <div class="criteria"><span class="criteria-label">Viabilité:</span> <span class="criteria-value">${project.viability}/5</span></div>
            </div>
            ${project.notes ? `<p style="font-size: 0.9rem; opacity: 0.7; margin: 1rem 0;"><strong>Notes:</strong> ${project.notes}</p>` : ''}
            <div class="project-actions">
                <button class="btn-edit" onclick="openEditModal(${project.id})">✏️ Modifier</button>
                <button class="btn-delete" onclick="deleteProject(${project.id})">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Filter projects
function filterProjects() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const projects = getProjects();

    const filtered = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm) || 
                            project.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || project.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const projectsList = document.getElementById('projectsList');
    if (filtered.length === 0) {
        projectsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Aucun projet trouvé</p>';
        return;
    }

    projectsList.innerHTML = filtered.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <span class="project-category">${project.category}</span>
                </div>
                <div class="project-rating">${getAverageRating(project).toFixed(1)}⭐</div>
            </div>
            <p class="project-description">${project.description || 'Pas de description'}</p>
            <div class="project-criteria">
                <div class="criteria"><span class="criteria-label">Qualité:</span> <span class="criteria-value">${project.quality}/5</span></div>
                <div class="criteria"><span class="criteria-label">Coût:</span> <span class="criteria-value">${project.cost}/5</span></div>
                <div class="criteria"><span class="criteria-label">Impact:</span> <span class="criteria-value">${project.impact}/5</span></div>
                <div class="criteria"><span class="criteria-label">Délai:</span> <span class="criteria-value">${project.timeline}/5</span></div>
                <div class="criteria"><span class="criteria-label">Viabilité:</span> <span class="criteria-value">${project.viability}/5</span></div>
            </div>
            ${project.notes ? `<p style="font-size: 0.9rem; opacity: 0.7; margin: 1rem 0;"><strong>Notes:</strong> ${project.notes}</p>` : ''}
            <div class="project-actions">
                <button class="btn-edit" onclick="openEditModal(${project.id})">✏️ Modifier</button>
                <button class="btn-delete" onclick="deleteProject(${project.id})">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Open edit modal
function openEditModal(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;

    currentEditingId = projectId;
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectDescription').value = project.description;
    document.getElementById('editProjectCategory').value = project.category;
    document.getElementById('editProjectOwner').value = project.owner;
    document.getElementById('editProjectNotes').value = project.notes;

    document.getElementById('editModal').classList.add('active');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    currentEditingId = null;
}

// Save project changes
function saveProject(event) {
    event.preventDefault();

    const project = getProjectById(currentEditingId);
    if (!project) return;

    project.name = document.getElementById('editProjectName').value;
    project.description = document.getElementById('editProjectDescription').value;
    project.category = document.getElementById('editProjectCategory').value;
    project.owner = document.getElementById('editProjectOwner').value;
    project.notes = document.getElementById('editProjectNotes').value;
    project.updatedAt = new Date().toISOString();

    updateProjectInStorage(project);
    closeEditModal();
    loadProjects();
    updateDashboard();
    showNotification('Projet modifié avec succès!');
}

// Delete project
function deleteProject(projectId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        deleteProjectFromStorage(projectId);
        loadProjects();
        updateDashboard();
        showNotification('Projet supprimé');
    }
}

// Update dashboard
function updateDashboard() {
    const projects = getProjects();

    // Total projects
    document.getElementById('totalProjects').textContent = projects.length;

    // Average rating
    if (projects.length > 0) {
        const avgRating = projects.reduce((sum, p) => sum + getAverageRating(p), 0) / projects.length;
        document.getElementById('avgRating').textContent = avgRating.toFixed(2) + '/5';
    } else {
        document.getElementById('avgRating').textContent = '0/5';
    }

    // Best project
    if (projects.length > 0) {
        const bestProject = projects.reduce((best, current) => 
            getAverageRating(current) > getAverageRating(best) ? current : best
        );
        document.getElementById('bestProject').textContent = bestProject.name;
    } else {
        document.getElementById('bestProject').textContent = '-';
    }

    // Category distribution
    const categoryCount = {};
    projects.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    if (Object.keys(categoryCount).length > 0) {
        const mainCategory = Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
        document.getElementById('mainCategory').textContent = mainCategory;
    } else {
        document.getElementById('mainCategory').textContent = '-';
    }

    // Update chart
    updateCategoryChart(categoryCount);
}

// Update category chart
function updateCategoryChart(categoryCount) {
    const chartDiv = document.getElementById('categoryChart');
    const maxCount = Math.max(...Object.values(categoryCount), 1);

    chartDiv.innerHTML = Object.entries(categoryCount).map(([category, count]) => `
        <div class="chart-bar">
            <div class="chart-bar-label">${category}</div>
            <div class="chart-bar-container">
                <div class="chart-bar-fill" style="width: ${(count / maxCount) * 100}%"></div>
            </div>
            <div style="font-size: 0.8rem; opacity: 0.7;">${count} projet(s)</div>
        </div>
    `).join('');
}

// Compare projects
function compareProjects() {
    const checkboxes = document.querySelectorAll('.compare-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

    if (selectedIds.length < 2) {
        alert('Sélectionnez au moins 2 projets pour comparer');
        return;
    }

    const selectedProjects = selectedIds.map(id => getProjectById(id));
    const resultsDiv = document.getElementById('compareResults');

    const criteria = ['quality', 'cost', 'impact', 'timeline', 'viability'];
    const criteriaLabels = ['Qualité', 'Coût', 'Impact', 'Délai', 'Viabilité'];

    let html = '<table class="comparison-table"><tr><th>Critère</th>';
    selectedProjects.forEach(p => html += `<th>${p.name}</th>`);
    html += '</tr>';

    criteria.forEach((criterion, index) => {
        html += `<tr><td>${criteriaLabels[index]}</td>`;
        selectedProjects.forEach(p => {
            const value = p[criterion];
            const color = value >= 4 ? 'green' : value >= 3 ? 'orange' : 'red';
            html += `<td style="color: ${color}; font-weight: bold;">${value}/5</td>`;
        });
        html += '</tr>';
    });

    html += '<tr><td><strong>Moyenne</strong></td>';
    selectedProjects.forEach(p => {
        const avg = getAverageRating(p);
        html += `<td><strong>${avg.toFixed(2)}</strong></td>`;
    });
    html += '</tr></table>';

    resultsDiv.innerHTML = html;
}

// Update compare checkboxes
function updateCompareCheckboxes() {
    const projects = getProjects();
    const checkboxesDiv = document.getElementById('compareCheckboxes');

    checkboxesDiv.innerHTML = projects.map(project => `
        <div class="checkbox-item">
            <input type="checkbox" class="compare-checkbox" value="${project.id}" id="compare_${project.id}">
            <label for="compare_${project.id}">${project.name}</label>
        </div>
    `).join('');
}

// Export data
function exportData() {
    const projects = getProjects();
    const dataStr = JSON.stringify(projects, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evalhub-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showNotification('Données exportées en JSON');
}

// Export CSV
function exportCSV() {
    const projects = getProjects();
    let csv = 'Nom,Catégorie,Responsable,Qualité,Coût,Impact,Délai,Viabilité,Moyenne,Description,Notes\n';

    projects.forEach(p => {
        const avg = getAverageRating(p);
        csv += `"${p.name}","${p.category}","${p.owner}",${p.quality},${p.cost},${p.impact},${p.timeline},${p.viability},${avg.toFixed(2)},"${p.description}","${p.notes}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evalhub-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showNotification('Données exportées en CSV');
}

// Clear all data
function clearAllData() {
    if (confirm('⚠️ Attention! Ceci supprimera TOUTES les données. Continuer?')) {
        if (confirm('Êtes-vous vraiment sûr? Cette action est irréversible.')) {
            clearAllProjects();
            loadProjects();
            updateDashboard();
            showNotification('Toutes les données ont été supprimées');
        }
    }
}

// Update slider value display
function updateSliderValue(slider) {
    slider.nextElementSibling.textContent = slider.value + '/5';
}

// Go home
function goHome() {
    window.location.href = 'index.html';
}
