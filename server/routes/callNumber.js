import express from "express";
import 'isomorphic-fetch';

const router = express.Router();
const COWLIB_SERVER_API_URL = "http://localhost:8080"

router.get('/:ownerId/callNumber', (req, res) => {
    var ownerId = req.params.ownerId;
    var bookId = req.query.bookId;

    console.log(`ownerId: ${ownerId}, bookId: ${bookId}`);

    let url = `${COWLIB_SERVER_API_URL}/v1/libs/${ownerId}/callNumber?bookId=${bookId}`;
    console.log(`uri: ${url}`);

    fetch(`/v1/libs/${ownerId}/callNumber?bookId=${bookId}`, {
        method: 'post'
    }).then((response) => response.json())
        .then((responseJson) => {
            res.json(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });
});

export default router;