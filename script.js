// Check if user is logged in
function checkUserLogin() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        showUserProfile(userData.name);
    }
}

function showUserProfile(fullName) {
    const authBtn = document.getElementById('auth-btn');
    const userProfile = document.getElementById('user-profile');
    const userNameElement = document.getElementById('user-name');
    
    // Extract first name and middle name (first two words)
    const nameParts = fullName.trim().split(' ');
    let displayName = nameParts[0]; // First name
    if (nameParts.length > 1) {
        displayName += ' ' + nameParts[1]; // Add middle name if exists
    }
    
    authBtn.style.display = 'none';
    userProfile.style.display = 'flex';
    userNameElement.textContent = 'Hello, ' + displayName;
}

// Toggle dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.user-dropdown');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (dropdown && !dropdown.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    location.reload();
}

// Set minimum date for all date inputs to today
function setMinDateToToday() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    checkUserLogin();
    setMinDateToToday();
    
    // Dropdown toggle
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown();
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // My Profile click
    const myProfile = document.getElementById('my-profile');
    if (myProfile) {
        myProfile.addEventListener('click', function(e) {
            e.preventDefault();
            // Profile page - feature to be implemented
        });
    }
    
    // My Trips click
    const myTrips = document.getElementById('my-trips');
    if (myTrips) {
        myTrips.addEventListener('click', function(e) {
            e.preventDefault();
            // My Trips page - feature to be implemented
        });
    }
    
    // Cart click
    const cart = document.getElementById('cart');
    if (cart) {
        cart.addEventListener('click', function(e) {
            e.preventDefault();
            // Cart page - feature to be implemented
        });
    }
    
    // Language click
    const language = document.getElementById('language');
    if (language) {
        language.addEventListener('click', function(e) {
            e.preventDefault();
            // Language selection - feature to be implemented
        });
    }
    
    // Currency click
    const currency = document.getElementById('currency');
    if (currency) {
        currency.addEventListener('click', function(e) {
            e.preventDefault();
            // Currency selection - feature to be implemented
        });
    }
    
    // Wishlist click
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const user = localStorage.getItem('user');
            if (!user) {
                window.location.href = 'login.html';
                return;
            }
            // Wishlist page - feature to be implemented
        });
    }
    
    // Update wishlist count
    updateWishlistCount();
});

// Update wishlist count function
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
        countElement.textContent = wishlist.length;
        countElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Login/Sign Up button redirect
