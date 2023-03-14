const { connection } = require('../config/config');

class Controller {
    
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

        await connection.query(`INSERT INTO customer (c_fio, c_telephone) VALUES ('${customer.name}', '${customer.telephone}')`,
            function (error, results) {
                if (error) throw error;
                console.log('The customer is: ', results);
                res.send(results);
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
}

module.exports = new Controller();