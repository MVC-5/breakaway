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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Request.associate = (models) => {
    Request.belongsTo(models.employee, {
      foreignKey: 'employeeId',
    });
  };

  return Request;
};
