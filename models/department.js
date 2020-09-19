module.exports = function (sequelize, DataTypes) {
  const Department = sequelize.define('department', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

  });
  return Department;
};
