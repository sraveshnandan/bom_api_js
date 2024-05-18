"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    banners: [
        {
            public_id: String,
            url: String,
        },
    ],
    categories: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    property: [
        {
            name: String,
            value: String,
        },
    ],
    quantity: {
        type: Number,
        default: 10,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            email: String,
            message: String,
            star: Number,
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shop",
    },
}, { timestamps: true });
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.Product = Product;
