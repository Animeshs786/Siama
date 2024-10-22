const mongoose = require("mongoose");
const { DEFAULT_USER_IMG } = process.env;

// const user = new mongoose.Schema(
//   {
//     // user_id: {
//     //   type: Number,
//     //   default: 0,
//     //   unique: [true, "user_id should be unique"],
//     // },
//     // first_name: { type: String, trim: true },
//     // last_name: { type: String, trim: true },
//     phone: { type: String, trim: true, unique: true },
//     email: { type: String, trim: true, unique: true },
//     email_verified: { type: Boolean, default: false },
//     gst_no: { type: String, default: "" },
// otp: { type: String, default: "" },
// otp_expiry: { type: Date, default: Date.now },
//     state: { type: String, default: "" },
//     state_id: { type: String, default: "" },
//     city: { type: String, default: "" },
//     city_id: { type: String, default: "" },
//     pincode: { type: String, default: "" },
//     address: { type: String, default: "" },
//     profile_image: { type: String, default: `${DEFAULT_USER_IMG}` },
//     cart: [cartItem],
//     saved_address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
//   },
//   {
//     timestamps: {
//       createdAt: "created_at",
//       updateAt: "updated_at",
//     },
//     collection: "users",
//   }
// );

const userSchema = {
  name: String,
  email: String,
  phone: Number,
  profileImage: {
    type: String,
    default: DEFAULT_USER_IMG,
  },
  otp: { type: String, default: "" },
  otp_expiry: { type: Date, default: Date.now },
  gender: String,
  address:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
};
// user.pre("save", async function (next) {
//   if (!this.user_id) {
//     const User = mongoose.model("User");
//     const count = await User.countDocuments();
//     this.user_id = count + 1;
//   }
//   next();
// });
const User = mongoose.model("User", userSchema);
module.exports = User;
