module.exports = (sequelize, DataTypes) => {
  // id is created by sequelize
  const Employee = sequelize.define('employee', {
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
      allowNull: false,
    },
    bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.role, {
      foreignKey: 'role_id',
    });

    // Employee.belongsTo(models.manager, {
    //   foreignKey: 'manager_id',
    //   constraints: false,
    // });

    Employee.hasMany(Employee, {
      as: 'manager',
      foreignKey: 'manager_id',
});

    Employee.hasMany(models.request, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });

    Employee.hasMany(models.feed, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };

  return Employee;
};
