module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
      "Message",
      {
        type: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "메시지 유형 [경고:0 알림:1]",
        },
        content: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: "메시지 내용",
        },
        link: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "메시지 내용",
      },
      },
      {
        comment: "메시지",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    Message.associate = (models) => {
        Message.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    };
  
    return Message;
  };