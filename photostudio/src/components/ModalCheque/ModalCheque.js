import './modalCheque.scss';
import Button from '../subComponents/Button/Button';

const ModalCheque = ({close, content, ...data}) => {
    return (
        <div className='modalCheque' onClick={content}>
            <div className='modalCheque__header'>
                <h3>Номер заказа: {data.id_order}</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalCheque__content'>
                <p>ФИО заказчика: {data.c_fio}</p>
                <p>Номер телефона: {data.c_telephone}</p>
                <p>ID чека: {data.cheque_id}</p>
                <p>Вид услуги: {data.s_name}</p>
                <p>Тариф: {data.r_name}</p>
                <p>Общая стоимость: {data.сh_price} руб.</p>
                <p>
                    Дата заказа: {data.o_dataOrder}
                </p>
                <p>Дата выполнения: {data.o_dateCompletion}</p>
                <p>Готовность: {data.o_readiness}</p>
                <p>Выдача заказа: {data.o_issuingOrder}</p>
            </div>
        </div>
    );
};

export default ModalCheque;