module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define('manager', {

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
    });

    Manager.associate = (models) => {
        Manager.belongsTo(models.employee, {
            foreignKey: 'employee_id',
        });
    };

    return Manager;
};
