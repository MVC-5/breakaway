module.exports = function (sequelize, DataTypes) {
  const Request = sequelize.define('request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
  });

  Request.associate = function (models) {
    Request.belongsTo(models.employee, {
      foreignKey: 'employee_id',
    });

    Request.belongsTo(models.manager, {
      foreignKey: 'manager_id',
    });
  };

  return Request;
};
