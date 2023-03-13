import { useState, useEffect } from 'react';
import './modalResults.scss';
import Button from '../subComponents/Button/Button';

import { api } from '../../resources/config';
import { defResult } from '../../resources/defaultObject';
import { MODAL } from '../../resources/Routes';

const ModalResults = ({close, content, dateAfter, dateBefore, modal}) => {
    const [result, setResult] =  useState(defResult);

    useEffect(() => {
        modal === MODAL.result ? selectReport() : console.log();
    }, [modal]);

    const selectReport = async () => {
        await api.post('/selectReport', {
            after: dateAfter,
            before: dateBefore
        }).then((res) => {
            console.log(res.data);
            setResult(res.data[0]);
        });
    }

    return (
        <div className='modalResults' onClick={content}>
            <div className='modalResults__header'>
                <h3>Отчет</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalResults__content'>
                <div className='modalResults__content_date'>
                    <p>c {dateAfter}</p>
                    <p>по {dateBefore}</p>
                </div>
                <p>Всего заказов поступило: <span>{result.totalOrders}</span></p>
                <p>Отпечатано снимков: <span>{result.totalImages === null ? '0' : result.totalImages}</span></p>
                <p>Общая сумма заказа: <span>{result.totalPrice === null ? '0' : result.totalPrice} руб.</span></p>
            </div>
        </div>
    );
};

export default ModalResults;