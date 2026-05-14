import User from "../models/users.models.js";
import { verifyPassword } from "../utils/hash.js";

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

    res.json({
      isLogin: true,
      msg: "Login successful",
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