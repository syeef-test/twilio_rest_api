const express = require("express");

const twilioController = require("../controllers/twilioController");

const router = express.Router();

//Twilio endpoints

router.post("/sms", twilioController.sms);
router.post("/call", twilioController.call);
router.post("/whatsapp", twilioController.whatsapp);

module.exports = router;
