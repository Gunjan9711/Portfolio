/**
 * ==========================================
 *  MAIN JAVASCRIPT – Core Interactivity
 * ==========================================
 *  - Mobile Nav Toggle
 *  - Smooth Scroll & Active Link Highlight
 *  - Scroll Reveal Animations (IntersectionObserver)
 *  - Theme Toggle (Light/Dark)
 *  - Back to Top Button
 *  - Footer Year
 *  - Contact Form Demo Prevention
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- DOM Elements ----------
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const backToTopBtn = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const currentYearSpan = document.getElementById('currentYear');

    // ---------- Mobile Menu Toggle ----------
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------- Smooth Scroll & Active Link ----------
    // Highlight nav link on scroll using IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60% 0px', // triggers when section top reaches about 40% from top
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));

    // ---------- Scroll Reveal Animations ----------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after revealing to save resources
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- Theme Toggle (Light/Dark) ----------
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    };

    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        applyTheme(isLight ? 'dark' : 'light');
    });

    // ---------- Back to Top Button ----------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Footer Year ----------
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }



    // ---------- Contact Form  ----------
    // if (contactForm) {
    //     contactForm.addEventListener('submit', async (e) => {
    //         e.preventDefault();

    //         // Show subtle feedback (optional)
    //         const submitBtn = contactForm.querySelector('button[type="submit"]');
    //         const originalText = submitBtn.innerHTML;
    //         submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    //         submitBtn.disabled = true;

    //         const formData = new FormData(contactForm);
    //         const data = {
    //             name: formData.get('name'),
    //             email: formData.get('email'),
    //             subject: formData.get('subject'),
    //             message: formData.get('message')
    //         };

    //         try {
    //             const response = await fetch('/api/send-email', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(data)
    //             });

    //             if (response.ok) {
    //                 alert('✅ Message sent successfully! I\'ll get back to you soon.');
    //                 contactForm.reset();
    //             } else {
    //                 const err = await response.json();
    //                 alert('❌ Failed: ' + (err.message || 'Please try again later.'));
    //             }
    //         } catch (error) {
    //             console.error('Network error:', error);
    //             alert('❌ Something went wrong. Check your connection.');
    //         } finally {
    //             submitBtn.innerHTML = originalText;
    //             submitBtn.disabled = false;
    //         }
    //     });
    // }

    // const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);

                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const result = await response.json();

                if (result.success) {
                    alert(
                        "✅ Message sent successfully! I'll get back to you soon."
                    );

                    contactForm.reset();
                } else {
                    alert(
                        "❌ Failed to send message. Please try again later."
                    );

                    console.error(result);
                }
            } catch (error) {
                console.error("Error:", error);

                alert(
                    "❌ Something went wrong. Please check your internet connection."
                );
            } finally {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }










});

// ---------- Dropdown Toggle (Mobile Click) ----------
const dropdown = document.querySelector('.nav-item.dropdown');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdown && dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault(); // prevent link action
        e.stopPropagation();

        // Toggle the dropdown menu
        dropdownMenu.classList.toggle('show');
        dropdownToggle.classList.toggle('active');

        // Update aria-expanded for accessibility
        const expanded = dropdown.getAttribute('aria-expanded') === 'true' || false;
        dropdown.setAttribute('aria-expanded', !expanded);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            dropdownToggle.classList.remove('active');
            dropdown.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard accessibility: close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdownMenu.classList.remove('show');
            dropdownToggle.classList.remove('active');
            dropdown.setAttribute('aria-expanded', 'false');
        }
    });
}