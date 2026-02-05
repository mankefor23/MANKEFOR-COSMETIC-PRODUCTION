// API Configuration
const API_BASE_URL = 'http://localhost:3000';

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
// EXPORT API FUNCTIONS
// ============================================

const API = {
    // Auth endpoints
    register,
    login,
    refreshAccessToken,
    getCurrentUser,
    logout,
    
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
