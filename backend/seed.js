const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Import models
const User = require('./models/User');
const Guide = require('./models/Guide');
const Tour = require('./models/Tour');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tripguide')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Sample data
const guides = [
    {
        name: 'Rajesh Kumar',
        email: 'rajesh@tripguide.com',
        phone: '+91 98765 43210',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        location: 'Jaipur, Rajasthan',
        languages: ['Hindi', 'English', 'Rajasthani'],
        specialties: ['Heritage Tours', 'Cultural Experiences', 'Photography Tours'],
        experience: 12,
        rating: 4.9,
        totalReviews: 156,
        pricePerDay: 2500,
        bio: 'Experienced guide specializing in Rajasthan\'s rich heritage and culture. I love sharing the stories behind every palace and fort.',
        isAvailable: true
    },
    {
        name: 'Priya Sharma',
        email: 'priya@tripguide.com',
        phone: '+91 98765 43211',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        location: 'Varanasi, Uttar Pradesh',
        languages: ['Hindi', 'English', 'Sanskrit'],
        specialties: ['Spiritual Tours', 'Ganga Aarti', 'Temple Visits'],
        experience: 8,
        rating: 4.8,
        totalReviews: 98,
        pricePerDay: 2000,
        bio: 'Passionate about sharing the spiritual essence of Varanasi. Let me take you on a journey through the oldest living city.',
        isAvailable: true
    },
    {
        name: 'Arjun Nair',
        email: 'arjun@tripguide.com',
        phone: '+91 98765 43212',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        location: 'Kerala',
        languages: ['Malayalam', 'English', 'Hindi', 'Tamil'],
        specialties: ['Backwater Tours', 'Ayurveda Retreats', 'Wildlife Safari'],
        experience: 10,
        rating: 4.7,
        totalReviews: 124,
        pricePerDay: 3000,
        bio: 'Kerala native with deep knowledge of God\'s Own Country. From backwaters to hill stations, I\'ll show you the best of Kerala.',
        isAvailable: true
    },
    {
        name: 'Meera Patel',
        email: 'meera@tripguide.com',
        phone: '+91 98765 43213',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        location: 'Agra, Uttar Pradesh',
        languages: ['Hindi', 'English', 'Urdu'],
        specialties: ['Mughal Architecture', 'Food Tours', 'History Tours'],
        experience: 6,
        rating: 4.6,
        totalReviews: 87,
        pricePerDay: 1800,
        bio: 'History enthusiast and certified guide for Taj Mahal and Agra Fort. I bring the Mughal era to life with my stories.',
        isAvailable: true
    },
    {
        name: 'Vikram Singh',
        email: 'vikram@tripguide.com',
        phone: '+91 98765 43214',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        location: 'Leh, Ladakh',
        languages: ['Hindi', 'English', 'Ladakhi'],
        specialties: ['Adventure Tours', 'Trekking', 'Motorcycle Tours'],
        experience: 15,
        rating: 4.9,
        totalReviews: 203,
        pricePerDay: 4000,
        bio: 'Mountain lover and adventure enthusiast. Specialized in high-altitude treks and Ladakh motorcycle expeditions.',
        isAvailable: true
    }
];

