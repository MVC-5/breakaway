module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

  });
  return Department;
};
