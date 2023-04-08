const User = require("../models/user");
const { createToken } = require("../utils/token");
const {
  PHONE_NOT_FOUND_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  TIME_OUT,
} = require("../utils/constant");

const accountSid = "ACf2980c6d4feac24feae6a88a91f6d8de";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
console.log("verifySid", verifySid);

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const registration = async (req, res, next) => {
  try {
    let { contactNumber, name } = req.body;

    console.log("contactNumber, name ==>", contactNumber, name);

    // check duplicate phone Number from USEr model (user table)

    const phoneExist = await User.findOne({ contactNumber });


    if (phoneExist) {
      res.status(400).json({ 'code': 'PHONE_ALREADY_EXISTS', msg: PHONE_ALREADY_EXISTS_ERR });
      return;
    }

    // create new user record in user table.
    const createUser = new User({ contactNumber, name });

    // save user
    const user = await createUser.save();

    console.log("check user =====>", user)

    client.verify.v2
      .services("VA3a3a0e1637a8689b454ab7ae03e9f20f")
      .verifications.create({ to: contactNumber, channel: "sms", body: 'Hi, Dhunn web OTP here', })
      .then(async (verification) => {
        console.log("verification", verification, verification.status);

        res.status(200).json({
          type: "success",
          message:
            "You are registered and OTP sent successfully to mobile number !",
          data: {
            userId: user._id,
          },
        });
      });

  } catch (error) {
    console.log("err ==>", error);
    next(error);
  }
};

const loginWithOtp = async (req, res, next) => {
  try {
    const { contactNumber } = req.body;
    console.log("contactNumber", contactNumber);

    const user = await User.findOne({ contactNumber });
    console.log("user ====>", user);
    if (!user) {
      res.status(400).json({ code: 'PHONE_NOT_FOUND', msg: PHONE_NOT_FOUND_ERR });
      return;
    }

    client.verify.v2
      .services("VA3a3a0e1637a8689b454ab7ae03e9f20f")
      .verifications.create({ to: contactNumber, channel: "sms", body: 'Hi, Dhunn web OTP here', })
      .then((verification) => {
        console.log("verification", verification, verification.status);
        res.status(200).json({
          type: "success",
          message: "OTP sended to your registered phone number",
          data: {
            userId: user._id,
          },
        });
      });

  } catch (error) {
    console.log("check error ==>", error)
    next(error);
  }
};

// ---------------------- verify phone otp -------------------------

const verifyPhoneOtp = async (req, res, next) => {
  try {
    const { otp, contactNumber } = req.body;
    console.log("userIdcontactNumber", otp, contactNumber);

    const user = await User.findOne({ contactNumber });
    console.log("user ======>", user)

    if (!user) {
      next({ status: 400, code: "USER_NOT_FOUND", msg: USER_NOT_FOUND_ERR });
      return;
    }

    const token = createToken({ userId: user._id });
    console.log("token verifyPhoneOtp", token);

    client.verify.v2
      .services("VA3a3a0e1637a8689b454ab7ae03e9f20f")
      .verificationChecks.create({ to: contactNumber, code: otp })
      .then((verification_check) => {
        console.log("verification_check", verification_check);
        if (verification_check.status === "approved") {
          // The entered OTP is correct
          // Continue with your logic
          res.status(201).json({
            type: "success",
            message: "OTP verified successfully",
            data: {
              token,
              userId: user._id,
            },
          });
        } else {
          // The entered OTP is incorrect
          // Handle the error
          res.status(400).json({
            type: "success",
            msg: INCORRECT_OTP_ERR,
            code: "INCORRECT_OTP",
          });
        }
      }).catch(er => {
        console.log("Erro ===============>", er.code);
        if (er.code === 60200) {
          res.status(400).json({
            type: "success",
            msg: INCORRECT_OTP_ERR,
            code: "INCORRECT_OTP",
          });
        } else {
          res.status(500).json({
            type: "success",
            msg: TIME_OUT,
            code: "TIME_OUT",
          });
        }

      })

  } catch (error) {
    console.log("error =>>>>>>>>>>>>", error)
    next(error);

  }
};

// --------------- fetch current user -------------------------

const fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    console.log("currentUser", currentUser);
    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  loginWithOtp,
  verifyPhoneOtp,
  fetchCurrentUser,
};
