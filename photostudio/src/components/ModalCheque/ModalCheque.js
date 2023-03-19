import { useState, useEffect } from 'react';
import './modalCheque.scss';
import Button from '../subComponents/Button/Button';

import { api } from '../../resources/config';
import { defOrderCustomer } from '../../resources/defaultObject';
import { MODAL } from '../../resources/Routes';

const ModalCheque = ({close, content, modal, id}) => {
    const [orderCustomer, setOrderCustomer] =  useState(defOrderCustomer);

    useEffect(() => {
        modal === MODAL.cheque ? getOrderCustomer(id) : console.log();
    }, [modal, id]);

    const getOrderCustomer = async (id) => {
        await api.post('/order', { id: id})
        .then(res => {
            setOrderCustomer(res.data[0]);
            console.log(res.data[0]);
        });
    }

    return (
        <div className='modalCheque' onClick={content}>
            <div className='modalCheque__header'>
                <h3>Номер заказа: {orderCustomer.id_order}</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalCheque__content'>
                <p>ФИО заказчика: <span>{orderCustomer.c_fio}</span></p>
                <p>Номер телефона: <span>{orderCustomer.c_telephone}</span></p>
                <p>ID чека: <span>{orderCustomer.cheque_id}</span></p>
                <p>Вид услуги: <span>{orderCustomer.s_name}</span></p>
                <p>Тариф: <span>{orderCustomer.r_name}</span></p>
                <p>Общая стоимость: <span>{orderCustomer.сh_price} руб.</span></p>
                <p>Дата заказа: 
                    <span>{orderCustomer.o_dataOrder.slice(0, 10) 
                    + " " + 
                    new Date(orderCustomer.o_dataOrder).toLocaleTimeString()}</span>
                </p>
                <p>Дата выполнения: 
                    <span>{orderCustomer.o_dateCompletion.slice(0, 10) 
                    + " " + 
                    new Date(orderCustomer.o_dateCompletion).toLocaleTimeString()}</span>
                </p>
                <p>Готовность: 
                    <span>{orderCustomer.o_readiness.data[0] === 0 ? 'Нет' : 'Да'}</span>
                </p>
                <p>Выдача заказа: 
                    <span>{orderCustomer.o_issuingOrder.data[0] === 0 ? 'Нет' : 'Да'}</span>
                </p>
            </div>
        </div>
    );
};

export default ModalCheque;