// Local Storage Management

const STORAGE_KEY = 'evalhub_projects';

// Get all projects
function getProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Get single project
function getProjectById(id) {
    const projects = getProjects();
    return projects.find(p => p.id === id);
}

// Add project
function addProjectToStorage(project) {
    const projects = getProjects();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Update project
function updateProjectInStorage(updatedProject) {
    let projects = getProjects();
    projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Delete project
function deleteProjectFromStorage(id) {
    let projects = getProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Clear all projects
function clearAllProjects() {
    localStorage.removeItem(STORAGE_KEY);
}

// Calculate average rating
function getAverageRating(project) {
    const total = project.quality + project.cost + project.impact + project.timeline + project.viability;
    return total / 5;
}
