const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Guide name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    photo: {
        type: String,
        default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    languages: [{
        type: String
    }],
    specialties: [{
        type: String
    }],
    experience: {
        type: Number,
        default: 1
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
    pricePerDay: {
        type: Number,
        required: [true, 'Price per day is required']
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    tours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Guide', guideSchema);
