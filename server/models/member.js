module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define(
      "Member",
      {
        USER_TB_FK1: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "유저(USER_TB 참조)",
        },
        STEP: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "입금현황",
        }
      },
      {
        comment: "멤버(공동구매 참여자)",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    Member.associate = (models) => {
      Member.belongsTo(models.User);
      Member.hasMany(models.ItemMember);
    };
  
    return Member;
  };