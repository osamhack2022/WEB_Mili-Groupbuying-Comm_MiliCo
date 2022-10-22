const models = require('../../models');


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
                accept: 1,
                ItemId: req.params.id,
                UserId: req.body.UserId 
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
    getMembersByItemId, enrollMember
}