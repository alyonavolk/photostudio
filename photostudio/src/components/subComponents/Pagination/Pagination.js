import { useState } from 'react';
import Button from '../Button/Button';
import './pagination.scss';

const Pagination = ({ordersPerPage, totalOrders, paginate}) => {
    const pageNumber = [];
    const [active, setActive] = useState(false);

    for (let i = 1; i <= Math.ceil(totalOrders/ordersPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className='pagination'>
            {
                pageNumber.map((res) => (
                    <Button key={res} mix={`prim`} onClick={() => {paginate(res)}}>
                        {res}
                    </Button>
                ))
            }
        </div>
    );
};

export default Pagination;