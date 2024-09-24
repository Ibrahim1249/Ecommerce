const registerModel = require("../models/registerModel");
const bcrypt = require("bcrypt");

async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(401).json({ error: "email is required" });

    const userData = await registerModel.findOne({ email: email });
    if (!userData) return res.status(404).json({ error: "email is not found" });

    const result = await bcrypt.compare(password, userData.password);
    if (!result) return res.status(404).json({ error: "InValid password" });

    // generate jwt token
    const payload = {
      userId: userData._id,
      email: userData.email,
    };
    const token = generateToken(payload);

    // send token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // Cookie expiry in (1 hour)
    });

    return res.json({ message: "logic successfully" });
  } catch (error) {
    console.log("error from register controller", error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = handleLoginUser;
