module.exports = (sequelize, DataTypes) => {
    const Payer = sequelize.define(
      "Payer",
      {
        bank: {
          type: DataTypes.STRING(10),
          allowNull: false,
          comment: "계좌은행",
        },
        account: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "계좌번호",
        },
        punctuality: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "기한 내 제품 구입 여부 [기한초과: 0 정상진행: 1]",
        }
      },
      {
        comment: "구매자(공동구매 모집호스트)",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    Payer.associate = (models) => {
        Payer.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Payer.hasOne(models.Item);
    };
  
    return Payer;
  };