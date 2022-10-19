const models = require('../../models');


// (GET) /users
// : 전체유저 가져오기
const getUsers = async function(req, res){
    try {
        const result = await models.User.findAll({});
        res.send({
            result: true,
            data: result
        });
    } catch(err){
        console.error(err);
        res.status(500);
        res.send({
            result: false,
            error: 'DB error'
        });
    }
}
// (GET) /users/id
// : id 유저 가져오기

// (GET) /users/sessions
// : 로그인 정보 가져오기
const getSession = async function(req, res){
    if(req.session.user){
        res.send({
            result: true,
            data: {
                id: req.session.user
            }
        });
    }else{
        res.send({
            result: false
        })
    }
}
// (POST) /users/sessions
// : 로그인 하기
const login = async function(req, res){
    try {
        const result = await models.User.findOne({
            where: {
                SERV_NUM: req.body.SERV_NUM,
                PASSWD: req.body.PASSWD
            }
        });
        if(result !== null){
            req.session.user = result.dataValues.id;
            res.send({
                result: true,
                data: result
            });
        }else{
            res.send({
                result: false,
                data: "No User Data"
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

// (DELETE) users/sessions
// : 로그아웃하기
const logout = function(req, res){
    if(req.session.user){
        req.session.destroy();
        res.send({
            result: true
        });
    }else{
        res.send({
            result:false,
            data: 'no session'
        })
    }
}
// (POST) users/users
// : 회원가입
const createUsers = async function(req, res){
    try {
        const result = await models.User.create(req.body);
        res.send({
            result: true,
            data: result
        });
    } catch(err){
        console.error(err);
        res.status(500);

        if(err.errors[0].type=='unique violation'){
            res.send({
                result: false,
                duplicate: true,
                error: 'SERV_NUM duplicate'
            });
        }else{
            res.send({
                result: false,
                error: 'DB error'
            });
        }
    }
}
// (POST) /users/id/trust-idx
// : id 유저의 믿음용사점수 수정하기

export {
    getUsers, createUsers, login, getSession, logout
}