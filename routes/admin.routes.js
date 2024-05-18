"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// for curd operations on Category
router
    .route("/category")
    .get(controllers_1.GetCategory)
    .post(middlewares_1.upload.single("image"), middlewares_1.Authorise, middlewares_1.CheckAdmin, controllers_1.createCategoryFunction)
    .put(middlewares_1.upload.single("image"), middlewares_1.Authorise, middlewares_1.CheckAdmin, controllers_1.UpdateCategoryFunction)
    .delete(middlewares_1.Authorise, middlewares_1.CheckAdmin, controllers_1.DeleteCategoryFunction);
// for curd operation on banners
router
    .route("/banner")
    .get(controllers_1.GetBanners)
    .post(middlewares_1.upload.single("image"), middlewares_1.Authorise, middlewares_1.CheckAdmin, controllers_1.createBannerFunction)
    .put(middlewares_1.upload.single("image"), middlewares_1.Authorise, middlewares_1.CheckAdmin, controllers_1.UpdateBannerFunction)
    .delete(middlewares_1.Authorise, middlewares_1.CheckAdmin, controllers_1.DeleteBannerFunction);
exports.default = router;
