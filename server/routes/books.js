import express from 'express';
import mysql from 'mysql';


const router = express.Router();

router.post('/', (req, res) => {
    //if 저장했니

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : '3306',
        database : 'cowlib'
    });

    connection.connect();

    connection.query('insert into book values(?, ?, ?, ?, ?, ?, ?);', function(err, rows, fields) {
        if (!err)
            return res.json(rows);
        else
            console.log('Error while performing Query.', err);
    });

    connection.end();
    res.send('You are reading post ' + req.params.id);
});


router.get('/', (req, res) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : '3306',
        database : 'cowlib'
    });

    connection.connect();

    connection.query('SELECT * FROM book', function(err, rows, fields) {
        if (!err)
            return res.json(rows);
        else
            console.log('Error while performing Query.', err);
    });

    connection.end();
});


export default router;