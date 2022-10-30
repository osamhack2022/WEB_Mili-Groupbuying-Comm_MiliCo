import sequelize from 'sequelize';

const models = require('../../models');
const Op = sequelize.Op;

// (GET) /members/:id
// : item의 멤버가져오기
const getMembersByItemId = async function(req, res){
    try{
        const result = await models.Member.findAll({
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

// (POST) /members/:id
// : 아이템에 멤버 등록하기
const enrollMember = async function(req, res){
    try{
        console.log(req.body);
        const result = await models.Member.create({
            payment: 0,
            accept: -1,
            ItemId: req.params.id,
            UserId: req.body.UserId 
        });
        const result2 = await models.Item.update({
            member_current: req.body.member_current + 1 
        }, {
            where: { id: req.params.id }
        })
        if(result && result2){
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

const updatePayment = async function(req, res){
    try{
        let where;
        if(Array.isArray(req.body.memberId)){
            where = { id: { [Op.in]: req.body.memberId } }; 
        }else{
            where = { id: req.body.memberId };
        }
        const result = await models.Member.update({
            payment: req.body.payment
        },{
           where 
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

const updateAccept = async function(req, res){
    try{
        let where;
        if(Array.isArray(req.body.memberId)){
            where = { id: { [Op.in]: req.body.memberId } }; 
            await models.Item.update({
                price: Math.round(req.body.price*2)
            },{
                where: {
                    id: req.body.itemId
                }
            })
        }else{
            where = { id: req.body.memberId };
        }
        const result = await models.Member.update({
            accept: req.body.accept
        },{
           where 
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

export {
    getMembersByItemId, enrollMember, updatePayment, updateAccept
}