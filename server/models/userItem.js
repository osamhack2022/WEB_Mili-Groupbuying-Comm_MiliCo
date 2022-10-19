module.exports = (sequelize, DataTypes) => {
    const UserItem = sequelize.define(
      "UserItem",
      {
        USER_TB_FK1: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "유저(USER_TB 참조)",
        },
        ITEM_TB_FK2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "아이템(ITEM_TB 참조)",
          },
      },
      {
        comment: "유저의 아이템 목록",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    UserItem.associate = (models) => {
      UserItem.belongsTo(models.User);
      UserItem.belongsTo(models.Item);
    };
  
    return UserItem;
  };