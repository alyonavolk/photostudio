import { useState, useEffect } from 'react';
import './customers.scss';

import del from '../../resources/img/del.svg';

import { api } from '../../resources/config';
import { MODAL } from '../../resources/Routes';
import Pagination from '../subComponents/Pagination/Pagination';
import Button from '../subComponents/Button/Button';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [modal, setModal] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const CustomersPerPage = 7;
    const lastCustomersIndex = currentPage * CustomersPerPage;
    const firstCustomersIndex = lastCustomersIndex - CustomersPerPage;
    const currentCustomers = customers.slice(firstCustomersIndex, lastCustomersIndex);

    const paginate = page => {
        setCurrentPage(page);
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        const res = await api.get('/customers');
        console.log(res.data);
        setCustomers(res.data);
    }

    const delCustomer = async (id) => {
        const res = await api.post('/delete', {table: 'customer', row: 'id_customer', id: id});
        console.log(res.data);
        await getCustomers();
    }


    return (
        <div className='customer'>
            <h2 className='customer__title'>
                Заказы
            </h2>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='customer__row_fio'>ФИО заказчика</th>
                            <th className='customer__row_tel'>Телефон заказчика</th>
                            <th className='customer__row_last' 
                            onClick={() => setModal(MODAL.addOrder)} >
                                +
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((res) => (   
                            <tr key={res.id_customer} className='clientTable'>
                                <td>
                                    {res.id_customer}
                                </td>
                                <td>
                                    {res.c_fio}
                                </td>
                                <td>
                                    {res.c_telephone}
                                </td>
                                <td className='customer__row_btn'>
                                    <Button mix='empty' 
                                    onClick={() => delCustomer(res.id_customer)}>
                                        <img src={del} alt=''/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='table__pagination'>
                    <Pagination
                    totalOrders={customers.length} 
                    ordersPerPage={CustomersPerPage}
                    paginate={paginate} />
                </div>
            </div>
        </div>
    );
};

export default Customers;