// Enhanced Search functionality for MANKEFOR website

// Product database
const products = [
    {
        id: 1,
        name: "Precious Liquid Soap",
        category: "Liquid Soap",
        size: "500ml",
        price: "500 FCFA",
        image: "/images/500.png",
        description: "Deep cleans clothes and keeps fabrics fresh and soft.",
        tags: ["liquid", "soap", "cleaning", "500ml", "half liter"],
    },
    {
        id: 2,
        name: "Precious Liquid Soap",
        category: "Liquid Soap",
        size: "1000ml",
        price: "1000 FCFA",
        image: "/images/1000.png",
        description: "Deep cleans clothes and keeps fabrics fresh and soft.",
        tags: ["liquid", "soap", "cleaning", "1000ml", "1 liter", "liter"],
    },
    {
        id: 3,
        name: "Precious Liquid Soap",
        category: "Liquid Soap",
        size: "5000ml",
        price: "5000 FCFA",
        image: "/images/5000.png",
        description: "Deep cleans clothes and keeps fabrics fresh and soft.",
        tags: ["liquid", "soap", "cleaning", "5000ml", "5 liter", "bulk"],
    },
    {
        id: 4,
        name: "Precious Essence",
        category: "Perfume",
        size: "Various",
        price: "Contact for Price",
        image: "/images/perfume 7.jpg",
        description:
            "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
        tags: ["essence", "perfume", "fragrance", "luxury", "elegance"],
    },
    {
        id: 5,
        name: "Precious Essence",
        category: "Perfume",
        size: "Various",
        price: "Contact for Price",
        image: "/images/perfume 8.jpg",
        description:
            "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
        tags: ["essence", "perfume", "fragrance", "luxury", "elegance"],
    },
    {
        id: 6,
        name: "Precious Essence",
        category: "Perfume",
        size: "Various",
        price: "Contact for Price",
        image: "/images/perfume 9.jpg",
        description:
            "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
        tags: ["essence", "perfume", "fragrance", "luxury", "elegance"],
    },
    {
        id: 7,
        name: "Precious Power Wash",
        category: "Detergent",
        size: "Various",
        price: "Contact for Price",
        image: "/images/power 1.webp",
        description:
            "Engineered on stains, made for families. Powerful solution for tough stains.",
        tags: ["power", "wash", "detergent", "stains", "tough", "cleaning"],
    },
    {
        id: 8,
        name: "Precious Power Wash",
        category: "Detergent",
        size: "Various",
        price: "Contact for Price",
        image: "/images/power 5.webp",
        description:
            "Engineered on stains, made for families. Powerful solution for tough stains.",
        tags: ["power", "wash", "detergent", "stains", "tough", "cleaning"],
    },
    {
        id: 9,
        name: "Precious Power Wash",
        category: "Detergent",
        size: "Various",
        price: "Contact for Price",
        image: "/images/power 2.webp",
        description:
            "Engineered on stains, made for families. Powerful solution for tough stains.",
        tags: ["power", "wash", "detergent", "stains", "tough", "cleaning"],
    },
    {
        id: 10,
        name: "Precious Bath Glow",
        category: "Bath Products",
        size: "Various",
        price: "Contact for Price",
        image: "/images/bathing 4.jpg",
        description:
            "Nourish your skin with every wash. Gentle, radiant, and refreshing.",
        tags: ["bath", "glow", "skin", "nourish", "gentle", "radiant"],
    },
    {
        id: 11,
        name: "Precious Bath Glow",
        category: "Bath Products",
        size: "Various",
        price: "Contact for Price",
        image: "/images/bathing 6.jpg",
        description:
            "Nourish your skin with every wash. Gentle, radiant, and refreshing.",
        tags: ["bath", "glow", "skin", "nourish", "gentle", "radiant"],
    },
    {
        id: 12,
        name: "Precious Bath Glow",
        category: "Bath Products",
        size: "Various",
        price: "Contact for Price",
        image: "/images/bathing 7.jpg",
        description:
            "Nourish your skin with every wash. Gentle, radiant, and refreshing.",
        tags: ["bath", "glow", "skin", "nourish", "gentle", "radiant"],
    },
    {
        id: 13,
        name: "Precious Pure Bleach",
        category: "Bleach",
        size: "Various",
        price: "Contact for Price",
        image: "/images/javel 3.jpg",
        description:
            "Gentle on fabrics, tough on dirt. Pure, powerful clean that's safe for your family.",
        tags: ["pure", "bleach", "javel", "fabrics", "safe", "powerful"],
    },
    {
        id: 14,
        name: "Precious Pure Bleach",
        category: "Bleach",
        size: "Various",
        price: "Contact for Price",
        image: "/images/javel 6.jpg",
        description:
            "Gentle on fabrics, tough on dirt. Pure, powerful clean that's safe for your family.",
        tags: ["pure", "bleach", "javel", "fabrics", "safe", "powerful"],
    },
    {
        id: 15,
        name: "Precious Pure Bleach",
        category: "Bleach",
        size: "Various",
        price: "Contact for Price",
        image: "/images/javel 5.webp",
        description:
            "Gentle on fabrics, tough on dirt. Pure, powerful clean that's safe for your family.",
        tags: ["pure", "bleach", "javel", "fabrics", "safe", "powerful"],
    },
];

