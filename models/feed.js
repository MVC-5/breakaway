module.exports = function (sequelize, DataTypes) {
  const Vacationpost = sequelize.define('feed', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_posted: {
      type: DataTypes.TIMESTAMP,
      defaultvalue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,

    },

    pic_link: {
      type: DataTypes.STRING(200),
      allowNull: false,

    },

  });
  return Vacationpost;
};
