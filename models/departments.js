module.exports = function (sequelize, DataTypes) {
  const Department = sequelize.define('departments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

  });
  return Department;
};
