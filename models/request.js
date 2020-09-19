module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
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

  Request.associate = (models) => {
    Request.belongsTo(models.employee, {
      foreignKey: 'employee_id',
    });
  };

  return Request;
};
