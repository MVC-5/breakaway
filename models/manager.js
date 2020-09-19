module.exports = function (sequelize, DataTypes) {
    const Manager = sequelize.define('manager', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        manager_first: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_last: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Manager.associate = function (models) {
        Manager.belongsTo(models.employee, {
            foreignKey: 'employee_id',
        });
    };

    return Manager;
};
