const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Guide = require('../models/Guide');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const { auth, optionalAuth } = require('../middleware/auth');

// ==================== GUIDES ROUTES ====================

// @route   GET /api/tours/guides
// @desc    Get all guides
// @access  Public
router.get('/guides', async (req, res) => {
    try {
        const { location, language, minRating, maxPrice, sortBy } = req.query;
        
        let query = { isAvailable: true };
        
        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        
        // Filter by language
        if (language) {
            query.languages = { $in: [new RegExp(language, 'i')] };
        }
        
        // Filter by minimum rating
        if (minRating) {
            query.rating = { $gte: parseFloat(minRating) };
        }
        
        // Filter by max price
        if (maxPrice) {
            query.pricePerDay = { $lte: parseFloat(maxPrice) };
        }

        let sortOption = {};
        switch (sortBy) {
            case 'rating':
                sortOption = { rating: -1 };
                break;
            case 'price_low':
                sortOption = { pricePerDay: 1 };
                break;
            case 'price_high':
                sortOption = { pricePerDay: -1 };
                break;
            case 'experience':
                sortOption = { experience: -1 };
                break;
            default:
                sortOption = { rating: -1 };
        }

        const guides = await Guide.find(query).sort(sortOption);
        
        res.json({
            count: guides.length,
            guides
        });
    } catch (error) {
        console.error('Get guides error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tours/guides/:guideId
// @desc    Get guide by ID
// @access  Public
router.get('/guides/:guideId', async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.guideId).populate('tours');
        
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }

        res.json(guide);
    } catch (error) {
        console.error('Get guide error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== TOURS ROUTES ====================

// @route   GET /api/tours
// @desc    Get all tours
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { destination, category, minPrice, maxPrice, duration, sortBy, page = 1, limit = 10 } = req.query;
        
        let query = { isActive: true };
        
        // Filter by destination
        if (destination) {
            query.destination = { $regex: destination, $options: 'i' };
        }
        
        // Filter by category
        if (category) {
            query.category = category;
        }
        
        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Filter by duration
        if (duration) {
            query['duration.days'] = parseInt(duration);
        }

        let sortOption = {};
        switch (sortBy) {
            case 'price_low':
                sortOption = { price: 1 };
                break;
            case 'price_high':
                sortOption = { price: -1 };
                break;
            case 'rating':
                sortOption = { rating: -1 };
                break;
            case 'duration':
                sortOption = { 'duration.days': 1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const tours = await Tour.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('guide', 'name photo rating');
            
        const total = await Tour.countDocuments(query);

        res.json({
            count: tours.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            tours
        });
    } catch (error) {
        console.error('Get tours error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tours/:tourId
// @desc    Get tour by ID
// @access  Public
router.get('/:tourId', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.tourId).populate('guide');
        
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.json(tour);
    } catch (error) {
        console.error('Get tour error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== BOOKINGS ROUTES ====================

// @route   POST /api/tours/bookings
// @desc    Create a new booking
// @access  Private
router.post('/bookings', auth, [
    body('bookingType').isIn(['tour', 'guide']).withMessage('Invalid booking type'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('totalPrice').isNumeric().withMessage('Total price is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: errors.array()[0].msg,
                errors: errors.array() 
            });
        }

        const {
            bookingType,
            tourId,
            guideId,
            destination,
            startDate,
            endDate,
            numberOfTravelers,
            totalPrice,
            specialRequests,
            contactInfo
        } = req.body;

        // Validate tour or guide exists
        if (bookingType === 'tour' && tourId) {
            const tour = await Tour.findById(tourId);
            if (!tour) {
                return res.status(404).json({ message: 'Tour not found' });
            }
        }

        if (bookingType === 'guide' && guideId) {
            const guide = await Guide.findById(guideId);
            if (!guide) {
                return res.status(404).json({ message: 'Guide not found' });
            }
        }

        // Create booking
        const booking = new Booking({
            user: req.user._id,
            bookingType,
            tour: tourId || undefined,
            guide: guideId || undefined,
            destination,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            numberOfTravelers: numberOfTravelers || { adults: 1, children: 0 },
            totalPrice,
            specialRequests,
            contactInfo: contactInfo || {
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone
            }
        });

        await booking.save();

        // Populate for response
        await booking.populate('tour guide');

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tours/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/bookings', auth, async (req, res) => {
    try {
        const { status, sortBy } = req.query;
        
        let query = { user: req.user._id };
        
        if (status) {
            query.bookingStatus = status;
        }

        let sortOption = { createdAt: -1 };
        if (sortBy === 'date') {
            sortOption = { startDate: 1 };
        }

        const bookings = await Booking.find(query)
            .sort(sortOption)
            .populate('tour', 'name destination coverImage price')
            .populate('guide', 'name photo location pricePerDay');

        res.json({
            count: bookings.length,
            bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tours/bookings/:bookingId
// @desc    Get booking by ID
// @access  Private
router.get('/bookings/:bookingId', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId)
            .populate('tour')
            .populate('guide')
            .populate('user', 'name email phone');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user owns this booking or is admin
        if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(booking);
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/tours/bookings/:bookingId
// @desc    Cancel a booking
// @access  Private
router.delete('/bookings/:bookingId', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Check if booking can be cancelled
        if (booking.bookingStatus === 'completed') {
            return res.status(400).json({ message: 'Cannot cancel a completed booking' });
        }

        if (booking.bookingStatus === 'cancelled') {
            return res.status(400).json({ message: 'Booking is already cancelled' });
        }

        // Update booking status
        booking.bookingStatus = 'cancelled';
        booking.cancellationReason = req.body.reason || 'User requested cancellation';
        booking.cancelledAt = new Date();

        await booking.save();

        res.json({
            message: 'Booking cancelled successfully',
            booking
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== DESTINATIONS ROUTES ====================

// @route   GET /api/tours/destinations
// @desc    Get popular destinations
// @access  Public
router.get('/destinations/popular', async (req, res) => {
    try {
        // Aggregate unique destinations with tour count
        const destinations = await Tour.aggregate([
            { $match: { isActive: true } },
            { $group: { 
                _id: '$destination',
                tourCount: { $sum: 1 },
                avgRating: { $avg: '$rating' },
                minPrice: { $min: '$price' }
            }},
            { $sort: { tourCount: -1 } },
            { $limit: 10 }
        ]);

        res.json({
            count: destinations.length,
            destinations
        });
    } catch (error) {
        console.error('Get destinations error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
