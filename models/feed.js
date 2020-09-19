module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('feed', {
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    pic_link: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.employee, {
      foreignKey: 'employee_id',
    });
  };

  return Post;
};
