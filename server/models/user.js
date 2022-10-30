module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        service_id: {
          type: DataTypes.STRING(32),
          allowNull: false,
          unique: true,
          comment: "군번",
        },
        name: {
          type: DataTypes.STRING(32),
          allowNull: false,
          comment: "이름",
        },
        rank: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "계급 [병장:0 상병:1 일병:2 이병:3]",
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "비밀번호",
        },
        unit: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "소속부대",
        },
        trust_index: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "믿음용사점수",
        },
        phone: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "믿음용사점수",
        },
      },
      {
        comment: "유저",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    User.associate = (models) => {
      User.hasMany(models.Member);
      User.hasMany(models.Payer);
      User.hasMany(models.Message);
    };
  
    return User;
  };