const printHello = function (req, res) {
    res.send({
        msg: "hello",
        result: true
    })
}

// (POST) /members
// : 공동구매 참여자 등록하기

// (GET) /members
// : 공동구매 참여자 정보 가져오기 


export {
    printHello,
}