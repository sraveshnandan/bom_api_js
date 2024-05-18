"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBannerFunction = exports.UpdateBannerFunction = exports.GetBanners = exports.createBannerFunction = exports.DeleteCategoryFunction = exports.UpdateCategoryFunction = exports.GetCategory = exports.createCategoryFunction = void 0;
const lib_1 = require("../lib");
const models_1 = require("../models");
const createCategoryFunction = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            return res.status(401).json({
                success: false,
                message: "Category Image is required.",
            });
        }
        const newCategory = {
            name,
            creator: res.user._id,
            image: {},
        };
        console.log("Uploading img....");
        const result = await new Promise((resolve, reject) => {
            lib_1.imagekit.upload({
                file: req.file?.buffer,
                fileName: `${res.user?._id}${req.file?.originalname}`,
                tags: [
                    "single-upload-user-avatar",
                    `${res.user?.full_name}`,
                    `${res.user?._id}`,
                ], // Optionally, add tags
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        console.log("Uploading done..");
        newCategory.image = {
            public_id: result.fileId,
            url: result.url,
        };
        const newCat = await models_1.Category.create(newCategory);
        res.status(201).json({
            success: true,
            message: `New Category created with name:${newCat.name}`,
            new_category: newCat,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createCategoryFunction = createCategoryFunction;
const GetCategory = async (req, res) => {
    try {
        const { limit } = req.headers;
        const categories = await models_1.Category.find({})
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .populate("creator");
        res.status(200).json({
            success: true,
            message: "Category fetched successfully.",
            categories,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.GetCategory = GetCategory;
const UpdateCategoryFunction = async (req, res) => {
    try {
        const { name, id } = req.body;
        const category = await models_1.Category.findById({ _id: id });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id , No category found.",
            });
        }
        let updatePayload = {
            name,
            image: category.image,
        };
        if (req.file) {
            // deleting previous image
            const fileId = category.image.public_id;
            const deleteRequest = await new Promise((resolve, reject) => {
                lib_1.imagekit.deleteFile(fileId, (err, result) => {
                    if (err) {
                        reject(err);
                        console.log("Previous file deletion error.", err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            //uploading new one
            console.log("Uploading img....");
            const result = await new Promise((resolve, reject) => {
                lib_1.imagekit.upload({
                    file: req.file?.buffer,
                    fileName: `${req.file?.originalname}`,
                    tags: ["categoy image"], // Optionally, add tags
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            console.log("Uploading done..");
            updatePayload.image = {
                public_id: result.fileId,
                url: result.url,
            };
        }
        const catId = category._id;
        const updatedCategory = await models_1.Category.findByIdAndUpdate({ _id: catId }, { ...updatePayload }, { new: true });
        res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            updatedCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.UpdateCategoryFunction = UpdateCategoryFunction;
const DeleteCategoryFunction = async (req, res) => {
    try {
        const { id } = req.query;
        const category = await models_1.Category.findById({ _id: id });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id, No category found.",
            });
        }
        await models_1.Category.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.DeleteCategoryFunction = DeleteCategoryFunction;
const createBannerFunction = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            return res.status(401).json({
                success: false,
                message: "Banner Image is required.",
            });
        }
        const newCategory = {
            name,
            creator: res.user._id,
            image: {},
        };
        console.log("Uploading img....");
        const result = await new Promise((resolve, reject) => {
            lib_1.imagekit.upload({
                file: req.file?.buffer,
                fileName: `${res.user?._id}${req.file?.originalname}`,
                tags: [
                    "single-upload-user-avatar",
                    `${res.user?.full_name}`,
                    `${res.user?._id}`,
                ], // Optionally, add tags
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        console.log("Uploading done..");
        newCategory.image = {
            public_id: result.fileId,
            url: result.url,
        };
        const newBan = await models_1.Banner.create(newCategory);
        res.status(201).json({
            success: true,
            message: `New Banner created with name:${newBan.name}`,
            new_category: newBan,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createBannerFunction = createBannerFunction;
const GetBanners = async (req, res) => {
    try {
        const { limit } = req.headers;
        const Banners = await models_1.Banner.find({})
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .populate("creator");
        res.status(200).json({
            success: true,
            message: "Banners fetched successfully.",
            Banners,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.GetBanners = GetBanners;
const UpdateBannerFunction = async (req, res) => {
    try {
        const { name, id } = req.body;
        const banner = await models_1.Banner.findById({ _id: id });
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id , No category found.",
            });
        }
        let updatePayload = {
            name,
            image: banner.image,
        };
        if (req.file) {
            // deleting previous image
            const fileId = banner.image.public_id;
            const deleteRequest = await new Promise((resolve, reject) => {
                lib_1.imagekit.deleteFile(fileId, (err, result) => {
                    if (err) {
                        reject(err);
                        console.log("Previous file deletion error.", err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            //uploading new one
            console.log("Uploading img....");
            const result = await new Promise((resolve, reject) => {
                lib_1.imagekit.upload({
                    file: req.file?.buffer,
                    fileName: `${req.file?.originalname}`,
                    tags: ["categoy image"], // Optionally, add tags
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            console.log("Uploading done..");
            updatePayload.image = {
                public_id: result.fileId,
                url: result.url,
            };
        }
        const catId = banner._id;
        const updatedBanner = await models_1.Banner.findByIdAndUpdate({ _id: catId }, { ...updatePayload }, { new: true });
        res.status(200).json({
            success: true,
            message: "Banner updated successfully.",
            updatedBanner,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.UpdateBannerFunction = UpdateBannerFunction;
const DeleteBannerFunction = async (req, res) => {
    try {
        const { id } = req.query;
        const banner = await models_1.Banner.findById({ _id: id });
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id, No Banner found.",
            });
        }
        await models_1.Banner.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "Banner deleted successfully.",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.DeleteBannerFunction = DeleteBannerFunction;
