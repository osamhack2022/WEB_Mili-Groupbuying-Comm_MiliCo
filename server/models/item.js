module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
      "Item",
      {
        FIELD: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "분야 (0:택시합승 1:공동구매 2:배달음식)",
        },
        TITLE: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "제목",
        },
        DESCR: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "구매 설명",
        },
        LINK: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "구매 링크",
        },
        IMG: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "구매 링크 썸네일 주소",
        },
        PRICE: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "가격",
        },
        DUE: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "입금 기한",
        },
        STEP: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "공동구매 진행 단계",
        },
        PAYER_FK1: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "구매자(PAYER_TB 참조)",
        },
        MEMBER_LIM: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "모집 인원",
        },
        MEMBER_CUR: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "현재 모집된 인원",
        },
        LIKE_CNT: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "게시글 좋아요",
        },
        PAYER_INCN: {
          type: DataTypes.FLOAT,
          allowNull: false,
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
      Item.belongsTo(models.Payer);
      Item.hasMany(models.ItemMember);
      Item.hasMany(models.UserItem);
    };
  
    return Item;
  };