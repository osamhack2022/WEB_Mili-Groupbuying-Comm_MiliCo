module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
      "Item",
      {
        field: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "분야 (0:택시합승 1:공동구매 2:배달음식)",
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "제목",
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "구매 설명",
        },
        link: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "구매 링크",
        },
        img: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "구매 링크 썸네일 주소",
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "가격",
        },
        due_group: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "모집 기한",
        },
        due_money: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "입금 기한",
        },
        member_limit: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "모집 인원",
        },
        member_current: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "현재 모집된 인원",
        },
        stage: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "공동구매 진행 단계[모집: 0 입금: 1 구매: 2 배송: 3]",
        },
        like: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "게시글 좋아요",
        },
        egg_point: {
          type: DataTypes.FLOAT,
          allowNull: true,
          comment: "구매자 인센티브",
        },

      },
      {
        comment: "아이템(공동구매 게시글)",
        charset: "utf8",
        collate: "utf8_unicode_ci",
        timestamps: false,
      }
    );
  
    Item.associate = (models) => {
      Item.belongsTo(models.Payer, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
      Item.hasMany(models.Member, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    };
  
    return Item;
  };