import User from '../models/users.models.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        isLogin: false,
        msg: 'Usuario no encontrado',
        user: {}
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        isLogin: false,
        msg: 'Credenciales inválidas',
        user: {}
      });
    }

    res.json({
      isLogin: true,
      msg: 'Login successful',
      user
    });
  } catch (error) {
    res.status(500).json({
      isLogin: false,
      msg: 'Error en el servidor',
      error: error.message
    });
  }
};