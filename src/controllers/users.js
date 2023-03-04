const {User} = require("../db");

const findOrCreateUser = async (req, res) => {
  try {
    const {name, email, picture, updated_at} = req.body;
    const [user, created] = await User.findOrCreate({
      where: {email: email},
      defaults: {name, email, image: picture, updated_at},
    });
    if (created) {
      res.status(200).send("Cuenta creada correctamente!");
    } else {
      res.status(200).send(`Hola otra vez ${user.name}!`);
    }
  } catch (error) {
    res.status(200).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const {email} = req.params;
    const user = await User.findOne({where: {email: email}});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  findOrCreateUser,
  getUser,
};
