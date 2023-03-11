const { connection } = require('../config/config');

class Controller {
    async getOrders(req, res) {
        await connection.query('SELECT * FROM `order`', function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    async getOrder(req, res) {
        const id = req.params.id;

        await connection.query('SELECT * FROM `order` WHERE `id_order` = ?', id, function (error, results) {
            if (error) throw error;
            console.log('The order is: ', results);
            res.send(results);
        })
    }

    //составление перечня заказов на текущие сутки
    async postCurrentDayOrders(req, res) {
        const day = req.body.day;

        await connection.query('SELECT * FROM `order` WHERE `o_dateCompletion`=?', day,  function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    //составление списка заказов, подлежащих выполнению, в соответствующем порядке 
    async getOrderOrders(req, res) {
        await connection.query('SELECT * FROM `order` WHERE `o_readiness`=0 ORDER BY `o_dateCompletion` ASC',  function (error, results) {
            if (error) throw error;
            console.log('The ASC orders is: ', results);
            res.send(results);
        })
    }
    
    //составление списка готовых к выдаче заказов
    async getReadyOrders(req, res) {
        await connection.query('SELECT * FROM `order` WHERE `o_readiness`=1 AND `o_issuingOrder`=0', function (error, results) {
            if (error) throw error;
            console.log('The orders is: ', results);
            res.send(results);
        })
    }

    //по приходе клиента в этом списке производится поиск его заказа
    async postCustomerOrder(req, res) {
        const user = req.body.user;

        await connection.query('SELECT * FROM `order` WHERE `customer_id`= ?', user, function (error, results) {
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
}

module.exports = new Controller();