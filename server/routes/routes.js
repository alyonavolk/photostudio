const express = require('express');
const Controller = require('../controller/controller');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', Controller.getOrders);
// router.get('/order/:id', Controller.getOrder);
router.get('/readyOrders', Controller.getReadyOrders);
router.get('/orderOrders', Controller.getOrderOrders);
router.get('/currentDayOrders', Controller.getCurrentDayOrders);

router.post('/order', Controller.getOrder);
router.post('/customerOrder', Controller.postCustomerOrder);
router.post('/delete', Controller.deleteRow);
router.post('/selectReport', Controller.selectReport);

router.post('/addOrder', Controller.addOrder);
router.post('/addTypeServices', Controller.addTypeServices);
router.post('/addRate', Controller.addRate);
router.post('/addCustomer', Controller.addCustomer);
router.post('/addCheque', Controller.addCheque);


module.exports = router;