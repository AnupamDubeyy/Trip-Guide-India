const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide'
    },
    bookingType: {
        type: String,
        enum: ['tour', 'guide'],
        required: true
    },
    destination: {
        type: String,
        required: [true, 'Destination is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    numberOfTravelers: {
        adults: {
            type: Number,
            default: 1,
            min: 1
        },
        children: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded', 'failed'],
        default: 'pending'
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot exceed 500 characters']
    },
    contactInfo: {
        name: String,
        email: String,
        phone: String
    },
    paymentDetails: {
        transactionId: String,
        paymentMethod: String,
        paidAt: Date
    },
    cancellationReason: {
        type: String
    },
    cancelledAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Generate booking reference
bookingSchema.pre('save', function(next) {
    if (!this.bookingReference) {
        this.bookingReference = 'TG' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
    }
    next();
});

// Virtual for duration in days
bookingSchema.virtual('durationDays').get(function() {
    return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Booking', bookingSchema);
