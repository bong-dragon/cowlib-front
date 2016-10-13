import express from 'express';
import mysql from 'mysql';


const router = express.Router();

router.post('/', (req, res) => {
    var rows = {

    };
    return res.json(rows);
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