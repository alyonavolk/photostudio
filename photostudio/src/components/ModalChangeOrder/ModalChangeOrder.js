import { useEffect, useState } from 'react';
import './modalChangeOrder.scss';
import Button from '../subComponents/Button/Button';

import { api } from '../../resources/config';
import { defOrderChange } from '../../resources/defaultObject';
import { MODAL } from '../../resources/Routes';

const ModalChangeOrder = ({close, content, id, modal, getOrders}) => {
    const [orderChange, setOrderChange] = useState(defOrderChange);

    const [selectReadiness, setSelectReadiness] = useState(0);
    const [selectIssuing, setSelectIssuing] = useState(0);

    useEffect(() => {
        modal === MODAL.change ? getOrderChange(id) : console.log();
    }, [modal, id]);

    const getOrderChange = async (id) => {
        await api.post('/orderChange', { id: id})
        .then(res => {
            console.log(res.data[0]);
            setOrderChange(res.data[0]);
            setSelectReadiness(0);
            setSelectIssuing(0);
        })
        .catch(err => console.log(err))
    }

    const updateOrder = async () => {
        await api.post('/change', { id: id, readiness: selectReadiness, issuing: selectIssuing })
        .then(res => console.log('update res: ', res.data));
        close();
        await getOrders();
    }

    return (
        <div className='modalChange' onClick={content}>
            <div className='modalChange__header'>
                <h3>Номер заказа: {orderChange.id_order}</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalChange__content'>
                <p>ID чека: <span>{orderChange.cheque_id}</span></p>
                <p>ФИО заказчика: <span>{orderChange.c_fio}</span></p>
                <p>Дата заказа: 
                    <span>{orderChange.o_dataOrder.slice(0, 10) 
                    + " " +
                    new Date(orderChange.o_dataOrder).toLocaleTimeString()}</span>
                </p>
                <p>Дата выполнения: 
                    <span>{orderChange.o_dateCompletion.slice(0, 10) 
                    + " " + 
                    new Date(orderChange.o_dataOrder).toLocaleTimeString()}</span>
                </p>
                <p>Готовность: </p>
                <select className='modalChange__select' value={selectReadiness} onChange={(e) => setSelectReadiness(e.target.value)} >
                    <option value={0}>Нет</option>
                    <option value={1}>Да</option>
                </select>
                <p>Выдача заказа: </p>
                <select className='modalChange__select' value={selectIssuing} onChange={(e) => setSelectIssuing(e.target.value)} >
                    <option value={0}>Нет</option>
                    <option value={1}>Да</option>
                </select>
                <div>
                    <Button mix='prim' onClick={updateOrder}>Изменить</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalChangeOrder;