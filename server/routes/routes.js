const express = require('express');
const Controller = require('../controller/controller');

const router = express.Router();

router.get('/', Controller.getOrders);
router.get('/order/:id', Controller.getOrder);
router.get('/readyOrders', Controller.getReadyOrders);
router.get('/orderOrders', Controller.getOrderOrders);


router.post('/currentDayOrders', Controller.postCurrentDayOrders);
router.post('/customerOrder', Controller.postCustomerOrder);

router.post('/addOrder', Controller.addOrder);
router.post('/addTypeServices', Controller.addTypeServices);
router.post('/addRate', Controller.addRate);
router.post('/addCustomer', Controller.addCustomer);
router.post('/addCheque', Controller.addCheque);


module.exports = router;