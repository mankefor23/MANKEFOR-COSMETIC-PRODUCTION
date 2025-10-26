/**
 * MANKEFOR COSMETIC PRODUCTION - Frontend API Client
 *
 * This file contains all the functions needed to consume the backend API.
 * Simply call these functions from your frontend code.
 *
 * Usage:
 * 1. Include this file in your HTML: <script src="js/api-client.js"></script>
 * 2. Call the functions directly: await API.auth.login(email, password)
 * 3. Handle responses and errors appropriately
 */

class MankeforAPI {
    constructor(baseURL = "https://your-backend-url.onrender.com/api") {
        this.baseURL = baseURL;
        this.token = localStorage.getItem("authToken");
        this.refreshToken = localStorage.getItem("refreshToken");
    }

    // Helper method to make HTTP requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        // Add authorization header if token exists
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            // Handle token refresh if needed
            if (response.status === 401 && this.refreshToken) {
                const refreshed = await this.refreshAuthToken();
                if (refreshed) {
                    // Retry the original request with new token
                    config.headers.Authorization = `Bearer ${this.token}`;
                    const retryResponse = await fetch(url, config);
                    return await retryResponse.json();
                }
            }

            return data;
        } catch (error) {
            console.error("API Request Error:", error);
            throw new Error("Network error occurred");
        }
    }

    // Set authentication tokens
    setTokens(token, refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refreshToken);
    }

    // Clear authentication tokens
    clearTokens() {
        this.token = null;
        this.refreshToken = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // ==================== AUTHENTICATION ====================

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Registration response
     */
    async register(userData) {
        const response = await this.request("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });

        if (response.success) {
            this.setTokens(response.data.token, response.data.refreshToken);
        }

        return response;
    }

    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} Login response
     */
    async login(email, password) {
        const response = await this.request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (response.success) {
            this.setTokens(response.data.token, response.data.refreshToken);
        }

        return response;
    }

    /**
     * Logout user
     * @returns {Promise<Object>} Logout response
     */
    async logout() {
        const response = await this.request("/auth/logout", {
            method: "POST",
        });

        this.clearTokens();
        return response;
    }

    /**
     * Get current user profile
     * @returns {Promise<Object>} User profile
     */
    async getCurrentUser() {
        return await this.request("/auth/me");
    }

    /**
     * Change user password
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} Change password response
     */
    async changePassword(currentPassword, newPassword) {
        return await this.request("/auth/change-password", {
            method: "PUT",
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    }

    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise<Object>} Password reset response
     */
    async forgotPassword(email) {
        return await this.request("/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
    }

    /**
     * Reset password with token
     * @param {string} token - Reset token
     * @param {string} password - New password
     * @returns {Promise<Object>} Reset password response
     */
    async resetPassword(token, password) {
        return await this.request("/auth/reset-password", {
            method: "PUT",
            body: JSON.stringify({ token, password }),
        });
    }

    /**
     * Refresh authentication token
     * @returns {Promise<boolean>} Success status
     */
    async refreshAuthToken() {
        if (!this.refreshToken) return false;

        try {
            const response = await this.request("/auth/refresh", {
                method: "POST",
                body: JSON.stringify({ refreshToken: this.refreshToken }),
            });

            if (response.success) {
                this.setTokens(response.data.token, response.data.refreshToken);
                return true;
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }

        this.clearTokens();
        return false;
    }

    // ==================== PRODUCTS ====================

    /**
     * Get all products with optional filters
     * @param {Object} filters - Search and filter options
     * @returns {Promise<Object>} Products list
     */
    async getProducts(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/products?${queryParams}` : "/products";
        return await this.request(endpoint);
    }

    /**
     * Get single product by ID
     * @param {string} productId - Product ID
     * @returns {Promise<Object>} Product details
     */
    async getProduct(productId) {
        return await this.request(`/products/${productId}`);
    }

    /**
     * Get featured products
     * @returns {Promise<Object>} Featured products
     */
    async getFeaturedProducts() {
        return await this.request("/products/featured");
    }

    /**
     * Get products by category
     * @param {string} category - Product category
     * @param {Object} filters - Additional filters
     * @returns {Promise<Object>} Products in category
     */
    async getProductsByCategory(category, filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams
            ? `/products/category/${category}?${queryParams}`
            : `/products/category/${category}`;
        return await this.request(endpoint);
    }

    /**
     * Search products
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise<Object>} Search results
     */
    async searchProducts(query, filters = {}) {
        return await this.getProducts({ q: query, ...filters });
    }

    /**
     * Add product review
     * @param {string} productId - Product ID
     * @param {number} rating - Rating (1-5)
     * @param {string} comment - Review comment
     * @returns {Promise<Object>} Review response
     */
    async addProductReview(productId, rating, comment = "") {
        return await this.request(`/products/${productId}/reviews`, {
            method: "POST",
            body: JSON.stringify({ rating, comment }),
        });
    }

    /**
     * Get product reviews
     * @param {string} productId - Product ID
     * @param {Object} filters - Pagination filters
     * @returns {Promise<Object>} Product reviews
     */
    async getProductReviews(productId, filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams
            ? `/products/${productId}/reviews?${queryParams}`
            : `/products/${productId}/reviews`;
        return await this.request(endpoint);
    }

    // ==================== ORDERS ====================

    /**
     * Get user's orders
     * @param {Object} filters - Pagination and filter options
     * @returns {Promise<Object>} User orders
     */
    async getMyOrders(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams
            ? `/orders/my-orders?${queryParams}`
            : "/orders/my-orders";
        return await this.request(endpoint);
    }

    /**
     * Get single order by ID
     * @param {string} orderId - Order ID
     * @returns {Promise<Object>} Order details
     */
    async getOrder(orderId) {
        return await this.request(`/orders/${orderId}`);
    }

    /**
     * Create new order
     * @param {Object} orderData - Order data
     * @returns {Promise<Object>} Order creation response
     */
    async createOrder(orderData) {
        return await this.request("/orders", {
            method: "POST",
            body: JSON.stringify(orderData),
        });
    }

    /**
     * Cancel order
     * @param {string} orderId - Order ID
     * @param {string} reason - Cancellation reason
     * @returns {Promise<Object>} Cancellation response
     */
    async cancelOrder(orderId, reason = "") {
        return await this.request(`/orders/${orderId}/cancel`, {
            method: "PUT",
            body: JSON.stringify({ reason }),
        });
    }

    // ==================== CONTACT ====================

    /**
     * Submit contact form
     * @param {Object} contactData - Contact form data
     * @returns {Promise<Object>} Contact submission response
     */
    async submitContact(contactData) {
        return await this.request("/contact", {
            method: "POST",
            body: JSON.stringify(contactData),
        });
    }

    // ==================== USER MANAGEMENT ====================

    /**
     * Update user profile
     * @param {string} userId - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object>} Update response
     */
    async updateUser(userId, userData) {
        return await this.request(`/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    }

    /**
     * Get user by ID
     * @param {string} userId - User ID
     * @returns {Promise<Object>} User details
     */
    async getUser(userId) {
        return await this.request(`/users/${userId}`);
    }

    // ==================== ADMIN FUNCTIONS ====================

    /**
     * Get admin dashboard data
     * @param {Object} filters - Date filters
     * @returns {Promise<Object>} Dashboard data
     */
    async getDashboard(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams
            ? `/admin/dashboard?${queryParams}`
            : "/admin/dashboard";
        return await this.request(endpoint);
    }

    /**
     * Get analytics data
     * @param {string} period - Analytics period
     * @returns {Promise<Object>} Analytics data
     */
    async getAnalytics(period = "30d") {
        return await this.request(`/admin/analytics?period=${period}`);
    }

    /**
     * Get all users (Admin only)
     * @param {Object} filters - Search and filter options
     * @returns {Promise<Object>} Users list
     */
    async getAllUsers(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/users?${queryParams}` : "/users";
        return await this.request(endpoint);
    }

    /**
     * Get all orders (Admin/Staff only)
     * @param {Object} filters - Search and filter options
     * @returns {Promise<Object>} Orders list
     */
    async getAllOrders(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/orders?${queryParams}` : "/orders";
        return await this.request(endpoint);
    }

    /**
     * Get all contacts (Admin/Staff only)
     * @param {Object} filters - Search and filter options
     * @returns {Promise<Object>} Contacts list
     */
    async getAllContacts(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/contact?${queryParams}` : "/contact";
        return await this.request(endpoint);
    }

    /**
     * Update order status (Admin/Staff only)
     * @param {string} orderId - Order ID
     * @param {string} status - New status
     * @param {string} note - Status update note
     * @returns {Promise<Object>} Update response
     */
    async updateOrderStatus(orderId, status, note = "") {
        return await this.request(`/orders/${orderId}/status`, {
            method: "PUT",
            body: JSON.stringify({ status, note }),
        });
    }

    /**
     * Update contact status (Admin/Staff only)
     * @param {string} contactId - Contact ID
     * @param {string} status - New status
     * @param {string} note - Status update note
     * @returns {Promise<Object>} Update response
     */
    async updateContactStatus(contactId, status, note = "") {
        return await this.request(`/contact/${contactId}/status`, {
            method: "PUT",
            body: JSON.stringify({ status, note }),
        });
    }

    /**
     * Respond to contact (Admin/Staff only)
     * @param {string} contactId - Contact ID
     * @param {string} message - Response message
     * @returns {Promise<Object>} Response submission
     */
    async respondToContact(contactId, message) {
        return await this.request(`/contact/${contactId}/respond`, {
            method: "POST",
            body: JSON.stringify({ message }),
        });
    }

    /**
     * Create admin user (Admin only)
     * @param {Object} userData - Admin user data
     * @returns {Promise<Object>} User creation response
     */
    async createAdminUser(userData) {
        return await this.request("/admin/create-admin", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }

    // ==================== UTILITY FUNCTIONS ====================

    /**
     * Check API health
     * @returns {Promise<Object>} Health status
     */
    async checkHealth() {
        return await this.request("/health");
    }

    /**
     * Get API information
     * @returns {Promise<Object>} API info
     */
    async getAPIInfo() {
        return await this.request("/");
    }

    /**
     * Handle API errors
     * @param {Object} error - Error object
     * @param {Function} callback - Error callback function
     */
    handleError(error, callback) {
        console.error("API Error:", error);

        if (callback && typeof callback === "function") {
            callback(error);
        } else {
            // Default error handling
            if (error.message === "Network error occurred") {
                alert("Network error. Please check your connection.");
            } else if (error.message && error.message.includes("401")) {
                alert("Session expired. Please login again.");
                this.clearTokens();
                window.location.href = "/login.html";
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    }

    /**
     * Show loading state
     * @param {boolean} show - Show or hide loading
     */
    showLoading(show = true) {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.display = show ? "block" : "none";
        }
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccess(message) {
        // You can customize this to match your UI
        const notification = document.createElement("div");
        notification.className = "success-notification";
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
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

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        // You can customize this to match your UI
        const notification = document.createElement("div");
        notification.className = "error-notification";
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 1rem 2rem;
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

// Create global API instance
const API = new MankeforAPI();

// Add CSS animations for notifications
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
`;
document.head.appendChild(style);

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
    module.exports = MankeforAPI;
}
