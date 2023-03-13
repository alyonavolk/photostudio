import './modalChangeOrder.scss';
import Button from '../subComponents/Button/Button';
import { useState } from 'react';

import { api } from '../../resources/config'

const ModalChangeOrder = ({close, content, getOrders, ...data}) => {
    // const [selectReadiness, setSelectReadiness] = useState(data.o_readiness);
    // const [selectIssuing, setSelectIssuing] = useState(data.o_issuingOrder);
    const [selectReadiness, setSelectReadiness] = useState(0);
    const [selectIssuing, setSelectIssuing] = useState(0);

    const updateOrder = async () => {
        const res = await api.post('/change', { id: data.id_order, readiness: selectReadiness, issuing: selectIssuing });
        console.log(res.data);
        close();
        await getOrders();
    }

    return (
        <div className='modalChange' onClick={content}>
            <div className='modalChange__header'>
                <h3>Номер заказа: </h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalChange__content'>
                <p>ID чека: {data.id_order}</p>
                <p>ФИО заказчика: {data.c_fio}</p>
                <p>Дата заказа: {data.o_dataOrder}</p>
                <p>Дата выполнения: {data.o_dateCompletion}</p>
                <p>Готовность: </p>
                <select className='modalChange__select' value={selectReadiness} onChange={(e) => setSelectReadiness(e.target.value)} >
                    <option value={0}>Нет</option>
                    <option value={1}>Да</option>
                </select>
                {console.log(selectReadiness)}
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