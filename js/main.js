// Common JavaScript functionality for MANKEFOR website

// Initialize AOS (Animate On Scroll) library
document.addEventListener("DOMContentLoaded", function () {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: "ease-in-out",
        });
    }
});

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById("mobile-menu");
        this.navMenu = document.getElementById("nav-menu");
        this.init();
    }

    init() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener("click", () => this.toggleMenu());

            // Close menu when clicking on a link
            const navLinks = this.navMenu.querySelectorAll("a");
            navLinks.forEach((link) => {
                link.addEventListener("click", () => this.closeMenu());
            });

            // Close menu when clicking outside
            document.addEventListener("click", (e) => {
                if (
                    !this.navMenu.contains(e.target) &&
                    !this.menuToggle.contains(e.target)
                ) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle("active");
        this.menuToggle.classList.toggle("active");

        // Animate hamburger menu
        const spans = this.menuToggle.querySelectorAll("span");
        spans.forEach((span, index) => {
            if (this.navMenu.classList.contains("active")) {
                if (index === 0)
                    span.style.transform = "rotate(45deg) translate(5px, 5px)";
                if (index === 1) span.style.opacity = "0";
                if (index === 2)
                    span.style.transform =
                        "rotate(-45deg) translate(7px, -6px)";
            } else {
                span.style.transform = "";
                span.style.opacity = "";
            }
        });
    }

    closeMenu() {
        this.navMenu.classList.remove("active");
        this.menuToggle.classList.remove("active");

        const spans = this.menuToggle.querySelectorAll("span");
        spans.forEach((span) => {
            span.style.transform = "";
            span.style.opacity = "";
        });
    }
}

// Smooth scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                const href = link.getAttribute("href");
                if (href === "#") return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
            form.addEventListener("submit", (e) => this.handleSubmit(e));
        });
    }

    handleSubmit(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');

        if (submitBtn) {
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            // Simulate form processing (remove this in production)
            setTimeout(() => {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;

                // Show success message
                this.showMessage("Message sent successfully!", "success");
                form.reset();
            }, 2000);
        }
    }

    showMessage(message, type = "info") {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === "success" ? "#4CAF50" : "#2196F3"};
      color: white;
      border-radius: 4px;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = "slideOut 0.3s ease-in";
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
}

// Image lazy loading
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove("lazy");
                            imageObserver.unobserve(img);
                        }
                    });
                }
            );

            const lazyImages = document.querySelectorAll("img[data-src]");
            lazyImages.forEach((img) => imageObserver.observe(img));
        }
    }
}

// Search functionality
class SearchHandler {
    constructor() {
        this.init();
    }

    init() {
        const searchInput = document.querySelector(".search-input");
        const searchBtn = document.querySelector(".search-btn");

        if (searchInput && searchBtn) {
            searchBtn.addEventListener("click", () => this.performSearch());
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const searchInput = document.querySelector(".search-input");
        const query = searchInput ? searchInput.value.trim() : "";

        if (query) {
            // Redirect to search page with query parameter
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        } else {
            window.location.href = "search.html";
        }
    }
}

// Product card interactions
class ProductCards {
    constructor() {
        this.init();
    }

    init() {
        const productCards = document.querySelectorAll(".product-card");
        productCards.forEach((card) => {
            card.addEventListener("mouseenter", () =>
                this.handleHover(card, true)
            );
            card.addEventListener("mouseleave", () =>
                this.handleHover(card, false)
            );
        });
    }

    handleHover(card, isHovering) {
        const img = card.querySelector("img");
        const btn = card.querySelector(".btn");

        if (isHovering) {
            card.style.transform = "translateY(-5px)";
            if (img) img.style.transform = "scale(1.05)";
            if (btn) btn.style.transform = "scale(1.05)";
        } else {
            card.style.transform = "";
            if (img) img.style.transform = "";
            if (btn) btn.style.transform = "";
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    new MobileMenu();
    new SmoothScroll();
    new FormHandler();
    new LazyLoader();
    new SearchHandler();
    new ProductCards();
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .lazy.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(style);
