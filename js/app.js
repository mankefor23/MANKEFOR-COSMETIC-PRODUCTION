/**
 * MANKEFOR COSMETIC PRODUCTION - Main Application
 * Handles all application functionality using localStorage
 */

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

    // Initialize mobile menu
    new MobileMenu();

    // Initialize smooth scroll
    new SmoothScroll();

    // Initialize forms
    new FormHandler();

    // Initialize lazy loading
    new LazyLoader();

    // Initialize search
    new SearchHandler();

    // Initialize product interactions
    new ProductCards();

    // Load dynamic content
    loadDynamicContent();
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

            const navLinks = this.navMenu.querySelectorAll("a");
            navLinks.forEach((link) => {
                link.addEventListener("click", () => this.closeMenu());
            });

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

// Smooth scrolling
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
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        });
    }
}

// Form handling with localStorage
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
            if (form.classList.contains("contact-form")) {
                form.addEventListener("submit", (e) =>
                    this.handleContactSubmit(e)
                );
            } else if (form.id === "loginForm") {
                form.addEventListener("submit", (e) =>
                    this.handleLoginSubmit(e)
                );
            } else {
                form.addEventListener("submit", (e) => this.handleSubmit(e));
            }
        });
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');

        if (submitBtn) {
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                const contactData = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    subject: formData.get("subject") || "Inquiry",
                    message: formData.get("message"),
                    category: "general",
                };

                dataManager.saveContact(contactData);
                dataManager.showNotification(
                    "Message sent successfully!",
                    "success"
                );
                form.reset();
            } catch (error) {
                dataManager.showNotification(
                    "An error occurred. Please try again.",
                    "error"
                );
            } finally {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            }
        }
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        const user = dataManager.login(email, password);

        if (user) {
            dataManager.showNotification(
                `Welcome back, ${user.firstName}!`,
                "success"
            );
            setTimeout(() => {
                if (user.role === "admin") {
                    window.location.href = "admin-dashboard.html";
                } else {
                    window.location.href = "customer-dashboard.html";
                }
            }, 1000);
        } else {
            dataManager.showNotification("Invalid email or password", "error");
        }
    }

    handleSubmit(e) {
        // Default form handling
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');

        if (submitBtn) {
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
                dataManager.showNotification(
                    "Message sent successfully!",
                    "success"
                );
                form.reset();
            }, 2000);
        }
    }
}

// Lazy loading
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
        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchButton");

        if (searchBtn) {
            searchBtn.addEventListener("click", () => this.performSearch());
        }

        if (searchInput) {
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const searchInput = document.getElementById("searchInput");
        const query = searchInput ? searchInput.value.trim() : "";

        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        } else {
            window.location.href = "search.html";
        }
    }
}

// Product interactions
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
        if (isHovering) {
            card.style.transform = "translateY(-5px)";
        } else {
            card.style.transform = "";
        }
    }
}

// Load dynamic content on pages
function loadDynamicContent() {
    const path = window.location.pathname;

    // Load featured products on homepage
    if (path.includes("index.html") || path === "/") {
        loadFeaturedProducts();
    }

    // Check authentication
    checkAuthentication();
}

// Load featured products
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById("featuredProducts");
    if (!featuredGrid) return;

    const products = dataManager.getFeaturedProducts();
    featuredGrid.innerHTML = products
        .map(
            (product) => `
        <div class="product-card card" data-aos="flip-right" data-aos-duration="1900">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.size} - ${dataManager.formatPrice(
                product.price
            )}</p>
            <a href="search.html?q=${encodeURIComponent(
                product.name
            )}" class="btn">Buy Now</a>
        </div>
    `
        )
        .join("");
}

// Check authentication and update UI
function checkAuthentication() {
    const user = dataManager.getCurrentUser();

    if (user) {
        // Update navbar with user info
        const navItems = document.querySelectorAll(".navbar-nav ul");
        if (navItems.length > 0) {
            navItems.forEach((ul) => {
                // Add logout button
                const existingLogout = ul.querySelector(".logout-btn");
                if (!existingLogout && !ul.querySelector(".user-menu")) {
                    const userMenu = document.createElement("li");
                    userMenu.innerHTML = `
                        <a href="profile.html" class="user-info">${user.firstName} ${user.lastName}</a>
                        <button class="logout-btn" style="display: none;">Logout</button>
                    `;
                    ul.appendChild(userMenu);
                }
            });
        }
    }
}

// Add global logout function
window.logout = function () {
    dataManager.logout();
    dataManager.showNotification("Logged out successfully", "success");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
};

// Add CSS animations
const appStyle = document.createElement("style");
appStyle.textContent = `
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
    
    .loading {
        opacity: 0.6;
        pointer-events: none;
    }
`;
document.head.appendChild(appStyle);
