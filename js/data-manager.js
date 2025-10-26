/**
 * MANKEFOR COSMETIC PRODUCTION - Data Manager
 * Handles all data using localStorage
 */

class DataManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize default data if not exists
        if (!localStorage.getItem("mankefor_categories")) {
            this.initializeCategories();
        }
        if (!localStorage.getItem("mankefor_products")) {
            this.initializeProducts();
        }
        if (!localStorage.getItem("mankefor_users")) {
            this.initializeUsers();
        }
        if (!localStorage.getItem("mankefor_contacts")) {
            localStorage.setItem("mankefor_contacts", JSON.stringify([]));
        }
        if (!localStorage.getItem("mankefor_orders")) {
            localStorage.setItem("mankefor_orders", JSON.stringify([]));
        }
        if (!localStorage.getItem("mankefor_receipts")) {
            localStorage.setItem("mankefor_receipts", JSON.stringify([]));
        }
    }

    // Initialize categories with their descriptions
    initializeCategories() {
        const categories = [
            {
                id: "liquid-soap",
                name: "PRECIOUS LIQUID SOAP",
                tagline: "Gentle on hands, tough on dirt.",
                description:
                    "Perfect for everyday cleaning with a refreshing scent and lasting freshness.",
                image: "/images/liquid1.webp",
            },
            {
                id: "essence",
                name: "PRECIOUS ESSENCE",
                tagline:
                    "Precious Essence - a timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
                description: "Indulge in the luxury you deserve.",
                image: "/images/perfume 7.jpg",
            },
            {
                id: "bath-glow",
                name: "PRECIOUS BATH GLOW",
                tagline: "Nourish your skin with every wash.",
                description:
                    "Gentle, radiant, and refreshing - for the glow you were born to shine.",
                image: "/images/bathing 4.jpg",
            },
            {
                id: "power-wash",
                name: "PRECIOUS POWER WASH",
                tagline: "Engineered on stains, made for families.",
                description:
                    "Precious Power Wash is your trusted solution for tough stains - powerful, safe, and perfect for both home and industrial use.",
                image: "/images/power 2.webp",
            },
            {
                id: "pure-bleach",
                name: "PRECIOUS PURE BLEACH",
                tagline: "Gentle on fabrics, tough on dirt.",
                description:
                    "Precious Pure Bleach delivers a pure, powerful clean that's safe for your family and strong enough for heavy-duty use.",
                image: "/images/javel 3.jpg",
            },
        ];
        localStorage.setItem("mankefor_categories", JSON.stringify(categories));
    }

    // Initialize products data
    initializeProducts() {
        const products = [
            // Liquid Soap Products
            {
                id: "liquid-500",
                name: "Precious Liquid Soap",
                category: "Liquid Soap",
                size: "500ml (1/2L)",
                price: 500,
                image: "/images/500.png",
                description:
                    "Deep cleans clothes and keeps fabrics fresh and soft. Perfect for hand washing.",
                tags: [
                    "liquid",
                    "soap",
                    "cleaning",
                    "500ml",
                    "half liter",
                    "hand wash",
                ],
                stock: 100,
                isAvailable: true,
                isFeatured: true,
            },
            {
                id: "liquid-1000",
                name: "Precious Liquid Soap",
                category: "Liquid Soap",
                size: "1000ml (1L)",
                price: 1000,
                image: "/images/1000.png",
                description:
                    "Deep cleans clothes and keeps fabrics fresh and soft. Ideal for regular laundry.",
                tags: [
                    "liquid",
                    "soap",
                    "cleaning",
                    "1000ml",
                    "1 liter",
                    "laundry",
                ],
                stock: 80,
                isAvailable: true,
                isFeatured: true,
            },
            {
                id: "liquid-5000",
                name: "Precious Liquid Soap",
                category: "Liquid Soap",
                size: "5000ml (5L)",
                price: 5000,
                image: "/images/5000.png",
                description:
                    "Deep cleans clothes and keeps fabrics fresh and soft. Economy size for large families.",
                tags: [
                    "liquid",
                    "soap",
                    "cleaning",
                    "5000ml",
                    "5 liter",
                    "bulk",
                    "economy",
                ],
                stock: 50,
                isAvailable: true,
                isFeatured: true,
            },
            {
                id: "liquid-variety-1",
                name: "Precious Liquid Soap",
                category: "Liquid Soap",
                size: "Various sizes",
                price: 750,
                image: "/images/liquid1.webp",
                description:
                    "Premium quality liquid soap with gentle formula for all washing needs.",
                tags: ["liquid", "soap", "premium", "gentle", "fresh scent"],
                stock: 70,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "liquid-variety-2",
                name: "Precious Liquid Soap",
                category: "Liquid Soap",
                size: "Various sizes",
                price: 750,
                image: "/images/liquid 2.jpg",
                description:
                    "High-performing liquid soap that removes tough stains while being gentle on fabrics.",
                tags: ["liquid", "soap", "tough stains", "gentle", "effective"],
                stock: 65,
                isAvailable: true,
                isFeatured: false,
            },
            // Essence/Perfume Products
            {
                id: "essence-1",
                name: "Precious Essence",
                category: "Perfume",
                size: "50ml",
                price: 15000,
                image: "/images/perfume 7.jpg",
                description:
                    "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
                tags: ["essence", "perfume", "fragrance", "luxury", "elegance"],
                stock: 30,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-2",
                name: "Precious Essence",
                category: "Perfume",
                size: "100ml",
                price: 25000,
                image: "/images/perfume 8.jpg",
                description:
                    "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
                tags: ["essence", "perfume", "fragrance", "luxury", "elegance"],
                stock: 20,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-3",
                name: "Precious Essence",
                category: "Perfume",
                size: "200ml",
                price: 45000,
                image: "/images/perfume 9.jpg",
                description:
                    "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
                tags: ["essence", "perfume", "fragrance", "luxury", "elegance"],
                stock: 15,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-4",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume 1.jpg",
                description:
                    "Exquisite perfume collection with captivating notes for the modern individual.",
                tags: [
                    "essence",
                    "perfume",
                    "fragrance",
                    "modern",
                    "captivating",
                ],
                stock: 25,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-5",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume 2.jpg",
                description:
                    "Signature scent that leaves a lasting impression. Perfect for special occasions.",
                tags: [
                    "essence",
                    "perfume",
                    "signature",
                    "special occasions",
                    "lasting",
                ],
                stock: 28,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-6",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume 3.jpg",
                description:
                    "Classic fragrance with a modern twist. Timeless elegance in every drop.",
                tags: [
                    "essence",
                    "perfume",
                    "classic",
                    "modern twist",
                    "elegance",
                ],
                stock: 22,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-7",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume 4.jpg",
                description:
                    "Bold and confident fragrance for those who dare to stand out.",
                tags: ["essence", "perfume", "bold", "confident", "stand out"],
                stock: 20,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-8",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume 5.webp",
                description:
                    "Fresh and floral scent that brings nature's beauty to your daily routine.",
                tags: ["essence", "perfume", "fresh", "floral", "nature"],
                stock: 26,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-9",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume 6.webp",
                description:
                    "Sophisticated fragrance that speaks to refined taste and style.",
                tags: [
                    "essence",
                    "perfume",
                    "sophisticated",
                    "refined",
                    "style",
                ],
                stock: 24,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "essence-10",
                name: "Precious Essence",
                category: "Perfume",
                size: "Various sizes",
                price: 20000,
                image: "/images/perfume.10.jpg",
                description:
                    "Ultimate luxury fragrance for the most special moments in life.",
                tags: [
                    "essence",
                    "perfume",
                    "luxury",
                    "special moments",
                    "ultimate",
                ],
                stock: 18,
                isAvailable: true,
                isFeatured: false,
            },
            // Power Wash Products
            {
                id: "power-1",
                name: "Precious Power Wash",
                category: "Detergent",
                size: "1L",
                price: 2000,
                image: "/images/power 1.webp",
                description:
                    "Engineered on stains, made for families. Powerful solution for tough stains.",
                tags: [
                    "power",
                    "wash",
                    "detergent",
                    "stains",
                    "tough",
                    "cleaning",
                ],
                stock: 60,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "power-2",
                name: "Precious Power Wash",
                category: "Detergent",
                size: "2.5L",
                price: 4500,
                image: "/images/power 2.webp",
                description:
                    "Engineered on stains, made for families. Powerful solution for tough stains.",
                tags: [
                    "power",
                    "wash",
                    "detergent",
                    "stains",
                    "tough",
                    "cleaning",
                ],
                stock: 40,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "power-3",
                name: "Precious Power Wash",
                category: "Detergent",
                size: "5L",
                price: 8000,
                image: "/images/power 5.webp",
                description:
                    "Engineered on stains, made for families. Powerful solution for tough stains.",
                tags: [
                    "power",
                    "wash",
                    "detergent",
                    "stains",
                    "tough",
                    "cleaning",
                ],
                stock: 30,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "power-4",
                name: "Precious Power Wash",
                category: "Detergent",
                size: "Various sizes",
                price: 2500,
                image: "/images/power 3.jpg",
                description:
                    "Industrial strength detergent for heavy-duty cleaning tasks.",
                tags: [
                    "power",
                    "wash",
                    "detergent",
                    "industrial",
                    "heavy duty",
                ],
                stock: 35,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "power-5",
                name: "Precious Power Wash",
                category: "Detergent",
                size: "Various sizes",
                price: 2500,
                image: "/images/power 4.webp",
                description:
                    "Concentrated formula that goes further, cleaning more with less.",
                tags: [
                    "power",
                    "wash",
                    "detergent",
                    "concentrated",
                    "efficient",
                ],
                stock: 38,
                isAvailable: true,
                isFeatured: false,
            },
            // Bath Glow Products
            {
                id: "bath-1",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "250ml",
                price: 1500,
                image: "/images/bathing 4.jpg",
                description:
                    "Nourish your skin with every wash. Gentle, radiant, and refreshing.",
                tags: ["bath", "glow", "skin", "nourish", "gentle", "radiant"],
                stock: 50,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-2",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "500ml",
                price: 3000,
                image: "/images/bathing 6.jpg",
                description:
                    "Nourish your skin with every wash. Gentle, radiant, and refreshing.",
                tags: ["bath", "glow", "skin", "nourish", "gentle", "radiant"],
                stock: 35,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-3",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "1L",
                price: 5500,
                image: "/images/bathing 7.jpg",
                description:
                    "Nourish your skin with every wash. Gentle, radiant, and refreshing.",
                tags: ["bath", "glow", "skin", "nourish", "gentle", "radiant"],
                stock: 25,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-4",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 1.jpg",
                description:
                    "Essential oils infused formula for silky smooth skin after every bath.",
                tags: ["bath", "glow", "essential oils", "silky", "smooth"],
                stock: 32,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-5",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 2.jpg",
                description:
                    "Vitamin-enriched formula that nourishes and protects your skin.",
                tags: ["bath", "glow", "vitamin", "nourish", "protect"],
                stock: 28,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-6",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 3.jpg",
                description:
                    "Creamy lather that leaves your skin feeling clean and refreshed.",
                tags: ["bath", "glow", "creamy", "lather", "refreshing"],
                stock: 30,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-7",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 5.jpg",
                description:
                    "Moisturizing formula that keeps your skin soft all day long.",
                tags: ["bath", "glow", "moisturizing", "soft", "long lasting"],
                stock: 27,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-8",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 8.jpg",
                description:
                    "Tropical scent that brings vacation vibes to your daily routine.",
                tags: ["bath", "glow", "tropical", "scent", "vacation vibes"],
                stock: 29,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-9",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 9.webp",
                description:
                    "Organic ingredients that respect your skin and the environment.",
                tags: ["bath", "glow", "organic", "natural", "environment"],
                stock: 26,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bath-10",
                name: "Precious Bath Glow",
                category: "Bath Products",
                size: "Various sizes",
                price: 2800,
                image: "/images/bathing 10.webp",
                description:
                    "Luxury bath experience with premium ingredients for pampered skin.",
                tags: ["bath", "glow", "luxury", "premium", "pampered"],
                stock: 22,
                isAvailable: true,
                isFeatured: false,
            },
            // Bleach Products
            {
                id: "bleach-1",
                name: "Precious Pure Bleach",
                category: "Bleach",
                size: "1L",
                price: 1500,
                image: "/images/javel 3.jpg",
                description:
                    "Gentle on fabrics, tough on dirt. Pure, powerful clean that's safe for your family.",
                tags: [
                    "pure",
                    "bleach",
                    "javel",
                    "fabrics",
                    "safe",
                    "powerful",
                ],
                stock: 70,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bleach-2",
                name: "Precious Pure Bleach",
                category: "Bleach",
                size: "2L",
                price: 2800,
                image: "/images/javel 6.jpg",
                description:
                    "Gentle on fabrics, tough on dirt. Pure, powerful clean that's safe for your family.",
                tags: [
                    "pure",
                    "bleach",
                    "javel",
                    "fabrics",
                    "safe",
                    "powerful",
                ],
                stock: 45,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bleach-3",
                name: "Precious Pure Bleach",
                category: "Bleach",
                size: "5L",
                price: 6500,
                image: "/images/javel 5.webp",
                description:
                    "Gentle on fabrics, tough on dirt. Pure, powerful clean that's safe for your family.",
                tags: [
                    "pure",
                    "bleach",
                    "javel",
                    "fabrics",
                    "safe",
                    "powerful",
                ],
                stock: 30,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bleach-4",
                name: "Precious Pure Bleach",
                category: "Bleach",
                size: "Various sizes",
                price: 2000,
                image: "/images/javel1.webp",
                description:
                    "Ultra-concentrated bleach formula for maximum whitening power.",
                tags: [
                    "pure",
                    "bleach",
                    "concentrated",
                    "whitening",
                    "powerful",
                ],
                stock: 40,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bleach-5",
                name: "Precious Pure Bleach",
                category: "Bleach",
                size: "Various sizes",
                price: 2000,
                image: "/images/javel 2.jpg",
                description:
                    "Disinfecting bleach that sanitizes while it cleans. Perfect for hygiene.",
                tags: ["pure", "bleach", "disinfecting", "sanitize", "hygiene"],
                stock: 38,
                isAvailable: true,
                isFeatured: false,
            },
            {
                id: "bleach-6",
                name: "Precious Pure Bleach",
                category: "Bleach",
                size: "Various sizes",
                price: 2000,
                image: "/images/javel 4.jpg",
                description:
                    "Color-safe bleach formula that brightens without fading your clothes.",
                tags: [
                    "pure",
                    "bleach",
                    "color safe",
                    "brighten",
                    "fade resistant",
                ],
                stock: 35,
                isAvailable: true,
                isFeatured: false,
            },
        ];

        localStorage.setItem("mankefor_products", JSON.stringify(products));
    }

    // Initialize users (admin and sample customers)
    initializeUsers() {
        const users = [
            {
                id: "admin-1",
                firstName: "Admin",
                lastName: "User",
                email: "admin@mankefor.com",
                phone: "+237 651-586-004",
                password: "admin123", // In real app, this would be hashed
                address: "Mobile, Nkwen - Bamenda",
                role: "admin",
                isActive: true,
                createdAt: new Date().toISOString(),
            },
            {
                id: "customer-1",
                firstName: "John",
                lastName: "Doe",
                email: "customer@example.com",
                phone: "+237 123-456-789",
                password: "customer123",
                address: "Mobile, Nkwen - Bamenda",
                role: "customer",
                isActive: true,
                createdAt: new Date().toISOString(),
            },
            {
                id: "131",
                firstName: "Precious",
                lastName: "Mankefor",
                email: "mankefor@cosmetics.com",
                phone: "+237 123-456-789",
                password: "customer123",
                address: "Mobile, Nkwen - Bamenda",
                role: "admin",
                isActive: true,
                createdAt: new Date().toISOString(),
            },
        ];

        localStorage.setItem("mankefor_users", JSON.stringify(users));
    }

    // ==================== CATEGORIES ====================

    getCategories() {
        return JSON.parse(localStorage.getItem("mankefor_categories")) || [];
    }

    getCategoryById(categoryId) {
        const categories = this.getCategories();
        return categories.find((c) => c.id === categoryId);
    }

    // ==================== PRODUCTS ====================

    getProducts(filters = {}) {
        let products =
            JSON.parse(localStorage.getItem("mankefor_products")) || [];

        // Apply filters
        if (filters.categoryId) {
            // Map category IDs to product categories
            const categoryMap = {
                "liquid-soap": "Liquid Soap",
                essence: "Perfume",
                "bath-glow": "Bath Products",
                "power-wash": "Detergent",
                "pure-bleach": "Bleach",
            };
            const categoryName = categoryMap[filters.categoryId];
            if (categoryName) {
                products = products.filter((p) => p.category === categoryName);
            }
        }
        if (filters.category) {
            products = products.filter((p) => p.category === filters.category);
        }
        if (filters.search) {
            const query = filters.search.toLowerCase();
            products = products.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.size.toLowerCase().includes(query) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }
        if (filters.isAvailable !== undefined) {
            products = products.filter(
                (p) => p.isAvailable === filters.isAvailable
            );
        }
        if (filters.isFeatured !== undefined) {
            products = products.filter(
                (p) => p.isFeatured === filters.isFeatured
            );
        }

        return products;
    }

    getProductById(id) {
        const products =
            JSON.parse(localStorage.getItem("mankefor_products")) || [];
        return products.find((p) => p.id === id);
    }

    getFeaturedProducts() {
        return this.getProducts({ isFeatured: true });
    }

    updateProduct(productId, updates) {
        const products =
            JSON.parse(localStorage.getItem("mankefor_products")) || [];
        const index = products.findIndex((p) => p.id === productId);

        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            localStorage.setItem("mankefor_products", JSON.stringify(products));
            return products[index];
        }
        return null;
    }

    // ==================== AUTHENTICATION ====================

    registerUser(userData) {
        const users = JSON.parse(localStorage.getItem("mankefor_users")) || [];
        const user = {
            id: "user-" + Date.now(),
            ...userData,
            role: "customer",
            isActive: true,
            createdAt: new Date().toISOString(),
        };

        users.push(user);
        localStorage.setItem("mankefor_users", JSON.stringify(users));
        return user;
    }

    login(email, password) {
        const users = JSON.parse(localStorage.getItem("mankefor_users")) || [];
        const user = users.find(
            (u) => u.email === email && u.password === password && u.isActive
        );

        if (user) {
            localStorage.setItem("mankefor_currentUser", JSON.stringify(user));
            return user;
        }

        return null;
    }

    logout() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("mankefor_currentUser");
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("mankefor_currentUser");
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated() {
        return !!localStorage.getItem("mankefor_currentUser");
    }

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === "admin";
    }

    // ==================== CONTACTS ====================

    saveContact(contactData) {
        const contacts =
            JSON.parse(localStorage.getItem("mankefor_contacts")) || [];
        const contact = {
            id: "contact-" + Date.now(),
            ...contactData,
            status: "new",
            isRead: false,
            createdAt: new Date().toISOString(),
        };

        contacts.push(contact);
        localStorage.setItem("mankefor_contacts", JSON.stringify(contacts));
        return contact;
    }

    getContacts() {
        return JSON.parse(localStorage.getItem("mankefor_contacts")) || [];
    }

    // ==================== ORDERS ====================

    createOrder(orderData) {
        const orders =
            JSON.parse(localStorage.getItem("mankefor_orders")) || [];
        const user = this.getCurrentUser();

        const order = {
            id: "order-" + Date.now(),
            orderNumber: "ORD-" + Date.now(),
            customer: user ? user.id : "guest",
            ...orderData,
            status: "pending",
            paymentStatus: "pending",
            createdAt: new Date().toISOString(),
        };

        orders.push(order);
        localStorage.setItem("mankefor_orders", JSON.stringify(orders));
        return order;
    }

    getOrders() {
        const orders =
            JSON.parse(localStorage.getItem("mankefor_orders")) || [];

        // If admin, return all orders
        if (this.isAdmin()) {
            return orders;
        }

        // If regular user, return only their orders
        const user = this.getCurrentUser();
        if (user) {
            return orders.filter((o) => o.customer === user.id);
        }

        return [];
    }

    getOrderById(id) {
        const orders =
            JSON.parse(localStorage.getItem("mankefor_orders")) || [];
        return orders.find((o) => o.id === id);
    }

    // ==================== UTILITIES ====================

    formatPrice(price) {
        return new Intl.NumberFormat("fr-CM", {
            style: "currency",
            currency: "XAF",
            minimumFractionDigits: 0,
        }).format(price);
    }

    showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${
                type === "success"
                    ? "#4CAF50"
                    : type === "error"
                    ? "#f44336"
                    : "#2196F3"
            };
            color: white;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease-in";
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Create global instance
const dataManager = new DataManager();
