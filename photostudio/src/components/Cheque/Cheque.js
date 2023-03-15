import { useState, useEffect } from 'react';
import './cheque.scss';

import { api } from '../../resources/config';
import Pagination from '../subComponents/Pagination/Pagination';

const Cheque = () => {
    const [cheque, setCheque] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const ChequePerPage = 7;
    const lastChequeIndex = currentPage * ChequePerPage;
    const firstOrdersIndex = lastChequeIndex - ChequePerPage;
    const currentCheque = cheque.slice(firstOrdersIndex, lastChequeIndex);

    const paginate = page => {
        setCurrentPage(page);
    }

    useEffect(() => {
        getCheque();
    }, []);

    const getCheque = async () => {
        const res = await api.get('/cheque');
        console.log(res.data);
        setCheque(res.data);
    }

    return (
        <div className='cheque'>
            <h2 className='cheque__title'>
                Чеки
            </h2>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='cheque__row_services'>Вид услуги</th>
                            <th className='cheque__row_rate'>Тариф</th>
                            <th className='cheque__row_last'>Общая стоимость</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCheque.map((res) => (   
                            <tr key={res.id_cheque} className='clientTable'>
                                <td>
                                    {res.id_cheque}
                                </td>
                                <td>
                                    {res.s_name}
                                </td>
                                <td>
                                    {res.r_name}
                                </td>
                                <td>
                                    {res.сh_price}
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className='table__pagination'>
                    <Pagination
                    totalOrders={cheque.length} 
                    ordersPerPage={ChequePerPage}
                    paginate={paginate} />
                </div>
            </div>
        </div>
    );
};

export default Cheque;