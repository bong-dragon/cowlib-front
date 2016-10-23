import express from "express";


const router = express.Router();

router.get('/search', (req, res) => {
    // parameter: q, 검색어
    // daum book api 호출
    // db에 없다면 insert

    return res.json([{
        id: 123123,
        title: "콩고",
        link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
        cover_l_url: "https://t1.search.daumcdn.net/thumb/P110x160/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FBOK00030403128YE%3Fmoddttm=20161023090658",
    }, {
        id: 123123,
        title: "콩고",
        link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
        cover_l_url: "https://t1.search.daumcdn.net/thumb/P110x160/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FBOK00030403128YE%3Fmoddttm=20161023090658",
    }]);
});

router.post('/:ownerId/:bookId', (req, res) => {
    // user_has_book 에 추가
    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});

router.delete('/:ownerId/:bookId', (req, res) => {
    // user_has_book 의 is_deleted true로 변경
    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});


/*
 wait_history 상태
 WAIT(default), REJECT, COMPLETE, CANCEL
 */

/*
 borrow_history 상태
 BORROW(default)z, RETURN
 */

router.post('/:ownerId/:bookId/borrow', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // db에 borrow_history에 추가
    // wait_hitory 상태 COMPLETE으로 변경
    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});

router.delete('/:ownerId/:bookId/borrow', (req, res) => {
    // parameter: borrower 반납완료한 사람 id,
    // db에 borrow_history 상태를 RETURN으로 변경

    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});


router.put('/:ownerId/:bookId/wait', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // wait_hitory 상태 REJECT으로 변경

    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});

router.delete('/:ownerId/:bookId/wait', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // wait_hitory 상태 CANCEL으로 변경

    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});

router.post('/:ownerId/:bookId/wait', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // wait_hitory 추가

    if (!err)
        res.statusCode(200);
    else
        res.statusCode(500);
});

router.get('/:ownerId', (req, res) => {
    // db book테이블에서 user_has_book 테이블에 있는 owner의 정보 가져오기

    res.json([{
        id: 123123,
        title: "콩고",
        link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
        cover_l_url: "https://t1.search.daumcdn.net/thumb/P110x160/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FBOK00030403128YE%3Fmoddttm=20161023090658",
        borrow: {
            id: 1234,
            profile: "",
            name: "이경륜"
        },
        wait_list: [
            {
                id: 1234,
                profile: "",
                name: "이경륜"
            }, {
                id: 1234,
                profile: "",
                name: "이경륜"
            }
        ]

    }, {
        id: 123123,
        title: "콩고",
        link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
        cover_l_url: "https://t1.search.daumcdn.net/thumb/P110x160/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FBOK00030403128YE%3Fmoddttm=20161023090658",
        borrow: {
            id: 1234,
            profile: "",
            name: "이경륜"
        },
        wait_list: [
            {
                id: 1234,
                profile: "",
                name: "이경륜"
            }, {
                id: 1234,
                profile: "",
                name: "이경륜"
            }
        ]

    }])
});


router.get('/', (req, res) => {
    var rows = [{
        cover_url: "./img/test1.jpeg"
    }, {
        cover_url: "./img/test2.jpeg"
    }, {
        cover_url: "./img/test3.jpeg"
    }];
    return res.json(rows);
});


export default router;