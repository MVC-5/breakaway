module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define('employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    employee_first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Employee.associate = function (models) {

    Employee.belongsTo(models.role, {
      foreignKey: 'role_id'
    });

    Employee.belongsTo(models.department, {
      foreignKey: 'dept_id'
    });

    Employee.belongsTo(models.manager, {
      foreignKey: 'manager_id'
    });
  };

  return Employee;
};
