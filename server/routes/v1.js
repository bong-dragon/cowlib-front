import express from "express";
import 'isomorphic-fetch';

const router = express.Router();
const COWLIB_SERVER_API_URL = "http://localhost:8080"

const convertJson = (res) => res.json();
const handleException = (ex) => {
    console.log('****************** API ERROR')
    console.log(ex);
};


router.get('/bookMetas/search', (req, res) => {
    let q = req.query.q? req.query.q: '';
    q = encodeURIComponent(q);
    let url = `${COWLIB_SERVER_API_URL}/v1/bookMetas/search?q=${q}`;
    console.log(`url: ${url}`);

    fetch(url).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.post('/callNumbers', (req, res) => {
    let owner = req.cookies["cowlib-user"];
    let ownerId = owner? owner.id: '';
    let bookMetaId = req.query.bookMetaId? req.query.bookMetaId: '';
    
    let url = `${COWLIB_SERVER_API_URL}/v1/callNumbers?ownerId=${ownerId}&bookMetaId=${bookMetaId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.delete('/callNumbers', (req, res) => {
    let id = req.query.id? req.query.id: '';

    let url = `${COWLIB_SERVER_API_URL}/v1/callNumbers?id=${id}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'delete'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.post('/callNumbers/:callNumberId/borrow', (req, res) => {
    let user = req.cookies["cowlib-user"];
    let callNumberId = req.params.callNumberId? req.params.callNumberId: '';
    let borrowerId = user? user.id : '';
    
    let url = `${COWLIB_SERVER_API_URL}/v1/callNumbers/${callNumberId}/borrow?borrowerId=${borrowerId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.delete('/callNumbers/:callNumberId/borrow', (req, res) => {
    let user = req.cookies["cowlib-user"];
    let callNumberId = req.params.callNumberId? req.params.callNumberId: '';
    let borrowerId = user? user.id : '';
    
    let url = `${COWLIB_SERVER_API_URL}/v1/callNumbers/${callNumberId}/borrow?borrowerId=${borrowerId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'delete'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.post('/callNumbers/:callNumberId/reserve', (req, res) => {
    let user = req.cookies["cowlib-user"];
    let callNumberId = req.params.callNumberId? req.params.callNumberId: '';
    let reserverId = user? user.id : '';
    
    let url = `${COWLIB_SERVER_API_URL}/v1/callNumbers/${callNumberId}/reserve?reserverId=${reserverId}`;
    console.log(`url: ${url}`);

    fetch(url, {method:'post'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.delete('/callNumbers/:callNumberId/reserve', (req, res) => {
    let user = req.cookies["cowlib-user"];
    let callNumberId = req.params.callNumberId? req.params.callNumberId: '';
    let reserverId = user.id? user.id : '';

    let url = `${COWLIB_SERVER_API_URL}/v1/callNumbers/${callNumberId}/reserve?reserverId=${reserverId}`;
    console.log(`url: ${url}`);
    
    fetch(url, {method:'delete'}).then(convertJson).then((json) => res.json(json)).catch(handleException);
});

router.get('/books/', (req, res) => {
    let ownerId = req.query.ownerId? req.query.ownerId: '';
    let url = `${COWLIB_SERVER_API_URL}/v1/books?ownerId=${ownerId}`;
    console.log(`url: ${url}`);

    fetch(url).then(convertJson).then((json) => {
        res.json(json);
    }).catch(handleException);
});






export default router;