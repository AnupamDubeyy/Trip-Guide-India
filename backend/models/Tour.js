const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    destination: {
        type: String,
        required: [true, 'Destination is required']
    },
    duration: {
        days: {
            type: Number,
            required: true
        },
        nights: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    discountPrice: {
        type: Number
    },
    images: [{
        type: String
    }],
    coverImage: {
        type: String,
        required: [true, 'Cover image is required']
    },
    highlights: [{
        type: String
    }],
    inclusions: [{
        type: String
    }],
    exclusions: [{
        type: String
    }],
    itinerary: [{
        day: Number,
        title: String,
        description: String,
        activities: [String]
    }],
    maxGroupSize: {
        type: Number,
        default: 15
    },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'challenging'],
        default: 'easy'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide'
    },
    startDates: [{
        type: Date
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['adventure', 'cultural', 'wildlife', 'beach', 'mountain', 'heritage', 'spiritual'],
        default: 'cultural'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Virtual for formatted duration
tourSchema.virtual('formattedDuration').get(function() {
    return `${this.duration.days}D/${this.duration.nights}N`;
});

module.exports = mongoose.model('Tour', tourSchema);
