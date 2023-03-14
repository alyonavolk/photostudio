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

        await connection.query(`SELECT * FROM \`order\`, \`typeservices\`, \`cheque\`, \`customer\`, \`rate\` WHERE \`order\`.id_order=${id} AND \`order\`.cheque_id=\`cheque\`.id_cheque AND \`order\`.customer_id= \`customer\`.id_customer AND \`cheque\`.services_id=\`typeservices\`.id_services AND \`cheque\`.rate_id=\`rate\`.id_rate`, function (error, results) {
            if (error) throw error;
            console.log('The order is: ', results);
            res.send(results);
        })
    }

    //составление перечня заказов на текущие сутки
    async getCurrentDayOrders(req, res) {
        // const day = req.body.day;

        await connection.query('SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM `order`, `customer` WHERE order.customer_id=customer.id_customer AND DATE(`o_dateCompletion`)=CURRENT_DATE', function (error, results) {
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

        await connection.query(`SELECT id_order, cheque_id, c_fio, o_dataOrder, o_dateCompletion, o_readiness, o_issuingOrder FROM \`order\`, \`customer\` WHERE order.customer_id=customer.id_customer AND c_fio LIKE '${user}%'`, function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    async getCustomers(req, res) {
        await connection.query('SELECT * FROM `customer`', function (error, results) {
            if (error) throw error;
            console.log('The customer is: ', results);
            res.send(results);
        })
    }
    
    async getRate(req, res) {
        await connection.query('SELECT * FROM `rate`', function (error, results) {
            if (error) throw error;
            console.log('The customer is: ', results);
            res.send(results);
        })
    }

    async getTypeServices(req, res) {
        await connection.query('SELECT * FROM `typeservices`', function (error, results) {
            if (error) throw error;
            console.log('The customer is: ', results);
            res.send(results);
        })
    }

    async getCheque(req, res) {
        await connection.query('SELECT id_cheque, s_name, r_name, сh_price FROM `cheque`, `typeservices`, `rate` WHERE id_services=services_id AND id_rate=rate_id', function (error, results) {
            if (error) throw error;
            console.log('The cheque is: ', results);
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
    
    async addOrder(req, res) {
        const order = req.body;
        console.log(order);
        let idCheque;
        const otpr = {
            "services": 1,
            "rate": 1,
            "customer": 1,
            "dateCompletion": "2023-03-15 12:00:00"
        }
        
        await connection.query(`INSERT INTO cheque (services_id, rate_id, сh_price) VALUES  (${order.services}, ${order.rate}, (SELECT s_price FROM typeservices WHERE id_services=${order.services})+((SELECT s_price FROM typeservices WHERE id_services=${order.services}) * (SELECT r_premium  FROM rate WHERE id_rate=${order.rate})))`,
            function (error, results) {
                if (error) throw error;
                console.log('The cheque is: ', results);
                connection.query(`SELECT id_cheque FROM cheque ORDER BY id_cheque DESC LIMIT 1`, function (error, results) {
                    if (error) throw error;
                    idCheque = results[0];
                    idCheque = idCheque.id_cheque;
                    console.log('The cheque id: ', idCheque);
                    res.send(results);
                    connection.query(`INSERT INTO \`order\` (cheque_id, customer_id, o_dataOrder, o_dateCompletion) VALUES (${idCheque}, ${order.customer}, NOW(), "${order.dateCompletion}")`)
                })
                
        })
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

        await connection.query('SELECT COUNT(`order`.id_order) AS totalOrders,  SUM(cheque.сh_price) AS totalPrice, SUM(typeservices.s_numberImages) AS totalImages FROM `order`, `typeservices`, `cheque` WHERE `order`.cheque_id=cheque.id_cheque AND cheque.services_id=typeservices.id_services AND DATE(`order`.`o_dateCompletion`)>=? AND DATE(`order`.`o_dateCompletion`)<=?', [date.after, date.before],
            function (error, results) {
                if (error) throw error;
                console.log('The select is: ', results);
                res.send(results);
        })
    }

    async getOrderChange(req, res) {
        const id = req.body.id;

        await connection.query('SELECT `order`.id_order, `order`.cheque_id, `customer`.c_fio, `order`.o_dataOrder, `order`.o_dateCompletion, `order`.o_readiness, `order`.o_issuingOrder FROM `order`, `customer` WHERE `order`.customer_id=`customer`.id_customer AND `order`.id_order=?', id,
            function (error, results) {
                if (error) throw error;
                console.log('The delete is: ', results);
                res.send(results);
        })
    }

    async changeOrder(req, res) {
        const result = req.body;
        console.log(result);

        await connection.query(`UPDATE \`order\` SET \`o_readiness\`=${result.readiness}, \`o_issuingOrder\`=${result.issuing} WHERE id_order=${result.id}`,
            function (error, results) {
                if (error) throw error;
                console.log('The update is: ', results);
                res.send(results);
        })
    }
}

module.exports = new Controller();