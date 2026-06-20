/*=========================================
    MOBILE MENU
=========================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.innerHTML = "&times;";
    } else {
        menuBtn.innerHTML = "☰";
    }

});

/*=========================================
    CLOSE MENU AFTER CLICK
=========================================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuBtn.innerHTML = "☰";

    });

});

/*=========================================
    STICKY NAVBAR EFFECT
=========================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.padding = "14px 35px";
        navbar.style.background = "rgba(12,12,12,.96)";
        navbar.style.boxShadow = "0 8px 30px rgba(0,0,0,.35)";

    } else {

        navbar.style.padding = "18px 35px";
        navbar.style.background = "rgba(26,26,26,.92)";
        navbar.style.boxShadow = "none";

    }

});

/*=========================================
    SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/*=========================================
    ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================================
    SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(
    ".hero, .logos, .work-card, .testimonial-card, .case-row, .contact"
);

const reveal = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < trigger) {

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();

/*=========================================
    INTERSECTION OBSERVER
=========================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach(el => {

    observer.observe(el);

});

/*=========================================
    RECENT WORK SLIDER
=========================================*/

const workGrid = document.querySelector(".work-grid");

const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");

if (workGrid && leftBtn && rightBtn) {

    rightBtn.addEventListener("click", () => {

        workGrid.scrollBy({

            left: 420,

            behavior: "smooth"

        });

    });

    leftBtn.addEventListener("click", () => {

        workGrid.scrollBy({

            left: -420,

            behavior: "smooth"

        });

    });

}

/*=========================================
    IMAGE PARALLAX
=========================================*/

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("mousemove", (e) => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 45;
    const y = (window.innerHeight / 2 - e.clientY) / 45;

    heroImage.style.transform =
        `translate(${x}px, ${y}px)`;

});

/*=========================================
    BUTTON RIPPLE EFFECT
=========================================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transition = ".25s";

    });

});

/*=========================================
    CONTACT FORM
=========================================*/

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        const email = form.querySelector("input[type='email']").value.trim();
        const phone = form.querySelector("input[type='text']").value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (!email || !phone || !message) {

            alert("Please fill all fields.");

            return;

        }

        alert("Message sent successfully!");

        form.reset();

    });

}

/*=========================================
    CURRENT YEAR
=========================================*/

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Portfolio. All Rights Reserved.`;

}

/*=========================================
    PRELOADER (OPTIONAL)
=========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

/*=========================================
    CONSOLE MESSAGE
=========================================*/

console.log("%cPortfolio Loaded Successfully 🚀",
"color:#3FC400;font-size:16px;font-weight:bold;");