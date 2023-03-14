const { connection } = require('../config/config');

class OrderController {
    
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

    async addOrder(req, res) {
        const order = req.body;
        console.log(order);
        let idCheque;
        
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

    async getOrderChange(req, res) {
        const id = req.body.id;

        await connection.query('SELECT `order`.id_order, `order`.cheque_id, `customer`.c_fio, `order`.o_dataOrder, `order`.o_dateCompletion, `order`.o_readiness, `order`.o_issuingOrder FROM `order`, `customer` WHERE `order`.customer_id=`customer`.id_customer AND `order`.id_order=?', id,
            function (error, results) {
                if (error) throw error;
                console.log('The delete is: ', results);
                res.send(results);
        })
    }
}

module.exports = new OrderController();