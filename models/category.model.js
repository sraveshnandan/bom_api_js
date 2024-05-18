"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Category name is required."],
    },
    image: {
        public_id: String,
        url: String,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.Category = (0, mongoose_1.model)("Category", CategorySchema);
