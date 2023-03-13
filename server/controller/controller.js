const { connection } = require('../config/config');

class Controller {
    async getOrders(req, res) {
        await connection.query('SELECT order.id_order, order.cheque_id, customer.c_fio, order.o_dataOrder, order.o_dateCompletion, order.o_readiness, order.o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer', function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    async getOrder(req, res) {
        const id = req.body.id;

        await connection.query('SELECT * FROM `order`, `typeservices`, `cheque`, `customer`, `rate` WHERE `order`.cheque_id=`cheque`.id_cheque AND `order`.customer_id=? AND `customer`.id_customer=? AND `cheque`.services_id=`typeservices`.id_services AND `cheque`.rate_id=`rate`.id_rate', [id, id], function (error, results) {
            if (error) throw error;
            console.log('The order is: ', results);
            res.send(results);
        })
    }

    //составление перечня заказов на текущие сутки
    async getCurrentDayOrders(req, res) {
        // const day = req.body.day;

        await connection.query('SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND `o_dateCompletion`=NOW()', function (error, results) {
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

    //по приходе клиента в этом списке производится поиск его заказа
    async postCustomerOrder(req, res) {
        const user = req.body.user;
        console.log(user);

        await connection.query('SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND c_fio= ?', user, function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    async getCustomer(req, res) {
        await connection.query('SELECT * FROM `customer`', function (error, results) {
            if (error) throw error;
            console.log('The customer is: ', results);
            res.send(results);
        })
    }
    
    async addTypeServices(req, res) {
        const services = req.body;
        console.log(services);

        await connection.query(`INSERT INTO typeservices (s_name, s_price, s_numberImages) VALUES ('${services.name}', ${services.price}, ${services.numberImages})`,
            function (error, results) {
                if (error) throw error;
                console.log('The customer is: ', results);
                res.send(results);
        })
    }
    async addRate(req, res) {
        const rate = req.body;
        console.log(rate);

        await connection.query(`INSERT INTO rate (r_name, r_premium) VALUES ('${rate.name}', ${rate.premium})`,
            function (error, results) {
                if (error) throw error;
                console.log('The customer is: ', results);
                res.send(results);
        })
    }
    async addCustomer(req, res) {
        const customer = req.body;
        console.log(customer);

        await connection.query(`INSERT INTO customer (c_fio, c_telephone) VALUES ('${customer.name}', ${customer.telephone})`,
            function (error, results) {
                if (error) throw error;
                console.log('The customer is: ', results);
                res.send(results);
        })
    }

    async addCheque(req, res) {

    }
    
    async addOrder(req, res) {

    }

    async deleteRow(req, res) {
        const result = req.body;
        console.log(result);

        await connection.query('DELETE FROM ?? WHERE ??=?', [result.table, result.row, result.id],
            function (error, results) {
                if (error) throw error;
                console.log('The delete is: ', results.table, result.id);
                res.send(results);
        })
    }

    async selectReport(req, res) {
        const date = req.body;

        await connection.query('SELECT COUNT(`order`.id_order) AS totalOrders,  SUM(cheque.сh_price) AS totalPrice, SUM(typeservices.s_numberImages) AS totalImages FROM `order`, `typeservices`, `cheque` WHERE `order`.cheque_id=cheque.id_cheque AND cheque.services_id=typeservices.id_services AND DATE(`order`.`o_dateCompletion`)>? AND DATE(`order`.`o_dateCompletion`)<?', [date.after, date.before],
            function (error, results) {
                if (error) throw error;
                console.log('The select is: ', results);
                res.send(results);
        })

        // await connection.query('SELECT COUNT(id_order) AS totalOrders FROM `order` WHERE DATE(`order`.o_dateCompletion)>? AND DATE(`order`.o_dateCompletion)<?', [date.after, date.before],
        //     function (error, results) {
        //         if (error) throw error;
        //         console.log('The select is: ', results);
        //         report = results;
        // })
        // await connection.query('SELECT SUM(cheque.сh_price) AS totalPrice FROM `order` JOIN cheque ON `order`.cheque_id=cheque.id_cheque WHERE DATE(`order`.o_dateCompletion)>? AND DATE(`order`.o_dateCompletion)<?', [date.after, date.before],
        //     function (error, results) {
        //         if (error) throw error;
        //         console.log('The select is: ', results);
        //         report += results;
        // })
        // await connection.query('SELECT SUM(typeservices.s_numberImages) AS totalImages FROM `typeservices`, `cheque`, `order` WHERE cheque.services_id=typeservices.id_services AND DATE(`order`.o_dateCompletion)>? AND DATE(`order`.o_dateCompletion)<?', [date.after, date.before],
        //     function (error, results) {
        //         if (error) throw error;
        //         console.log('The select is: ', results);
        //         report += results;
        // })
    }

    async getOrderChange(req, res) {
        const id = req.body.id;

        await connection.query('SELECT `order`.id_order, `order`.cheque_id, `customer`.c_fio, `order`.o_dataOrder, `order`.o_dateCompletion, `order`.o_readiness, `order`.o_issuingOrder FROM `order`, `customer` WHERE `order`.customer_id=`customer`.id_customer AND `customer`.`id_customer`=?', id,
            function (error, results) {
                if (error) throw error;
                console.log('The delete is: ', results);
                res.send(results);
        })
    }

    async changeOrder(req, res) {
        const result = req.body;
        console.log(result);

        await connection.query('UPDATE `order` SET `o_readiness`=?, `o_issuingOrder`=? WHERE id_order=?', [result.readiness, result.issuing, result.id],
            function (error, results) {
                if (error) throw error;
                console.log('The update is: ', results);
                res.send(results);
        })
    }
}

module.exports = new Controller();