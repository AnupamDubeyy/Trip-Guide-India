// Payment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load booking data from localStorage
    loadBookingData();
    
    // Initialize payment tabs
    initPaymentTabs();
    
    // Initialize form handlers
    initCardForm();
    initUPIForm();
    initNetBankingForm();
    initWalletForm();
    
    // Format card number input
    formatCardInputs();
});

// Load booking data from localStorage
function loadBookingData() {
    const bookingData = JSON.parse(localStorage.getItem('pendingBooking'));
    
    if (!bookingData) {
        // No booking data, redirect to home
        alert('No booking data found. Please make a booking first.');
        window.location.href = 'index.html';
        return;
    }
    
    // Populate summary
    document.getElementById('summary-guide').textContent = bookingData.guide || '--';
    document.getElementById('summary-customer').textContent = bookingData.name || '--';
    document.getElementById('summary-email').textContent = bookingData.email || '--';
    document.getElementById('summary-phone').textContent = bookingData.phone || '--';
    document.getElementById('summary-destination').textContent = bookingData.destination || '--';
    document.getElementById('summary-date').textContent = bookingData.date || 'To be confirmed';
    document.getElementById('summary-time').textContent = bookingData.time || 'To be confirmed';
    document.getElementById('summary-people').textContent = bookingData.people ? `${bookingData.people} person(s)` : '--';
    
    // Calculate total (example: base price * number of people)
    const basePrice = bookingData.price || 799;
    const people = parseInt(bookingData.people) || 1;
    const totalAmount = basePrice * people;
    
    // Update all amount displays
    document.getElementById('summary-total').textContent = `₹${totalAmount.toLocaleString()}`;
    document.getElementById('card-pay-amount').textContent = `₹${totalAmount.toLocaleString()}`;
    document.getElementById('upi-pay-amount').textContent = `₹${totalAmount.toLocaleString()}`;
    document.getElementById('netbanking-pay-amount').textContent = `₹${totalAmount.toLocaleString()}`;
    document.getElementById('wallet-pay-amount').textContent = `₹${totalAmount.toLocaleString()}`;
    
    // Store total amount for later use
    localStorage.setItem('paymentAmount', totalAmount);
}

// Initialize payment method tabs
function initPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const forms = document.querySelectorAll('.payment-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            document.getElementById(`${method}-form`).classList.add('active');
        });
    });
}

// Initialize Card Payment Form
function initCardForm() {
    const form = document.getElementById('card-payment-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardName = document.getElementById('card-name').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        
        // Basic validation
        if (cardNumber.length < 16) {
            alert('Please enter a valid card number');
            return;
        }
        
        if (!validateExpiry(cardExpiry)) {
            alert('Please enter a valid expiry date');
            return;
        }
        
        if (cardCvv.length < 3) {
            alert('Please enter a valid CVV');
            return;
        }
        
        // Process payment
        processPayment('card');
    });
}

// Initialize UPI Payment Form
function initUPIForm() {
    // UPI App buttons
    const upiApps = document.querySelectorAll('.upi-app');
    upiApps.forEach(app => {
        app.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            upiApps.forEach(a => a.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // UPI ID form
    const form = document.getElementById('upi-payment-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const upiId = document.getElementById('upi-id').value;
        
        // Basic UPI validation
        if (!upiId.includes('@')) {
            alert('Please enter a valid UPI ID');
            return;
        }
        
        processPayment('upi');
    });
}

// Initialize Net Banking Form
function initNetBankingForm() {
    const bankOptions = document.querySelectorAll('.bank-option');
    let selectedBank = null;
    
    bankOptions.forEach(bank => {
        bank.addEventListener('click', function() {
            bankOptions.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedBank = this.getAttribute('data-bank');
        });
    });
    
    const bankSelect = document.getElementById('other-bank-select');
    bankSelect.addEventListener('change', function() {
        if (this.value) {
            bankOptions.forEach(b => b.classList.remove('selected'));
            selectedBank = this.value;
        }
    });
    
    document.getElementById('netbanking-pay-btn').addEventListener('click', function() {
        if (!selectedBank && !bankSelect.value) {
            alert('Please select a bank');
            return;
        }
        processPayment('netbanking');
    });
}

// Initialize Wallet Payment Form
function initWalletForm() {
    const walletOptions = document.querySelectorAll('.wallet-option');
    let selectedWallet = null;
    
    walletOptions.forEach(wallet => {
        wallet.addEventListener('click', function() {
            walletOptions.forEach(w => w.classList.remove('selected'));
            this.classList.add('selected');
            selectedWallet = this.getAttribute('data-wallet');
        });
    });
    
    document.getElementById('wallet-pay-btn').addEventListener('click', function() {
        if (!selectedWallet) {
            alert('Please select a wallet');
            return;
        }
        processPayment('wallet');
    });
}

// Format card inputs
function formatCardInputs() {
    // Format card number
    const cardNumber = document.getElementById('card-number');
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
    });
    
    // Format expiry date
    const cardExpiry = document.getElementById('card-expiry');
    cardExpiry.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });
    
    // CVV only numbers
    const cardCvv = document.getElementById('card-cvv');
    cardCvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Validate expiry date
function validateExpiry(expiry) {
    if (!expiry || !expiry.includes('/')) return false;
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
}

// Process payment
function processPayment(method) {
    // Show processing modal
    const processingModal = document.getElementById('processing-modal');
    processingModal.classList.add('active');
    
    // Simulate payment processing
    setTimeout(() => {
        processingModal.classList.remove('active');
        
        // Generate booking ID
        const bookingId = 'TG' + Date.now().toString().slice(-8);
        document.getElementById('booking-id').textContent = bookingId;
        
        // Save booking to localStorage
        const bookingData = JSON.parse(localStorage.getItem('pendingBooking'));
        const completedBooking = {
            ...bookingData,
            bookingId: bookingId,
            paymentMethod: method,
            paymentStatus: 'completed',
            bookingDate: new Date().toISOString(),
            amount: localStorage.getItem('paymentAmount')
        };
        
        // Save to completed bookings
        let bookings = JSON.parse(localStorage.getItem('completedBookings') || '[]');
        bookings.push(completedBooking);
        localStorage.setItem('completedBookings', JSON.stringify(bookings));
        
        // Clear pending booking
        localStorage.removeItem('pendingBooking');
        localStorage.removeItem('paymentAmount');
        
        // Show success modal
        document.getElementById('payment-success-modal').classList.add('active');
        
    }, 2500); // Simulate 2.5 seconds processing time
}

// Close modal on clicking outside
document.querySelectorAll('.payment-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this && this.id !== 'processing-modal') {
            this.classList.remove('active');
        }
    });
});
