const express = require('express');
const Controller = require('../controller/controller');
const QueryController = require('../controller/queryController');
const OrderController = require('../controller/orderController');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', OrderController.getOrders);
router.post('/order', OrderController.getOrder);
router.post('/change', OrderController.changeOrder);
router.post('/addOrder', OrderController.addOrder);
router.post('/orderChange', OrderController.getOrderChange);


router.get('/readyOrders', QueryController.getReadyOrders);
router.get('/orderOrders', QueryController.getOrderOrders);
router.get('/currentDayOrders', QueryController.getCurrentDayOrders);
router.get('/issuedOrders', QueryController.getIssuedOrders);
router.post('/customerOrder', QueryController.postCustomerOrder);
router.post('/selectReport', QueryController.selectReport);


router.get('/customers', Controller.getCustomers);
router.get('/rate', Controller.getRate);
router.get('/typeServices', Controller.getTypeServices);
router.get('/cheque', Controller.getCheque);

router.post('/delete', Controller.deleteRow);
router.post('/addTypeServices', Controller.addTypeServices);
router.post('/addRate', Controller.addRate);
router.post('/addCustomer', Controller.addCustomer);


module.exports = router;