import './modalResults.scss';
import Button from '../subComponents/Button/Button';

const ModalResults = ({close, content, dateAfter, dateBefore, totalOrders, totalPrice, totalImages}) => {
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
                <p>Всего заказов поступило: {totalOrders}</p>
                <p>Отпечатано снимков: {totalPrice === null ? '0' : totalPrice}</p>
                <p>Общая сумма заказа: {totalImages === null ? '0' : totalImages}</p>
            </div>
        </div>
    );
};

export default ModalResults;