const { connection } = require('../config/config');

class QueryController {
    
    //составление перечня заказов на текущие сутки
    async getCurrentDayOrders(req, res) {
        // const day = req.body.day;

        await connection.query('SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND DATE(`o_dateCompletion`)=CURRENT_DATE() ORDER BY order.o_dateCompletion ASC', function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    //составление списка заказов, подлежащих выполнению, в соответствующем порядке 
    async getOrderOrders(req, res) {
        await connection.query('SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND order.o_readiness=0 ORDER BY order.o_dateCompletion ASC',  function (error, results) {
            if (error) throw error;
            console.log('The ASC orders is: ', results);
            res.send(results);
        })
    }
    
    //составление списка готовых к выдаче заказов
    async getReadyOrders(req, res) {
        await connection.query('SELECT order.id_order, order.cheque_id, customer.c_fio, order.o_dataOrder, order.o_dateCompletion, order.o_readiness, order.o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND `o_readiness`=1 AND `o_issuingOrder`=0', function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    async getIssuedOrders(req, res) {await connection.query('SELECT order.id_order, order.cheque_id, customer.c_fio, order.o_dataOrder, order.o_dateCompletion, order.o_readiness, order.o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND `o_readiness`=1 AND `o_issuingOrder`=1', function (error, results) {
        if (error) throw error;
        console.log('The orders is: ', results);
        res.send(results);
    })
    }

    //по приходе клиента в этом списке производится поиск его заказа
    async postCustomerOrder(req, res) {
        const user = req.body.user;
        console.log(user);

        await connection.query(`SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM \`order\`, \`customer\` WHERE order.customer_id=customer.id_customer AND c_fio LIKE '${user}%'`, function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    async selectReport(req, res) {
        const date = req.body;

        await connection.query('SELECT COUNT(`order`.id_order) AS totalOrders,  SUM(cheque.сh_price) AS totalPrice, SUM(typeservices.s_numberImages) AS totalImages FROM `order`, `typeservices`, `cheque` WHERE `order`.cheque_id=cheque.id_cheque AND cheque.services_id=typeservices.id_services AND DATE(`order`.`o_dateCompletion`)>=? AND DATE(`order`.`o_dateCompletion`)<=?', [date.after, date.before],
            function (error, results) {
                if (error) throw error;
                console.log('The select is: ', results);
                res.send(results);
        })
    }
}

module.exports = new QueryController();