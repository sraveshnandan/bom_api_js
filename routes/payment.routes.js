"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const payment_controllers_1 = require("../controllers/payment.controllers");
const router = (0, express_1.Router)();
// for creating new order  
router.route("/pay").post(middlewares_1.Authorise, payment_controllers_1.BuySubscriptionFunction);
// for verifying payment 
router.route("/payment-verify").post(middlewares_1.Authorise, payment_controllers_1.VerifyPaymentFunction);
exports.default = router;
