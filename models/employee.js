module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define('employees', {
    id: {
      type: DataTypes.INTEGER,
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
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Employee;
};
