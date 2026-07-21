/**
 * ==========================================
 *  PROJECTS DATA FILE
 * ==========================================
 * 
 * This file contains an array of project objects.
 * To ADD a new project to your portfolio, simply
 * copy one of the objects below and paste it
 * inside the array, then change the details.
 * No HTML editing needed!
 * 
 * Field descriptions:
 *   id          : unique number (just increment)
 *   title       : name of your project
 *   description : one or two lines describing what it does
 *   techStack   : array of technologies used (shown as tags)
 *   image       : path to project screenshot (place in assets/projects/)
 *   githubLink  : link to GitHub repository (use "" if none)
 *   liveLink    : link to live demo (use "" if none)
 *   featured    : true = show in "Featured Projects" section
 */

const projects = [
    {
        id: 1,
        title: "ResumeCraft",
        description: "ResumeCraft is a simple and user-friendly resume builder for creating clean, ATS-friendly resumes with a responsive and intuitive interface.",
        techStack: ["HTML", "CSS", "JavaScript"],
        image: "assets/projects/resumecraft.jpg",
        githubLink: "https://github.com/Gunjan9711/ResumeCraft.git",
        liveLink: "https://resume-craft-one-chi.vercel.app/",
        featured: true
    },
    {
        id: 2,
        title: "DevKit",
        description: "The Ultimate Toolkit Every Developer Needs. 18 essential tools, zero dependencies, lightning fast.",
        techStack: ["HTML", "CSS", "JavaScript"],
        image: "assets/projects/devkit.jpg",
        githubLink: "https://github.com/devilns9711/developers-emergency-kit.git",
        liveLink: "https://developers-emergency-kit.vercel.app/",
        featured: true
    },
    
];

// If you want to add more projects, simply duplicate the last object,
// change the details, and increase the id.