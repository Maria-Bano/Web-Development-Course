const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    imageUrl: {
        type: String,
        required: true
    },

    category: {
        type: String,
        default: 'general',
        trim: true
    },

    quantityInStock: {
        type: Number,
        min: 0,
        default: 1
    },

    soldCount: {
        type: Number,
        default: 0
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },

    tags: [String], // e.g., ["featured", "new", "bestseller"]

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Optional: Automatically update `updatedAt` on save
productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product', productSchema);
