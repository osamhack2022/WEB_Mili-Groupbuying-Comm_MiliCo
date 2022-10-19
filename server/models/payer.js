module.exports = (sequelize, DataTypes) => {
    const Payer = sequelize.define(
      "Payer",
      {
        USER_TB_FK1: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "유저(USER_TB 참조)",
        },
        BANK: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "계좌은행",
        },
        ACCNT: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "입금계좌",
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
        Payer.belongsTo(models.User);
        Payer.hasOne(models.Item);
    };
  
    return Payer;
  };