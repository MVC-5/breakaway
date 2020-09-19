module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  Role.associate = function (models) {
    Role.belongsTo(models.department, {
      foreignKey: 'dept_id',
    });
  };
  return Role;
};
