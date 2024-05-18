"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.route("/sendOtp").post(controllers_1.SendOtp);
router.route("/user/register").post(controllers_1.RegisterUserFunction);
router.route("/user/login").post(controllers_1.LoginUserFunction);
router.route("/user/profile").get(middlewares_1.Authorise, controllers_1.fetchUserProfileFunction);
router
    .route("/user/update")
    .post(middlewares_1.Authorise, middlewares_1.singleUpload, controllers_1.UpdateUserProfileFunction);
exports.default = router;
