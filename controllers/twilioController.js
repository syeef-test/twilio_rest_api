const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.sms = async (req, res, next) => {
  try {
    const reciepient_phone_no = req.body.to;

    //First check number is string and not null
    if (
      typeof reciepient_phone_no !== "string" ||
      reciepient_phone_no.trim() === ""
    ) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    }

    //Check phone number is valid or not
    const valid_phone_number_details = await checkPhoneNumber(
      reciepient_phone_no
    );

    //console.log(valid_phone_number_details);

    const valid = valid_phone_number_details.valid;
    const valid_error = valid_phone_number_details.errors;

    if (!valid && valid_error.length > 0) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    } else {
      //Send message
      const response = await client.messages.create({
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `${reciepient_phone_no}`,
      });
      if (response.sid) {
        console.log(response.sid);
        return res.status(200).json({ message: "SMS sent successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured on server" });
    console.log(error);
  }
};

exports.call = async (req, res, next) => {
  try {
    const reciepient_phone_no = req.body.to;
    //First check number is string and not null
    if (
      typeof reciepient_phone_no !== "string" ||
      reciepient_phone_no.trim() === ""
    ) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    }

    //Check phone number is valid or not
    const valid_phone_number_details = await checkPhoneNumber(
      reciepient_phone_no
    );

    const valid = valid_phone_number_details.valid;
    const valid_error = valid_phone_number_details.errors;

    if (!valid && valid_error.length > 0) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    } else {
      //Send call
      const response = await client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `${reciepient_phone_no}`,
      });
      if (response.sid) {
        console.log(response.sid);
        return res.status(200).json({ message: "Call sent successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured on server" });
  }
};

exports.whatsapp = async (req, res, next) => {
  try {
    const reciepient_phone_no = req.body.to;

    //First check number is string and not null
    if (
      typeof reciepient_phone_no !== "string" ||
      reciepient_phone_no.trim() === ""
    ) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    }

    //Check phone number is valid or not
    const valid_phone_number_details = await checkPhoneNumber(
      reciepient_phone_no
    );

    const valid = valid_phone_number_details.valid;
    const valid_error = valid_phone_number_details.errors;

    if (!valid && valid_error.length > 0) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    } else {
      //Send whatsapp_message
      const response = await client.messages.create({
        body: "Your appointment is coming up on July 21 at 3PM",
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_PHONE_NUMBER}`,
        to: `whatsapp:${reciepient_phone_no}`,
      });
      if (response.sid) {
        console.log(response.sid);
        return res
          .status(200)
          .json({ message: "Whatsapp message sent successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured on server" });
  }
};

async function checkPhoneNumber(phone_number) {
  try {
    const response = await client.lookups.v2
      .phoneNumbers(`${phone_number}`)
      .fetch();
    // console.log(response);
    return { valid: response.valid, errors: response.validationErrors };
  } catch (error) {
    console.log(error);
  }
}
