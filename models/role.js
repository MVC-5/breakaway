module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
