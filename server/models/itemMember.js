module.exports = (sequelize, DataTypes) => {
    const ItemMember = sequelize.define(
      "ItemMember",
      {
        ITEM_TB_FK1: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "아이템(ITEM_TB 참조)",
        },
        MEMBER_TB_FK2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "멤버(MEMBER_TB 참조)",
          },
      },
      {
        comment: "공동구매 참여자 목록",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    ItemMember.associate = (models) => {
      ItemMember.belongsTo(models.Item);
      ItemMember.belongsTo(models.Member);
    };
  
    return ItemMember;
  };