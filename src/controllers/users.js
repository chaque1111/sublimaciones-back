const {User} = require("../db");

const findOrCreateUser = async (req, res) => {
  try {
    const {name, email, picture, updated_at, password} = req.body;
    const [user, created] = await User.findOrCreate({
      where: {email: email},
      defaults: {name, email, image: picture, updated_at, password},
    });
    if (created) {
      res.status(200).send(user);
    } else {
      res.status(200).send(`Usted ya tiene una cuenta con éste correo`);
    }
  } catch (error) {
    res.status(200).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = (await User.findOne({where: {email: email}})) || null;

    if (!user) {
      res.status(200).send("La cuenta no existe");
    } else {
      if (user.password !== password) {
        res.status(200).send("La contraseña es incorrecta");
      } else {
        res.status(200).send(user);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const obj = req.body;
    await User.destroy({where: {email: obj.email}});
    res.status(200).send("Cuenta Borrada Correctamente");
  } catch (error) {
    res.status(400).send(error);
  }
};

// const addFavorite = async (req, res) => {
//   const email = req.body.email;
//   const productId = req.body.productId;

// };
module.exports = {
  findOrCreateUser,
  getUser,
  deleteUser,
};
