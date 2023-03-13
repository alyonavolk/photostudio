import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './orders.scss';
import Button from '../subComponents/Button/Button';

import list from '../../resources/img/list.svg';
import change from '../../resources/img/change.svg';
import del from '../../resources/img/del.svg';

import { api } from '../../resources/config';
import { LIST } from '../../resources/Routes';
import { defOrderCustomer, defResult, defOrderChange } from '../../resources/defaultObject';
import ModalResults from '../ModalResults/ModalResults';
import ModalCheque from '../ModalCheque/ModalCheque';
import ModalChangeOrder from '../ModalChangeOrder/ModalChangeOrder';
import Pagination from '../subComponents/Pagination/Pagination';

const Orders = () => {
    const [searchName, setSearchName] = useState('');
    const [orders, setOrders] = useState([]);
    const [activeList, setActiveList] = useState(LIST.all);
    useEffect(() => {
        getOrders();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const OrdersPerPage = 5;
    const lastOrdersIndex = currentPage * OrdersPerPage;
    const firstOrdersIndex = lastOrdersIndex - OrdersPerPage;
    const currentOrders = orders.slice(firstOrdersIndex, lastOrdersIndex);

    const paginate = page => {
        setCurrentPage(page);
    }
    const [modalCheque, setModalCheque] = useState(false);
    const [orderCustomer, setOrderCustomer] =  useState(defOrderCustomer);

    const [modalChange, setModalChange] = useState(false);
    const [orderChange, setOrderChange] = useState(defOrderChange);

    const [modalResult, setModalResult] = useState(false);
    const [result, setResult] =  useState(defResult);

    const regDate = /\d{4}(-)\d{2}\1\d{2}/;

    const formik = useFormik({
        initialValues: {
            dateAfter: '',
            dateBefore: ''
        },
        validationSchema: Yup.object({
            dateAfter: Yup.string().matches(regDate, 'Неверно введена дата').required('Введите дату'),
            dateBefore: Yup.string().required('Введите дату'),
        }),
        onSubmit: async () => {
            await api.post('/selectReport', {
                after: formik.values.dateAfter,
                before: formik.values.dateBefore
            }).then((data) => {
                console.log(data.data);
                setResult(data.data[0]);
                setModalResult(true);
            })
        }
    })

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

    const delOrder = async (id) => {
        const res = await api.post('/delete', {table: 'order', row: 'id_order', id: id});
        console.log(res.data);
        await getOrders();
    }

    const getOrderCustomer = async (id) => {
        const res = await api.post('/order', { id: id});
        console.log(res.data);
        setOrderCustomer(res.data[0]);
        setModalCheque(true);
    }

    const getOrderChange = async (id) => {
        const res = await api.post('/orderChange', { id: id})
        .then(res => {
            console.log(res.data[0]);
            setOrderChange(res.data[0]);
            setModalChange(true);
        })
        .catch(err => console.log(err))
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
                        {currentOrders.map((res) => (   
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
                                    {res.o_readiness.data[0] === 0 ? 'Нет' : 'Да'}
                                </td>
                                <td>
                                    {res.o_issuingOrder.data[0] === 0 ? 'Нет' : 'Да'}
                                </td>
                                <td>
                                    <Button mix='empty'
                                    onClick={() => getOrderCustomer(res.id_order)}>
                                        <img src={list} alt=''/>
                                    </Button>
                                    <Button mix='empty'
                                    onClick={() => getOrderChange(res.id_order)}>
                                        <img src={change} alt=''/>
                                    </Button>
                                    <Button mix='empty' 
                                    onClick={() => delOrder(res.id_order)}>
                                        <img src={del} alt=''/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className='table__pagination'>
                    <Pagination
                    totalOrders={orders.length} 
                    ordersPerPage={OrdersPerPage}
                    paginate={paginate} />
                </div>
            </div>
            <div className='orders__report'>
                <Button mix='prim' onClick={formik.handleSubmit}>
                    Составить отчет
                </Button>
                <div className='orders__report_input'>
                    <div>
                    <p>с</p>
                        <input className='orders__input'
                        placeholder='2023-01-01' 
                        name='dateAfter' type='text'
                        onChange={formik.handleChange} 
                        value={formik.values.dateAfter}
                        onBlur={formik.handleBlur}/>
                    </div>
                    {formik.touched.dateAfter && formik.errors.dateAfter ? <div className='orders__input_error'>{formik.errors.dateAfter}</div> : null}
                </div>
                <div className='orders__report_input'>
                    <div>
                    <p>по</p>
                        <input className='orders__input'
                        placeholder='2023-02-01'
                        name='dateBefore' type='text'
                        onChange={formik.handleChange} 
                        value={formik.values.dateBefore}
                        onBlur={formik.handleBlur}/>
                    </div>
                    {formik.touched.dateBefore && formik.errors.dateBefore ? <div className='orders__input_error'>{formik.errors.dateBefore}</div> : null}
                </div>
            </div>
            <div className={`orders__modal ${modalResult ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModalResult(false)}>
                <ModalResults close={() => setModalResult(false)}
                    content={(e) => e.stopPropagation()}
                    dateAfter={formik.values.dateAfter} 
                    dateBefore={formik.values.dateBefore}
                    totalOrders={result.totalOrders}
                    totalPrice={result.totalPrice}
                    totalImages={result.totalImages}/>
            </div>
            <div className={`orders__modal ${modalCheque ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModalCheque(false)}>
                    <ModalCheque close={() => setModalCheque(false)}
                        content={(e) => e.stopPropagation()}
                        id_order={orderCustomer.id_order}
                        c_fio={orderCustomer.c_fio}
                        c_telephone={orderCustomer.c_telephone}
                        cheque_id={orderCustomer.cheque_id}
                        s_name={orderCustomer.s_name}
                        r_name={orderCustomer.r_name}
                        сh_price={orderCustomer.сh_price}
                        o_dataOrder={orderCustomer.o_dataOrder.slice(0, 10) + " " + orderCustomer.o_dataOrder.slice(12, 19)}
                        o_dateCompletion={orderCustomer.o_dateCompletion.slice(0, 10) + " " + orderCustomer.o_dateCompletion.slice(12, 19)}
                        o_readiness={orderCustomer.o_readiness.data[0] === 0 ? 'Нет' : 'Да'}
                        o_issuingOrder={orderCustomer.o_issuingOrder.data[0] === 0 ? 'Нет' : 'Да'}
                        />
            </div>
            <div className={`orders__modal ${modalChange ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModalChange(false)}>
                    <ModalChangeOrder close={() => setModalChange(false)}
                        content={(e) => e.stopPropagation()}
                        getOrders={getOrders}
                        id_order={orderChange.id_order}
                        c_fio={orderChange.c_fio}
                        o_dataOrder={orderChange.o_dataOrder.slice(0, 10) + " " + orderChange.o_dataOrder.slice(12, 19)}
                        o_dateCompletion={orderChange.o_dateCompletion.slice(0, 10) + " " + orderChange.o_dateCompletion.slice(12, 19)}
                        o_readiness={orderChange.o_readiness.data[0]}
                        o_issuingOrder={orderChange.o_issuingOrder.data[0]}
                        />
            </div>
        </div>
    );
};

export default Orders;