document.getElementById('auth-btn').addEventListener('click', function() {
    window.location.href = 'login.html';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Contact Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Form submitted successfully
    this.reset();
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .destination-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// ==================== HOTEL SEARCH FUNCTIONALITY ====================

const staySearchButton = document.getElementById('stay-search-button');

if (staySearchButton) {
    staySearchButton.addEventListener('click', function() {
        const location = document.getElementById('stay-location').value;
        const checkin = document.getElementById('stay-checkin').value;
        const checkout = document.getElementById('stay-checkout').value;
        const guests = document.getElementById('stay-guests').value;

        if (!location) {
            document.getElementById('stay-location').focus();
            return;
        }

        // Build URL parameters
        const params = new URLSearchParams();
        params.set('location', location);
        if (checkin) params.set('checkin', checkin);
        if (checkout) params.set('checkout', checkout);
        if (guests) params.set('guests', guests);

        // Redirect to search hotels page
        window.location.href = `search-hotels.html?${params.toString()}`;
    });
}

// ==================== TOUR GUIDE SEARCH FUNCTIONALITY ====================

// Sample tour guides data
const tourGuides = [
    {
        id: 1,
        name: "Ashok Kumar",
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Sacred & Spiritual Tours",
        languages: "English, Hindi, Bengali",
        rating: 4.9,
        reviews: 287,
        price: 799,
        location: "Varanasi, Agra, Delhi",
        badge: "Top Rated"
    },
    {
        id: 2,
        name: "Priya Sharma",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Heritage & Monument Tours",
        languages: "English, Hindi, Marathi",
        rating: 4.8,
        reviews: 212,
        price: 749,
        location: "Jaipur, Agra, Goa",
        badge: "Expert"
    },
    {
        id: 3,
        name: "Rajesh Nair",
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Backwater & Nature Tours",
        languages: "English, Malayalam, Tamil",
        rating: 4.9,
        reviews: 298,
        price: 899,
        location: "Kerala, Goa, Himalayas",
        badge: "Top Rated"
    },
    {
        id: 4,
        name: "Anjali Gupta",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Food & Cultural Tours",
        languages: "English, Hindi, Punjabi",
        rating: 4.7,
        reviews: 176,
        price: 599,
        location: "Delhi, Jaipur, Varanasi",
        badge: "Popular"
    },
    {
        id: 5,
        name: "Vikram Singh",
        image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Adventure & Trekking Tours",
        languages: "English, Hindi, Nepali",
        rating: 4.8,
        reviews: 243,
        price: 899,
        location: "Himalayas, Manali, Rishikesh",
        badge: "Expert"
    },
    {
        id: 6,
        name: "Deepa Bhat",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Beach & Beach Resorts",
        languages: "English, Kannada, Konkani",
        rating: 4.6,
        reviews: 159,
        price: 649,
        location: "Goa, Kerala, Andaman",
        badge: "Verified"
    },
    {
        id: 7,
        name: "Raj Patel",
        image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "Spiritual & Heritage Tours",
        languages: "English, Hindi, Gujarati",
        rating: 4.9,
        reviews: 278,
        price: 849,
        location: "Delhi, Jaipur, Varanasi",
        badge: "Top Rated"
    },
    {
        id: 8,
        name: "Meera Desai",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        specialty: "City & Local Markets Tours",
        languages: "English, Gujarati, Hindi",
        rating: 4.7,
        reviews: 201,
        price: 549,
        location: "Mumbai, Goa, Jaipur",
        badge: "Popular"
    }
];

// Search functionality - Redirect to search results page
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function() {
    const place = document.getElementById('search-place').value;
    const date = document.getElementById('search-date').value;
    const time = document.getElementById('search-time').value;

    if (!place) {
        document.getElementById('search-place').focus();
        return;
    }

    // Build URL parameters
    const params = new URLSearchParams();
    params.set('place', place);
    if (date) params.set('date', date);
    if (time) params.set('time', time);

    // Redirect to search guides page
    window.location.href = `search-guides.html?${params.toString()}`;
});

function displayGuides(guides) {
    guidesGrid.innerHTML = '';

    guides.forEach(guide => {
        const guideCard = document.createElement('div');
        guideCard.className = 'guide-card';
        guideCard.innerHTML = `
            <div class="guide-info">
                <span class="guide-badge">${guide.badge}</span>
                <h3>${guide.name}</h3>
                <p class="guide-specialty">${guide.specialty}</p>
                <div class="guide-details">
                    <div class="guide-detail">
                        <i class="fas fa-language"></i>
                        <span>${guide.languages}</span>
                    </div>
                    <div class="guide-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${guide.location}</span>
                    </div>
                </div>
                <div class="guide-rating">
                    <span class="stars">
                        ${generateStars(guide.rating)}
                    </span>
                    <span>${guide.rating} (${guide.reviews} reviews)</span>
                </div>
                <div class="guide-price">
                    <div class="price-amount">₹${guide.price} <span>/ hour</span></div>
                    <button class="book-btn" data-guide-id="${guide.id}" data-guide-name="${guide.name}">
                        Book Now
                    </button>
                </div>
            </div>
        `;
        guidesGrid.appendChild(guideCard);

        // Add animation
        guideCard.style.opacity = '0';
        guideCard.style.transform = 'translateY(30px)';
        guideCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            guideCard.style.opacity = '1';
            guideCard.style.transform = 'translateY(0)';
        }, 100 * guides.indexOf(guide));
    });

    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const guideId = this.getAttribute('data-guide-id');
            const guideName = this.getAttribute('data-guide-name');
            const date = document.getElementById('search-date').value;
            const place = document.getElementById('search-place').value;
            
            // Redirect to booking details page
            const params = new URLSearchParams();
            params.set('guideId', guideId);
            params.set('guideName', guideName);
            if (date) params.set('date', date);
            if (place) params.set('place', place);
            
            window.location.href = `booking-details.html?${params.toString()}`;
        });
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// ==================== BOOKING MODAL FUNCTIONALITY ====================

const bookingModal = document.getElementById('booking-modal');
const modalGuideName = document.getElementById('modal-guide-name');
const bookingForm = document.getElementById('booking-form');
const cancelBooking = document.getElementById('cancel-booking');

let selectedGuide = '';

function openBookingModal(guideName) {
    selectedGuide = guideName;
    modalGuideName.textContent = `Booking with ${guideName}`;
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    bookingForm.reset();
}

cancelBooking.addEventListener('click', closeBookingModal);

bookingModal.addEventListener('click', function(e) {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('booking-name').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    const people = document.getElementById('booking-people').value;
    const place = document.getElementById('search-place').value;
    const date = document.getElementById('search-date').value;
    const time = document.getElementById('search-time').value;

    // Get guide price from the selected guide (default to 799 if not found)
    const selectedGuideData = tourGuides.find(g => g.name === selectedGuide);
    const guidePrice = selectedGuideData ? selectedGuideData.price : 799;

    // Store booking data in localStorage for payment page
    const bookingData = {
        guide: selectedGuide,
        name: name,
        email: email,
        phone: phone,
        people: people,
        destination: place,
        date: date || 'To be confirmed',
        time: time || 'To be confirmed',
        price: guidePrice
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));

    // Close modal and redirect to payment page
    closeBookingModal();
    window.location.href = 'payment.html';
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeBookingModal();
    }
});
