const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "producto",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      material: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.STRING,

        allowNull: true,
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
    },
    {timestamps: false}
  );
};
