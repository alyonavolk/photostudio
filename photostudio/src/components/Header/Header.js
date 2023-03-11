import { NavLink } from 'react-router-dom';
import './header.scss';

import { ROUTES } from '../../resources/Routes';

const Header = () => {
    return (
        <div className='header'>
            <div className='header__logo'>Фотоателье</div>
            <nav className='header__nav'>
                <ul className='header__links'>
                    <li>
                        <NavLink className='header__link' 
                        activeClassName='header__link_active' 
                        exact to={ROUTES.orders}>Заказы</NavLink>
                    </li>
                    <li>
                        <NavLink className='header__link' 
                        activeClassName='header__link_active' 
                        exact to={ROUTES.customer}>Заказчики</NavLink>
                    </li>
                    <li>
                        <NavLink className='header__link' 
                        activeClassName='header__link_active' 
                        exact to={ROUTES.typeServices}>Виды услуг</NavLink>
                    </li>
                    <li>
                        <NavLink className='header__link' 
                        activeClassName='header__link_active' 
                        exact to={ROUTES.cheque}>Чеки</NavLink>
                    </li>
                    <li>
                        <NavLink className='header__link' 
                        activeClassName='header__link_active' 
                        exact to={ROUTES.rate}>Тарифы</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;