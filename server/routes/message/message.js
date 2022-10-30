const models = require('../../models');

// (GET) /members/:id
// : item의 멤버가져오기
const getMessageByUserId = async function(req, res){
    try{
        const result = await models.Message.findAll({
            where: {
                UserId: req.params.id 
            }
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

const createMessage = async function(req, res){
    try {
        const result = await models.Message.create({
            ...req.body,
            UserId: req.params.id,
        });
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

const createMessageToAll = async function(req, res){
    try {
        let result = [];
        var i;
        const ddd = req.body.userId;
        for(i=0; i<ddd.length; i++){
            const r = await models.Message.create({
                ...req.body,
                UserId: ddd[i]
            });
            result.push(r);
        };

        if(result.length == req.body.length){ 
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

export {
    getMessageByUserId, createMessage, createMessageToAll
}