class ProductSearch {
    constructor() {
        this.searchInput = document.getElementById("searchInput");
        this.searchButton = document.getElementById("searchButton");
        this.productGrid = document.getElementById("productGrid");
        this.init();
    }

    init() {
        // Load URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get("q");

        if (query) {
            this.searchInput.value = query;
            this.performSearch(query);
        } else {
            this.displayAllProducts();
        }

        // Event listeners
        if (this.searchButton) {
            this.searchButton.addEventListener("click", () =>
                this.handleSearch()
            );
        }

        if (this.searchInput) {
            this.searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    this.handleSearch();
                }
            });

            // Real-time search
            this.searchInput.addEventListener("input", (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    handleSearch() {
        const query = this.searchInput.value.trim();
        this.performSearch(query);

        // Update URL
        const url = new URL(window.location);
        if (query) {
            url.searchParams.set("q", query);
        } else {
            url.searchParams.delete("q");
        }
        window.history.pushState({}, "", url);
    }

    performSearch(query) {
        if (!query) {
            this.displayAllProducts();
            return;
        }

        // Use dataManager if available
        if (typeof dataManager !== "undefined") {
            const products = dataManager.getProducts({ search: query });
            this.displayProducts(products, query);
        } else {
            const filteredProducts = this.filterProducts(query);
            this.displayProducts(filteredProducts, query);
        }
    }

    filterProducts(query) {
        const searchTerms = query.toLowerCase().split(" ");

        return products.filter((product) => {
            const searchableText = [
                product.name,
                product.category,
                product.size,
                product.description,
                ...product.tags,
            ]
                .join(" ")
                .toLowerCase();

            return searchTerms.every((term) => searchableText.includes(term));
        });
    }

    displayAllProducts() {
        // Use dataManager if available
        if (typeof dataManager !== "undefined") {
            const products = dataManager.getProducts();
            this.displayProducts(products, "");
        } else {
            this.displayProducts(products, "");
        }
    }

    displayProducts(productsToShow, searchQuery) {
        if (!this.productGrid) return;

        // Clear existing content
        this.productGrid.innerHTML = "";

        if (productsToShow.length === 0) {
            this.productGrid.innerHTML = `
        <div class="card text-center" style="grid-column: 1 / -1;">
          <h3>No products found</h3>
          <p>Try searching with different keywords or browse all products.</p>
          <button class="btn" onclick="location.reload()">Show All Products</button>
        </div>
      `;
            return;
        }

        // Add search results summary if searching
        if (searchQuery) {
            const summary = document.createElement("div");
            summary.style.gridColumn = "1 / -1";
            summary.className = "card text-center mb-3";
            summary.innerHTML = `
        <h3>Search Results for "${searchQuery}"</h3>
        <p>Found ${productsToShow.length} product(s)</p>
      `;
            this.productGrid.appendChild(summary);
        }

        // Group products by category
        const groupedProducts = this.groupProductsByCategory(productsToShow);

        Object.keys(groupedProducts).forEach((category) => {
            const categorySection = document.createElement("div");
            categorySection.style.gridColumn = "1 / -1";
            categorySection.innerHTML = `
        <h2 class="text-center mb-3" style="color: var(--primary-color); font-size: 1.8rem; margin-top: 2rem;">${category}</h2>
        <div class="grid grid-3">
          ${groupedProducts[category]
              .map((product) => this.createProductCard(product))
              .join("")}
        </div>
      `;
            this.productGrid.appendChild(categorySection);
        });
    }

    groupProductsByCategory(products) {
        return products.reduce((groups, product) => {
            const category = product.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(product);
            return groups;
        }, {});
    }

    createProductCard(product) {
        // Format price properly
        let priceDisplay =
            typeof product.price === "number"
                ? dataManager
                    ? dataManager.formatPrice(product.price)
                    : `${product.price} FCFA`
                : product.price;

        return `
      <div class="product-card card" data-aos="flip-right" data-aos-duration="1900">
        <img src="${product.image}" alt="${product.name}" loading="lazy" data-aos="flip-right" data-aos-duration="1900" />
        <h3 data-aos="flip-right" data-aos-duration="1900">${product.name}</h3>
        <p data-aos="flip-right" data-aos-duration="1900">${product.description}</p>
        <p class="price" data-aos="flip-right" data-aos-duration="1900">${product.size} - ${priceDisplay}</p>
        <a href="login.html" class="btn" data-aos="flip-right" data-aos-duration="1900" onclick="localStorage.setItem('pendingProduct', '${product.id}');">Buy Now</a>
      </div>
    `;
    }
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    new ProductSearch();
});

// Add CSS for tags
const searchStyle = document.createElement("style");
searchStyle.textContent = `
  .tag {
    display: inline-block;
    background: var(--secondary-color);
    color: var(--text-dark);
    padding: 0.25rem 0.5rem;
    margin: 0.125rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .search-form {
    padding: 2rem;
  }
  
  .search-form .search-container {
    display: flex;
    gap: 0.5rem;
  }
  
  .search-form .search-input {
    flex: 1;
    padding: 1rem;
    border: 2px solid var(--primary-color);
    border-radius: 0.5rem;
    font-size: 1.1rem;
  }
  
  .search-form .search-btn {
    padding: 1rem 2rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .search-form .search-btn:hover {
    background: #e65a00;
  }
`;
document.head.appendChild(searchStyle);
