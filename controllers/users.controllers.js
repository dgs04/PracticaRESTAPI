import User from "../models/users.models.js";
import { generateSalt, hashPassword } from "../utils/hash.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -salt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password -salt");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      salt
    });

    await user.save();

    res.json({
      message: "Usuario creado correctamente",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const dataToUpdate = {
      name,
      username
    };

    if (password) {
      const salt = generateSalt();
      const hashedPassword = hashPassword(password, salt);

      dataToUpdate.password = hashedPassword;
      dataToUpdate.salt = salt;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      dataToUpdate,
      { new: true }
    ).select("-password -salt");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const delUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};