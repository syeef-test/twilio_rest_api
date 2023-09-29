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
      //send message
    }

    res.status(200).json({ message: valid_phone_number_details });
  } catch (error) {
    res.status(500).json({ error: "An error occured on server" });
    console.log(error);
  }
};

exports.call = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

exports.whatsapp = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

async function checkPhoneNumber(phone_number) {
  try {
    // const response = await client.lookups.V2.phoneNumbers(
    //   `${phone_number}`
    // ).fetch();

    const response = await client.lookups.v2
      .phoneNumbers(`${phone_number}`)
      .fetch();
    // console.log(response);
    return { valid: response.valid, errors: response.validationErrors };
  } catch (error) {
    console.log(error);
  }
}
