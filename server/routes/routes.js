const express = require('express');
const Controller = require('../controller/controller');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', Controller.getOrders);
router.get('/readyOrders', Controller.getReadyOrders);
router.get('/orderOrders', Controller.getOrderOrders);
router.get('/currentDayOrders', Controller.getCurrentDayOrders);

router.get('/customer', Controller.getCustomer);
router.get('/rate', Controller.getRate);
router.get('/typeServices', Controller.getTypeServices);

router.post('/order', Controller.getOrder);
router.post('/customerOrder', Controller.postCustomerOrder);
router.post('/delete', Controller.deleteRow);
router.post('/selectReport', Controller.selectReport);
router.post('/orderChange', Controller.getOrderChange);
router.post('/change', Controller.changeOrder);

router.post('/addOrder', Controller.addOrder);
router.post('/addTypeServices', Controller.addTypeServices);
router.post('/addRate', Controller.addRate);
router.post('/addCustomer', Controller.addCustomer);


module.exports = router;