import User from "../models/users.models.js";
import { verifyPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        isLogin: false,
        msg: "Usuario no encontrado",
        user: {}
      });
    }

    const passwordCorrecta = verifyPassword(
      password,
      user.salt,
      user.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        isLogin: false,
        msg: "Credenciales inválidas",
        user: {}
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      isLogin: true,
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({
      isLogin: false,
      msg: "Error en el servidor",
      error: error.message
    });
  }
};