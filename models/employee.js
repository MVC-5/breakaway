module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define('employees', {
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
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Employee;
};
