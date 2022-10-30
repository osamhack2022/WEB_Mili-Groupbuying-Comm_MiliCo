module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define(
      "Member",
      {
        payment: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "입금현황 [입금대기: 0 입금확인요청: 1 입금확인완료: 2 미지불: 3]",
        },
        accept: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "입금현황 [변경요청도착: 0 변경요청없음: 1 변경수락: 2]",
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
      Member.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
      Member.belongsTo(models.Item, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    };
  
    return Member;
  };