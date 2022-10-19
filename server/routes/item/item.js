const printHello = function (req, res) {
    res.send({
        msg: "hello",
        result: true
    })
}
// (GET) /items
// : 전체 아이템 가져오기

// (GET) /items/{word}
// : word 내용 검색해서 일치하는 아이템 가져오기

// (GET) /items/{userId}
// : Id유저의 아이템 가져오기

// (POST) /items
// : 아이템 생성하기 (구매자까지 생성해야됨)

// (POST) /items/members
// : 현재 멤버 수 수정하기

// (POST) /items/incentives
// : 구매자 인센티브 수정하기

// (POST) /items/like-counts
// : 구매자 인센티브 수정하기

// (POST) /items/steps
// : 구매 단계 수정하기


export {
    printHello,
}