const tours = [
    {
        name: 'Golden Triangle Tour',
        description: 'Experience the best of North India with visits to Delhi, Agra, and Jaipur. Witness the magnificent Taj Mahal, explore historic forts, and immerse yourself in rich culture.',
        destination: 'Delhi, Agra, Jaipur',
        duration: { days: 6, nights: 5 },
        price: 25000,
        discountPrice: 22000,
        coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
        images: [
            'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'
        ],
        highlights: ['Taj Mahal at Sunrise', 'Amber Fort Elephant Ride', 'Old Delhi Food Walk', 'Jaipur Pink City Tour'],
        inclusions: ['Accommodation', 'Breakfast', 'AC Transport', 'English Speaking Guide', 'Monument Entry Fees'],
        exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses', 'Travel Insurance'],
        maxGroupSize: 12,
        difficulty: 'easy',
        rating: 4.8,
        totalReviews: 234,
        category: 'heritage',
        isActive: true
    },
    {
        name: 'Kerala Backwaters Experience',
        description: 'Cruise through serene backwaters on a traditional houseboat, explore lush tea plantations, and relax on pristine beaches in God\'s Own Country.',
        destination: 'Kerala',
        duration: { days: 7, nights: 6 },
        price: 35000,
        discountPrice: 32000,
        coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        images: [
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'
        ],
        highlights: ['Alleppey Houseboat Stay', 'Munnar Tea Gardens', 'Kathakali Performance', 'Ayurvedic Massage'],
        inclusions: ['Houseboat Stay', 'All Meals on Houseboat', 'Resort Accommodation', 'Transfers'],
        exclusions: ['Flights', 'Personal Expenses', 'Optional Activities'],
        maxGroupSize: 10,
        difficulty: 'easy',
        rating: 4.9,
        totalReviews: 189,
        category: 'cultural',
        isActive: true
    },
    {
        name: 'Varanasi Spiritual Journey',
        description: 'Discover the spiritual heart of India in the ancient city of Varanasi. Witness the magical Ganga Aarti, explore ancient temples, and experience the circle of life.',
        destination: 'Varanasi',
        duration: { days: 4, nights: 3 },
        price: 15000,
        coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
        images: [
            'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800'
        ],
        highlights: ['Ganga Aarti Ceremony', 'Morning Boat Ride', 'Temple Walk', 'Sarnath Excursion'],
        inclusions: ['Hotel Stay', 'Breakfast', 'Boat Rides', 'Local Guide'],
        exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses'],
        maxGroupSize: 15,
        difficulty: 'easy',
        rating: 4.7,
        totalReviews: 156,
        category: 'spiritual',
        isActive: true
    },
    {
        name: 'Ladakh Adventure Expedition',
        description: 'Embark on the ultimate adventure through the rugged landscapes of Ladakh. Cross high mountain passes, visit ancient monasteries, and camp under starlit skies.',
        destination: 'Leh, Ladakh',
        duration: { days: 10, nights: 9 },
        price: 55000,
        discountPrice: 50000,
        coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
        images: [
            'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800'
        ],
        highlights: ['Khardung La Pass', 'Pangong Lake', 'Nubra Valley', 'Thiksey Monastery', 'River Rafting'],
        inclusions: ['Accommodation', 'All Meals', 'Permits', 'Oxygen Cylinder', '4x4 Vehicle'],
        exclusions: ['Flights to Leh', 'Personal Gear', 'Travel Insurance'],
        maxGroupSize: 8,
        difficulty: 'challenging',
        rating: 4.9,
        totalReviews: 98,
        category: 'adventure',
        isActive: true
    },
    {
        name: 'Rajasthan Royal Heritage Tour',
        description: 'Live like royalty as you explore magnificent palaces, imposing forts, and vibrant bazaars of Rajasthan. Experience the grandeur of India\'s royal past.',
        destination: 'Udaipur, Jodhpur, Jaisalmer',
        duration: { days: 8, nights: 7 },
        price: 45000,
        discountPrice: 40000,
        coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
        images: [
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'
        ],
        highlights: ['Lake Palace Udaipur', 'Mehrangarh Fort', 'Desert Safari', 'Folk Music Night'],
        inclusions: ['Heritage Hotel Stays', 'Breakfast & Dinner', 'AC Transport', 'Expert Guide'],
        exclusions: ['Flights', 'Lunch', 'Personal Shopping'],
        maxGroupSize: 10,
        difficulty: 'easy',
        rating: 4.8,
        totalReviews: 167,
        category: 'heritage',
        isActive: true
    },
    {
        name: 'Goa Beach & Culture',
        description: 'Relax on golden beaches, explore Portuguese heritage, and enjoy vibrant nightlife in India\'s favorite beach destination.',
        destination: 'Goa',
        duration: { days: 5, nights: 4 },
        price: 20000,
        discountPrice: 18000,
        coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
        images: [
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'
        ],
        highlights: ['Beach Hopping', 'Old Goa Churches', 'Spice Plantation', 'Sunset Cruise'],
        inclusions: ['Beach Resort Stay', 'Breakfast', 'Sightseeing', 'Water Sports'],
        exclusions: ['Flights', 'Lunch & Dinner', 'Nightlife Expenses'],
        maxGroupSize: 12,
        difficulty: 'easy',
        rating: 4.6,
        totalReviews: 212,
        category: 'beach',
        isActive: true
    }
];

const adminUser = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@tripguide.com',
    phone: '+91 99999 99999',
    country: 'India',
    password: 'admin123',
    role: 'admin'
};

// Seed function
async function seedDatabase() {
    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Guide.deleteMany({});
        await Tour.deleteMany({});

        // Create admin user
        console.log('👤 Creating admin user...');
        const admin = new User(adminUser);
        await admin.save();
        console.log(`   Admin created: ${admin.email}`);

        // Create guides
        console.log('🧑‍🏫 Creating guides...');
        const createdGuides = await Guide.insertMany(guides);
        console.log(`   ${createdGuides.length} guides created`);

        // Create tours and assign guides
        console.log('🗺️  Creating tours...');
        const toursWithGuides = tours.map((tour, index) => ({
            ...tour,
            guide: createdGuides[index % createdGuides.length]._id
        }));
        const createdTours = await Tour.insertMany(toursWithGuides);
        console.log(`   ${createdTours.length} tours created`);

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📋 Summary:');
        console.log(`   - Admin User: admin@tripguide.com / admin123`);
        console.log(`   - Guides: ${createdGuides.length}`);
        console.log(`   - Tours: ${createdTours.length}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

// Run seeder
seedDatabase();
