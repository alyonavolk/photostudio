import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './orders.scss';
import Button from '../subComponents/Button/Button';

import list from '../../resources/img/list.svg';
import change from '../../resources/img/change.svg';
import del from '../../resources/img/del.svg';

import { api } from '../../resources/config';
import { LIST, MODAL } from '../../resources/Routes';
import ModalResults from '../ModalResults/ModalResults';
import ModalCheque from '../ModalCheque/ModalCheque';
import ModalChangeOrder from '../ModalChangeOrder/ModalChangeOrder';
import ModalAddRow from '../ModalAddRow/ModalAddRow';
import Pagination from '../subComponents/Pagination/Pagination';

const Orders = () => {
    const [searchName, setSearchName] = useState('');
    const [orders, setOrders] = useState([]);
    const [activeList, setActiveList] = useState(LIST.all);

    useEffect(() => {
        getOrders();
    }, []);


    const [id, setId] = useState(0);
    const [modal, setModal] = useState(MODAL.none);

    const [currentPage, setCurrentPage] = useState(1);
    const OrdersPerPage = 5;
    const lastOrdersIndex = currentPage * OrdersPerPage;
    const firstOrdersIndex = lastOrdersIndex - OrdersPerPage;
    const currentOrders = orders.slice(firstOrdersIndex, lastOrdersIndex);

    const paginate = page => {
        setCurrentPage(page);
    }

    const regDate = /\d{4}(-)\d{2}\1\d{2}/;

    const formik = useFormik({
        initialValues: {
            dateAfter: '',
            dateBefore: ''
        },
        validationSchema: Yup.object({
            dateAfter: Yup.string().matches(regDate, 'Неверно введена дата').required('Введите дату'),
            dateBefore: Yup.string().matches(regDate, 'Неверно введена дата').required('Введите дату'),
        }),
        onSubmit: () => setModal(MODAL.result)
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
                            <th className='table__row_id'>ID Чека</th>
                            <th className='table__row_customer'>ФИО Заказчика</th>
                            <th className='table__row_date'>Дата заказа</th>
                            <th>Дата выполнения</th>
                            <th>Готовность</th>
                            <th>Выдача заказа</th>
                            <th onClick={() => setModal(MODAL.addOrder)} >
                                +
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((res) => (   
                            <tr key={res.id_order} className='clientTable'>
                                <td>
                                    {res.id_order}
                                </td>
                                <td className='table__row_id'>
                                    {res.cheque_id}
                                </td>
                                <td className='table__row_customer'>
                                    {res.c_fio}
                                </td>
                                <td className='table__row_date'>
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
                                    onClick={() => { setId(res.id_order); setModal(MODAL.cheque) }}>
                                        <img src={list} alt=''/>
                                    </Button>
                                    <Button mix='empty'
                                    onClick={() => {setId(res.id_order); setModal(MODAL.change)}}>
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
                <Button type='submit' mix='prim' onClick={formik.handleSubmit}>
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
            <div className={`orders__modal ${modal === MODAL.result ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                <ModalResults close={() => setModal(MODAL.none)}
                    content={(e) => e.stopPropagation()}
                    dateAfter={formik.values.dateAfter} 
                    dateBefore={formik.values.dateBefore}
                    modal={modal}
                    />
            </div>
            <div className={`orders__modal ${modal === MODAL.cheque ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <ModalCheque close={() => setModal(MODAL.none)}
                        content={(e) => e.stopPropagation()}
                        id={id} modal={modal}
                        />
            </div>
            <div className={`orders__modal ${modal === MODAL.change ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <ModalChangeOrder close={() => setModal(MODAL.none)}
                        content={(e) => e.stopPropagation()}
                        id={id} modal={modal}
                        getOrders={getOrders}
                        />
            </div>
            <div className={`orders__modal ${modal === MODAL.addOrder ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <ModalAddRow close={() => setModal(MODAL.none)}
                        content={(e) => e.stopPropagation()}
                        modal={modal} getOrders={getOrders}
                        />
            </div>
        </div>
    );
};

export default Orders;