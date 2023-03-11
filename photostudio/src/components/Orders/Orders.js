import { useState, useEffect } from 'react';
import './orders.scss';

const Orders = () => {
    const [searchName, setSearchName] = useState();


    return (
        <div className='orders'>
            <h2 className='orders__title'>
                Заказы
            </h2>
            <div className='orders__query'>
                <ul className='orders__list'>
                    <li>Все</li>
                    <li>Готовые</li>
                    <li>На текущие сутки</li>
                    <li>По дате выполнения</li>
                </ul>
                <div>
                    <input className='orders__input'
                    placeholder='Поиск заказчика' 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)}/>
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
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;