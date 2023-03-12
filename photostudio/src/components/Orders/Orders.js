import { useState, useEffect } from 'react';
import './orders.scss';
import Button from '../subComponents/Button/Button';

import list from '../../resources/img/list.svg';
import change from '../../resources/img/change.svg';
import del from '../../resources/img/del.svg';

import { api } from '../../resources/config';
import { LIST } from '../../resources/Routes';
import ModalResults from '../ModalResults/ModalResults';

const Orders = () => {
    const [searchName, setSearchName] = useState('');
    const [orders, setOrders] = useState([]);
    const [activeList, setActiveList] = useState(LIST.all);
    const [modalResult, setModalResult] = useState(false);
    const [result, setResult] =  useState({totalOrders: '', totalPrice: '', totalImages: ''});


    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const res = await api.get('/');
        console.log(res.data);
        setOrders(res.data);
        setActiveList(LIST.all);
    }

    const getOrderOrders = async () => {
        const res = await api.get('/orderOrders');
        console.log(res.data);
        setOrders(res.data);
        setActiveList(LIST.order);
    }

    const getReadyOrders = async () => {
        const res = await api.get('/readyOrders');
        console.log(res.data);
        setOrders(res.data);
        setActiveList(LIST.ready);
    }

    const getCurrentDayOrders = async () => {
        const res = await api.get('/currentDayOrders');
        console.log(res.data);
        setOrders(res.data);
        setActiveList(LIST.currentDay);
    }

    const SearchCustomerOrder = async () => {
        const res = await api.post('/customerOrder', {user: searchName});
        console.log(res.data);
        setOrders(res.data);
        setActiveList(LIST.none);
    }

    const createReport = async () => {
        await api.post('/selectReport', {
            "after": "2023-02-15",
            "before": "2023-04-15"
        }).then((data) => {
            console.log(data.data);
            setResult(data.data[0]);
            setModalResult(true);
        })
    }

    return (
        <div className='orders'>
            <h2 className='orders__title'>
                Заказы
            </h2>
            <div className='orders__query'>
                <ul className='orders__list'>
                    <li className={activeList === 'all' ? 'orders__list_active' : ''}
                    onClick={() => getOrders()}>
                        Все
                    </li>
                    <li className={activeList === 'ready' ? 'orders__list_active' : ''}
                    onClick={() => getReadyOrders()}>
                        Готовые
                    </li>
                    <li className={activeList === 'currentDay' ? 'orders__list_active' : ''}
                    onClick={() => getCurrentDayOrders()}>
                        На текущие сутки
                    </li>
                    <li className={activeList === 'order' ? 'orders__list_active' : ''}
                    onClick={() => getOrderOrders()}>
                        По дате выполнения
                    </li>
                </ul>
                <div>
                    <input className='orders__input'
                    placeholder='Введите имя заказчика' 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)}/>
                    <Button mix='prim' onClick={SearchCustomerOrder}>
                        Найти
                    </Button>
                </div>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Чека</th>
                            <th>ФИО Заказчика</th>
                            <th>Дата заказа</th>
                            <th>Дата выполнения</th>
                            <th>Готовность</th>
                            <th>Выдача заказа</th>
                            <th>+</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((res) => (
                            <tr key={res.id_order} className='clientTable'>
                                <td>
                                    {res.id_order}
                                </td>
                                <td>
                                    {res.cheque_id}
                                </td>
                                <td>
                                    {res.c_fio}
                                </td>
                                <td>
                                    {res.o_dataOrder.slice(0, 10)
                                    + ' ' +
                                    res.o_dataOrder.slice(12, 19)}
                                </td>
                                <td>
                                    {res.o_dateCompletion.slice(0, 10)
                                    + ' ' +
                                    res.o_dateCompletion.slice(12, 19)}
                                </td>
                                <td>
                                    {res.o_issuingOrder.data[0] === 0 ? 'Нет' : 'Да'}
                                </td>
                                <td>
                                    {res.o_readiness.data[0] === 0 ? 'Нет' : 'Да'}
                                </td>
                                <td>
                                    <Button mix='empty'>
                                        <img src={list} alt=''/>
                                    </Button>
                                    <Button mix='empty'>
                                        <img src={change} alt=''/>
                                    </Button>
                                    <Button mix='empty'>
                                        <img src={del} alt=''/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className='table__pagination'>
                    <Button mix='prim'>1</Button>
                </div>
            </div>
            <div className='orders__report'>
                <Button mix='prim' onClick={createReport}>
                    Составить отчет
                </Button>
                <div className='orders__report_input'>
                    <p>с</p>
                    <input className='orders__input'
                    placeholder='2023-01-01' 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)}/>
                </div>
                <div className='orders__report_input'>
                    <p>по</p>
                    <input className='orders__input'
                    placeholder='2023-02-01' 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)}/>
                </div>
            </div>
            <div className={`orders__modal ${modalResult ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModalResult(false)}>
                <ModalResults close={() => setModalResult(false)}
                    content={(e) => e.stopPropagation()}
                    totalOrders={result.totalOrders}
                    totalPrice={result.totalPrice}
                    totalImages={result.totalImages}/>
            </div>
        </div>
    );
};

export default Orders;