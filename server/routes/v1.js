import express from "express";
import 'isomorphic-fetch';

const router = express.Router();
const COWLIB_SERVER_API_URL = "http://localhost:8080"

const convertJson = (res) => res.json();
const handleException = (ex) => {
    console.log('****************** API ERROR')
    console.log(ex);
}


router.get('/bookMetas/search', (req, res) => {
    let q = req.query.q? req.query.q: '';
    q = encodeURIComponent(q);
    let url = `${COWLIB_SERVER_API_URL}/v1/bookMetas/search?q=${q}`;
    console.log(`url: ${url}`);

    fetch(url).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.post('/libs/:ownerId/callNumber', (req, res) => {
    let ownerId = req.params.ownerId? req.params.ownerId: '';
    let bookMetaId = req.query.bookMetaId? req.query.bookMetaId: '';
    let url = `${COWLIB_SERVER_API_URL}/v1/libs/${ownerId}/callNumber?bookMetaId=${bookMetaId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
})

router.post('/libs/:ownerId/borrow', (req, res) => {
    let ownerId = req.params.ownerId? req.params.ownerId: '';
    let callNumberId = req.query.callNumberId? req.query.callNumberId: '';
    let borrowerId = req.user.id? req.user.id : '';
    let url = `${COWLIB_SERVER_API_URL}/v1/libs/${ownerId}/borrow?callNumberId=${callNumberId}&borrowerId=${borrowerId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
})

router.delete('/libs/:ownerId/borrow', (req, res) => {
    let ownerId = req.params.ownerId? req.params.ownerId: '';
    let callNumberId = req.query.callNumberId? req.query.callNumberId: '';
    let borrowerId = req.user.id? req.user.id : '';
    let url = `${COWLIB_SERVER_API_URL}/v1/libs/${ownerId}/borrow?callNumberId=${callNumberId}&borrowerId=${borrowerId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'delete'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
})

router.post('/wait', (req, res) => {
    let callNumberId = req.query.callNumberId? req.query.callNumberId: '';
    let waiterId = req.user.id? req.user.id : '';
    let url = `${COWLIB_SERVER_API_URL}/v1/wait?callNumberId=${waiterId}&borrowerId=${waiterId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
})

router.delete('/wait', (req, res) => {
    let callNumberId = req.query.callNumberId? req.query.callNumberId: '';
    let waiterId = req.user.id? req.user.id : '';
    let url = `${COWLIB_SERVER_API_URL}/v1/wait?callNumberId=${waiterId}&borrowerId=${waiterId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'delete'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
})

router.get('/books/', (req, res) => {
    let ownerId = req.query.ownerId? req.query.ownerId: '';
    let url = `${COWLIB_SERVER_API_URL}/v1/books?ownerId=${ownerId}`;
    console.log(`url: ${url}`);

    fetch(url).then(convertJson).then((json) => res.json(json)).catch(handleException);
});






export default router;