const { ApiError } = require("../../../errorHandler");
const { User, InitUser } = require("../../../models");
const { getOtp, sendOtpToPhone } = require("../../../utils");

// const userLogin = async (req, res, next) => {
//   try {
//     let { phone } = req.body;
//     if (!phone) throw new ApiError('Phone number in required.', 400);
//     phone = String(phone).trim();
//     if (isNaN(phone) || phone.includes('e') || phone.includes('.') || phone.length > 10) {
//       throw new ApiError('Invalid phone number.', 400);
//     }
//     const otp = getOtp();
//     const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
//     //send otp to phone
//     await sendOtpToPhone(phone, otp);
//     //send otp to phone
//     const user = await User.findOne({ phone });
//     if (!user) {
//       const tempUser = await saveTempUser(phone, otp, otpExpiry);
//       //send otp
//       return res.status(200).json({
//         status: true,
//         message: 'OTP has been sent',
//         data: {
//           phone: tempUser.phone,
//           otpExpiry: tempUser.otp_expiry,
//           newUser: true,
//         },
//       });
//     }

//     user.otp = otp;
//     user.otp_expiry = otpExpiry;
//     await user.save();
//     //send otp
//     return res.status(200).json({
//       status: true,
//       message: 'OTP has been sent',
//       data: {
//         phone: user.phone,
//         otpExpiry: user.otp_expiry,
//         newUser: false,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const userLogin = async (req, res, next) => {
  try {
    let { phone } = req.body;
    if (!phone) throw new ApiError("Phone number is required.", 400);
    let newUser = false;
    phone = String(phone).trim();
    if (
      isNaN(phone) ||
      phone.includes("e") ||
      phone.includes(".") ||
      phone.length > 10
    ) {
      throw new ApiError("Invalid phone number.", 400);
    }
    const otp = getOtp();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
    // Send OTP to phone
    await sendOtpToPhone(phone, otp);

    // Find user by phone number
    let user = await User.findOne({ phone });
    if (!user) {
      console.log("User not found, creating new user");
      user = await User.create({ phone });
      console.log("New user created", user);
      newUser = true;
    }

    user.otp = otp;
    user.otp_expiry = otpExpiry;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "OTP has been sent",
      data: {
        phone: user.phone,
        otpExpiry: user.otp_expiry,
        newUser,
      },
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    next(error);
  }
};

// async function saveTempUser(phone, otp, otp_expiry) {
//   let user = await InitUser.findOne({ phone });
//   if (!user) user = new InitUser({ phone });
//   user.otp = otp;
//   user.otp_expiry = otp_expiry;
//   await user.save();
//   return user;
// }

module.exports = userLogin;
