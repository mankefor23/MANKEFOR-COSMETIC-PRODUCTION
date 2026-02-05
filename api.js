// API Configuration
const API_BASE_URL = 'https://cosmetic-backend-zna0.onrender.com';

// Token Management
function getToken() {
    return localStorage.getItem('accessToken');
}

function setToken(token) {
    localStorage.setItem('accessToken', token);
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
}

function clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
}

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Helper function to make fetch requests
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Add authorization token if available
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Request failed',
                data: data
            };
        }

        return data;
    } catch (error) {
        // Re-throw error for caller to handle
        throw error;
    }
}

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Register a new user
 * @param {Object} userData - { firstName, lastName, email, phone, password }
 * @returns {Promise<Object>} - { success, message, data: { user, token, refreshToken } }
 */
async function register(userData) {
    try {
        console.log('Registering user with data:', userData);
        const response = await fetchAPI('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        console.log('Register response:', response);

        // Extract data from response
        const { token, refreshToken, user } = response.data || {};

        // Save tokens and user data
        if (token) {
            console.log('Saving access token...');
            setToken(token);
        }
        if (refreshToken) {
            console.log('Saving refresh token...');
            setRefreshToken(refreshToken);
        }
        if (user) {
            // Combine firstName and lastName into name
            const userData = {
                ...user,
                name: `${user.firstName} ${user.lastName}`
            };
            console.log('Saving user data:', userData);
            saveUser(userData);
        }

        console.log('Registration complete. Token:', getToken());
        console.log('User:', getUser());

        return response;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - { success, message, data: { user, token, refreshToken } }
 */
async function login(credentials) {
    try {
        console.log('Logging in with credentials:', { email: credentials.email, password: '***' });
        const response = await fetchAPI('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });

        console.log('Login response:', response);

        // Extract data from response
        const { token, refreshToken, user } = response.data || {};

        // Save tokens and user data
        if (token) {
            console.log('Saving access token...');
            setToken(token);
        }
        if (refreshToken) {
            console.log('Saving refresh token...');
            setRefreshToken(refreshToken);
        }
        if (user) {
            // Combine firstName and lastName into name
            const userData = {
                ...user,
                name: `${user.firstName} ${user.lastName}`
            };
            console.log('Saving user data:', userData);
            saveUser(userData);
        }

        console.log('Login complete. Token:', getToken());
        console.log('User:', getUser());

        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

/**
 * Refresh access token using refresh token
 * @returns {Promise<Object>} - { success, token, refreshToken }
 */
async function refreshAccessToken() {
    try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
            throw { message: 'No refresh token available' };
        }

        const response = await fetchAPI('/api/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken })
        });

        // Extract tokens from response.data
        const { token, refreshToken: newRefreshToken } = response.data || {};

        // Update tokens
        if (token) {
            setToken(token);
        }
        if (newRefreshToken) {
            setRefreshToken(newRefreshToken);
        }

        return response;
    } catch (error) {
        console.error('Token refresh error:', error);
        // Clear tokens if refresh fails
        clearTokens();
        throw error;
    }
}

/**
 * Get current authenticated user
 * @returns {Promise<Object>} - { success, user }
 */
async function getCurrentUser() {
    try {
        const response = await fetchAPI('/api/auth/me', {
            method: 'GET'
        });

        // Extract user from response.data
        const { user } = response.data || {};

        // Update local user data
        if (user) {
            // Combine firstName and lastName into name
            const userData = {
                ...user,
                name: `${user.firstName} ${user.lastName}`
            };
            saveUser(userData);
        }

        return response;
    } catch (error) {
        console.error('Get current user error:', error);
        throw error;
    }
}

/**
 * Logout user
 * @returns {Promise<Object>} - { success, message }
 */
async function logout() {
    try {
        const response = await fetchAPI('/api/auth/logout', {
            method: 'POST'
        });

        // Clear local storage
        clearTokens();

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        // Clear tokens even if logout request fails
        clearTokens();
        throw error;
    }
}

// ============================================
// CHECK AUTHENTICATION STATUS
// ============================================

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
function isAuthenticated() {
    return !!getToken();
}

/**
 * Check if user has admin role
 * @returns {boolean}
 */
function isAdmin() {
    const user = getUser();
    return user && user.role === 'admin';
}

// ============================================
// CONTACT ENDPOINTS
// ============================================

/**
 * Submit contact form
 * @param {Object} contactData - { name, email, phone, message, subject }
 * @returns {Promise<Object>} - { success, message, data }
 */
async function submitContact(contactData) {
    try {
        console.log('Submitting contact form:', contactData);
        const response = await fetchAPI('/api/contact', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });

        console.log('Contact form response:', response);
        return response;
    } catch (error) {
        console.error('Contact form error:', error);
        throw error;
    }
}

// ============================================
// PRODUCTS ENDPOINTS
// ============================================

/**
 * Get all products with optional filters
 * @param {Object} params - Query parameters (page, limit, q, category, minPrice, maxPrice, etc.)
 * @returns {Promise<Object>} - { success, data: { products, pagination } }
 */
async function getProducts(params = {}) {
    try {
        // Build query string from params
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/api/products?${queryString}` : '/api/products';
        
        console.log('Fetching products:', endpoint);
        const response = await fetchAPI(endpoint, {
            method: 'GET'
        });

        console.log('Products response:', response);
        return response;
    } catch (error) {
        console.error('Get products error:', error);
        throw error;
    }
}

/**
 * Get single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} - { success, data: { product } }
 */
async function getProduct(productId) {
    try {
        console.log('Fetching product:', productId);
        const response = await fetchAPI(`/api/products/${productId}`, {
            method: 'GET'
        });

        console.log('Product response:', response);
        return response;
    } catch (error) {
        console.error('Get product error:', error);
        throw error;
    }
}

/**
 * Get featured products
 * @returns {Promise<Object>} - { success, data: { products } }
 */
async function getFeaturedProducts() {
    try {
        console.log('Fetching featured products');
        const response = await fetchAPI('/api/products/featured', {
            method: 'GET'
        });

        console.log('Featured products response:', response);
        return response;
    } catch (error) {
        console.error('Get featured products error:', error);
        throw error;
    }
}

/**
 * Get products by category
 * @param {string} category - Category name
 * @param {Object} params - Query parameters (page, limit)
 * @returns {Promise<Object>} - { success, data: { products, pagination } }
 */
async function getProductsByCategory(category, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString 
            ? `/api/products/category/${category}?${queryString}` 
            : `/api/products/category/${category}`;
        
        console.log('Fetching products by category:', endpoint);
        const response = await fetchAPI(endpoint, {
            method: 'GET'
        });

        console.log('Products by category response:', response);
        return response;
    } catch (error) {
        console.error('Get products by category error:', error);
        throw error;
    }
}

/**
 * Search products
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters
 * @returns {Promise<Object>} - { success, data: { products, pagination } }
 */
async function searchProducts(query, params = {}) {
    try {
        const searchParams = { q: query, ...params };
        return await getProducts(searchParams);
    } catch (error) {
        console.error('Search products error:', error);
        throw error;
    }
}

/**
 * Add review to product
 * @param {string} productId - Product ID
 * @param {Object} reviewData - { rating, comment }
 * @returns {Promise<Object>} - { success, message, data: { review } }
 */
async function addProductReview(productId, reviewData) {
    try {
        console.log('Adding review to product:', productId, reviewData);
        const response = await fetchAPI(`/api/products/${productId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });

        console.log('Add review response:', response);
        return response;
    } catch (error) {
        console.error('Add review error:', error);
        throw error;
    }
}

/**
 * Get product reviews
 * @param {string} productId - Product ID
 * @param {Object} params - Query parameters (page, limit)
 * @returns {Promise<Object>} - { success, data: { reviews, rating, pagination } }
 */
async function getProductReviews(productId, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString 
            ? `/api/products/${productId}/reviews?${queryString}` 
            : `/api/products/${productId}/reviews`;
        
        console.log('Fetching product reviews:', endpoint);
        const response = await fetchAPI(endpoint, {
            method: 'GET'
        });

        console.log('Product reviews response:', response);
        return response;
    } catch (error) {
        console.error('Get product reviews error:', error);
        throw error;
    }
}

// ============================================
// EXPORT API FUNCTIONS
// ============================================

const API = {
    // Auth endpoints
    register,
    login,
    refreshAccessToken,
    getCurrentUser,
    logout,
    
    // Contact endpoints
    submitContact,
    
    // Products endpoints
    getProducts,
    getProduct,
    getFeaturedProducts,
    getProductsByCategory,
    searchProducts,
    addProductReview,
    getProductReviews,
    
    // Token management
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
    clearTokens,
    
    // User management
    getUser,
    saveUser,
    isAuthenticated,
    isAdmin,
    
    // Base fetch helper (for custom requests)
    fetch: fetchAPI,
    baseURL: API_BASE_URL
};

// Make API available globally (for use in HTML pages)
window.API = API;
