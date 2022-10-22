import sequelize from 'sequelize';

const models = require('../../models');
const Op = sequelize.Op;

// (GET) /items
// : 검색(req.query)해서 일치하는 아이템 가져오기, req.query없으면 전체 가져오기
const getItemBySearchWord = async function(req, res){
    let where = {}; //쿼리가 있을 때, 쿼리가 분야검색일 때, 쿼리가 검색어 검색일 때, 각각의 조건문임
    
    const searchWord = req.query.searchWord;
    //쿼리 있으면
    if(searchWord){ 
        let isFieldSearch = false;
        let field;

        if (searchWord == "taxi" || searchWord == "택시"){
            isFieldSearch = true;
            field = 0;
        } else if (searchWord == "market" || searchWord == "공동구매"){
            isFieldSearch = true;
            field = 1;
        } else if (searchWord == "delivery" || searchWord == "배달음식"){
            isFieldSearch = true;
            field = 2;
        }
        // 쿼리가 분야검색일 때
        if(isFieldSearch){
            where = {  
                field
            }    
        // 쿼리가 검색어 검색일 때
        }else{
            where = {  
                [Op.or]: {
                    title: {
                        [Op.like]: "%" + searchWord + "%"
                    },
                    description: {
                        [Op.like]: "%" + searchWord + "%"   
                    },
                }   
            }
        }
    }

    try{
        const result = await models.Item.findAll( {
            where,
            attributes: ["id","title", "link", "img", "member_limit", "member_current"],
        });
        if(result){
            res.send({
                result: true,
                data: result,
            })
        } 
    } catch(err){
        console.error(err);
        res.status(500);
        res.send({
            result: false,
            error: 'DB error'
        });
    }
}

// (GET) /items/:id
// : ID 아이템 가져오기
const getItemById = async function(req, res){
    try {
        const item_result = await models.Item.findOne( {
            where: { id: req.params.id },
            include: [
                { 
                    model: models.Payer,
                    include: [
                        {
                            model: models.User,
                            required: true,
                        }
                    ],
                }
            ]
        });
        const member_result = await models.Member.findAll({
            where: {
                ItemId: req.params.id 
            },
            include: [
                {
                    model:models.User,
                    required: true
                }
            ]
        });
        const result = {
            item_result,
            member_result
        }
        if(result){
            res.send({
                result: true,
                data: result,
            })
        }
    } catch(err){
        console.error(err);
        res.status(500);
        res.send({
            result: false,
            error: 'DB error'
        });
    }
}

// (POST) /items
// : 아이템 생성하기 (구매자까지 생성해야됨)
const createItem = async function(req, res){
    try {
        const body = req.body;
        const payer = {
            UserId: body.UserId,
            bank: body.bank,
            account: body.account,
            punctuality: 1,
        };
        const payer_result = await models.Payer.create(payer);
        const item = {
            ...body,
            PayerId: payer_result.dataValues.id,
            img: "https://open.lge.co.kr/link/2020/ha/usp_banner/12/3101_ha_brandView/images/01.jpg",
            member_current: 0,
            stage: 0,
            like: 0,
            egg_point: null,
        }
        const result = await models.Item.create(item);
        if(result){
            res.send({
                result: true,
                data: result
            });
        }
    } catch(err){
        console.error(err);
        res.status(500);
        res.send({
            result: false,
            error: 'DB error'
        });
    }
}

const getItemByUserId = async function(req, res){
    try {
        const result = await models.Member.findAll( {
            where: { UserId: req.params.id },
            include: [
                { 
                    model: models.Item
                }
            ]
        });
        if(result){
            res.send({
                result: true,
                data: result,
            })
        }
    } catch(err){
        console.error(err);
        res.status(500);
        res.send({
            result: false,
            error: 'DB error'
        });
    }
}
// (POST) /items/members
// : 현재 멤버 수 수정하기

// (POST) /items/incentives
// : 구매자 인센티브 수정하기

// (POST) /items/like-counts
// : 구매자 인센티브 수정하기

// (POST) /items/steps
// : 구매 단계 수정하기


export {
    createItem, getItemBySearchWord, getItemById, getItemByUserId
}