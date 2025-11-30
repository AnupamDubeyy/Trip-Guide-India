// API configuration
const API_URL = 'http://localhost:5001/api';

// Auth API functions
const authAPI = {
    register: async (name, email, phone, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            // Save token to localStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    getProfile: async (userId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/auth/profile/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    }
};

// Tours API functions
const toursAPI = {
    getGuides: async () => {
        try {
            const response = await fetch(`${API_URL}/tours/guides`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    getGuideById: async (guideId) => {
        try {
            const response = await fetch(`${API_URL}/tours/guides/${guideId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    createBooking: async (bookingData) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/tours/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    getBookings: async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/tours/bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    cancelBooking: async (bookingId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/tours/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { authAPI, toursAPI };
}
