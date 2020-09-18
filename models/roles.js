module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    department_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
    },

  });
  return Role;
};
