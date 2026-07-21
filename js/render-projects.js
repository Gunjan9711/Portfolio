/**
 * ==========================================
 *  PROJECTS RENDERER
 * ==========================================
 * 
 * This file reads the 'projects' array from
 * projects-data.js and dynamically creates
 * project cards in the DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featuredProjectsGrid');
    const allProjectsGrid = document.getElementById('allProjectsGrid');
    const featuredContainer = document.getElementById('featuredProjectsContainer');
    const toggleWrapper = document.getElementById('projectsToggleWrapper');
    const toggleBtn = document.getElementById('projectsToggleBtn');

    // Safety check
    if (!featuredGrid || !allProjectsGrid) {
        console.error('Project containers not found.');
        return;
    }

    // Separate featured and all projects
    const featuredProjects = projects.filter(proj => proj.featured);
    const allProjects = projects; // we show everything in "All Projects"

    // 1. Render Featured Projects
    if (featuredProjects.length > 0) {
        featuredGrid.innerHTML = featuredProjects.map(createProjectCard).join('');
        featuredContainer.style.display = 'block';
    } else {
        featuredContainer.style.display = 'none';
    }

    // 2. Render All Projects with Show More logic
    const maxInitial = 6;
    let showAll = false;

    function renderAllProjects(showAllFlag) {
        const projectsToShow = showAllFlag ? allProjects : allProjects.slice(0, maxInitial);
        allProjectsGrid.innerHTML = projectsToShow.map(createProjectCard).join('');

        // Toggle button visibility
        if (allProjects.length > maxInitial) {
            toggleWrapper.style.display = 'block';
            toggleBtn.innerHTML = showAllFlag
                ? 'Show Less <i class="fa-solid fa-chevron-up"></i>'
                : 'Show More <i class="fa-solid fa-chevron-down"></i>';
        } else {
            toggleWrapper.style.display = 'none';
        }
    }

    // Initial render
    renderAllProjects(false);

    // Toggle click handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            showAll = !showAll;
            renderAllProjects(showAll);
        });
    }
});

/**
 * Creates an HTML string for a single project card.
 * @param {Object} project - The project object.
 * @returns {string} HTML markup.
 */
function createProjectCard(project) {
    // Fallback image if none provided
    const imageSrc = project.image || 'https://via.placeholder.com/400x200/1e1e1e/00d4ff?text=Project';
    const techTags = project.techStack.map(tech => `<span>${tech}</span>`).join('');

    const githubButton = project.githubLink
        ? `<a href="${project.githubLink}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-brands fa-github"></i> Code</a>`
        : '';
    const liveButton = project.liveLink
        ? `<a href="${project.liveLink}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`
        : '';

    return `
        <div class="project-card">
            <img src="${imageSrc}" alt="${project.title}" loading="lazy">
            <div class="project-card-content">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <div class="project-tech">${techTags}</div>
                <div class="project-links">
                    ${githubButton}
                    ${liveButton}
                </div>
            </div>
        </div>
    `;
}