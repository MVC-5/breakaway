module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('feed', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

  Post.associate = function (models) {
    Post.belongsTo(models.employee, {
      foreignKey: 'employee_id',
    });
  };

  return Post;
};
