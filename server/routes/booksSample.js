import express from "express";
import 'isomorphic-fetch';
import mysql from 'mysql';
import config from '../../config/config';

const router = express.Router();
const err = false;
const DAUM_BOOK_SEARCH_URL = "https://apis.daum.net/search/book";

router.get('/search', (req, res) => {

    var callback = function (books, connection) {
        connection.end();
        res.json(books);
    };

    fetch(DAUM_BOOK_SEARCH_URL + "?output=json&apikey=" + config.daum_api_key + "&q=" + req.query.q, {
        method: 'GET',
    }).then(function (response) {
        return response.json();
    }).then(function (json) {

        var items = json.channel.item;
        var connection = mysql.createConnection(config.mysql);

        connection.connect();

        var results = [];
        var pending = items.length;

        items.forEach(function (item, idx) {

            var data = [item.isbn, item.isbn13, item.title, item.author, item.description, item.pub_nm, item.cover_l_url];
            var isbns = [item.isbn, item.isbn13];
            results.push(data);

            connection.query('select * from book where isbn=? or isbn13=?;', isbns, function (err, rows, fields) {
                if (rows.length == 0) {
                    connection.query('insert into book (isbn, isbn13, title, author, description, publisher, cover_url) values(?, ?, ?, ?, ?, ?, ?);', data, function (err, rows, fields) {
                        if (!err) {
                            results.push(data);
                            console.log('insert success.');
                        } else {
                            console.log('Error while performing Query.', err);
                        }
                        if (0 === --pending) {
                            callback(results, connection);
                        }
                    });
                } else {
                    results.push(data);
                    if (0 === --pending) {
                        callback(results, connection);
                    }
                }
            });

        });

    }).catch(function (ex) {
        console.log('parsing failed', ex)
    });
});

router.post('/:ownerId/:bookId', (req, res) => {
    var ownerId = req.params.ownerId;
    var bookId = req.params.bookId;

    var conditions = [parseInt(ownerId), parseInt(bookId)];
    var connection = mysql.createConnection(config.mysql);
    connection.query('insert into user_has_book values(DEFAULT, ?, ?, "false");', conditions, function (err, rows, fields) {
        if (!err) {
            console.log('update success.');
            res.sendStatus(200);
        } else {
            console.log('Error while performing Query.', err);
            res.sendStatus(500);
        }
    });
});

router.delete('/:ownerId/:bookId', (req, res) => {
    var ownerId = req.params.ownerId;
    var bookId = req.params.bookId;
    var conditions = [ownerId, bookId];

    var connection = mysql.createConnection(config.mysql);
    connection.query('update user_has_book set is_deleted="T" where user_id=? and book_id=?;', conditions, function (err, rows, fields) {
        if (!err) {
            console.log('update success.');
            res.sendStatus(200);
        } else {
            console.log('Error while performing Query.', err);
            res.sendStatus(500);
        }
    });
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
        res.sendStatus(200);
    else
        res.sendStatus(500);
});

router.delete('/:ownerId/:bookId/borrow', (req, res) => {
    // parameter: borrower 반납완료한 사람 id,
    // db에 borrow_history 상태를 RETURN으로 변경

    if (!err)
        res.sendStatus(200);
    else
        res.sendStatus(500);
});


router.put('/:ownerId/:bookId/wait', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // wait_hitory 상태 REJECT으로 변경

    if (!err)
        res.sendStatus(200);
    else
        res.sendStatus(500);
});

router.delete('/:ownerId/:bookId/wait', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // wait_hitory 상태 CANCEL으로 변경

    if (!err)
        res.sendStatus(200);
    else
        res.sendStatus(500);
});

router.post('/:ownerId/:bookId/wait', (req, res) => {
    // parameter: borrower 빌리기 요청한 사람 id,
    // wait_hitory 추가

    if (!err)
        res.sendStatus(200);
    else
        res.sendStatus(500);
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