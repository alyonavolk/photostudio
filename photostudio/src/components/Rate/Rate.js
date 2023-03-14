import { useState, useEffect } from 'react';
import './rate.scss';       
import { useFormik } from 'formik';
import * as Yup from 'yup';

import del from '../../resources/img/del.svg';

import { api } from '../../resources/config';
import { MODAL } from '../../resources/Routes';
import Pagination from '../subComponents/Pagination/Pagination';
import Button from '../subComponents/Button/Button';
import ModalAdd from '../ModalAdd/ModalAdd';
import Delete from '../subComponents/Delete/Delete';

const Customers = () => {
    const [rate, setRate] = useState([]);
    const [modal, setModal] = useState();
    const [remove, setRemove] = useState({del: false, id: 0});

    const [currentPage, setCurrentPage] = useState(1);
    const RatePerPage = 7;
    const lastRateIndex = currentPage * RatePerPage;
    const firstRateIndex = lastRateIndex - RatePerPage;
    const currentRate = rate.slice(firstRateIndex, lastRateIndex);

    const paginate = page => {
        setCurrentPage(page);
    }

    useEffect(() => {
        getRate();
    }, []);

    const getRate = async () => {
        const res = await api.get('/rate');
        console.log(res.data);
        setRate(res.data);
    }

    const delRate = async () => {
        remove.del && await api.post('/delete', {table: 'rate', row: 'id_rate', id: remove.id})
        .then(() => {
            setModal(MODAL.none);
            setRemove({del: false, id: 0});
            console.log(remove);
        })
        await getRate();
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            premium: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Введите название тарифа'),
            premium: Yup.number('Введите число').negative('Введите положительное число').integer('Введите целое число').required('Введите надбавку за тариф').min(0, 'Надбавка не может быть меньше 0').max(100, 'Надбавка не может быть больше 100%')
        }),
        onSubmit: async () => {
            await api.post('/addRate', {
                name: formik.values.name,
                premium: formik.values.premium/100
            }).then((res) => {
                console.log(res.data);
            });
            formik.values.name = '';
            formik.values.premium = '';
            setModal(MODAL.none);
            await getRate();
        } 
    })


    return (
        <div className='rate'>
            <h2 className='rate__title'>
                Заказы
            </h2>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='rate__row_fio'>Тариф</th>
                            <th className='rate__row_tel'>Надбавка</th>
                            <th className='rate__row_last' 
                            onClick={() => setModal(MODAL.add)} >
                                +
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRate.map((res) => (   
                            <tr key={res.id_rate} className='clientTable'>
                                <td>
                                    {res.id_rate}
                                </td>
                                <td>
                                    {res.r_name}
                                </td>
                                <td>
                                    {res.r_premium * 100} %
                                </td>
                                <td>
                                    <Button mix='empty' 
                                    onClick={() => {setRemove({del: true, id: res.id_rate}); 
                                    setModal(MODAL.delete)}}>
                                        <img src={del} alt=''/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='table__pagination'>
                    <Pagination
                    totalOrders={rate.length} 
                    ordersPerPage={RatePerPage}
                    paginate={paginate} />
                </div>
            </div>
            <div className={`orders__modal ${modal === MODAL.add ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <ModalAdd close={() => setModal(MODAL.none)} 
                        table='customer'
                        content={(e) => e.stopPropagation()}
                        formik={formik}
                        titleOne='Тариф:' titleTwo='Надбавка (%):'
                        placeholderOne='срочный' placeholderTwo='20'
                        nameOne='name' nameTwo='premium'
                        valueOne={formik.values.name} valueTwo={formik.values.premium}
                        touchedOne={formik.touched.name} touchedTwo={formik.touched.premium}
                        errorsOne={formik.errors.name} errorsTwo={formik.errors.premium}
                    />
            </div>
            <div className={`orders__modal ${modal === MODAL.delete ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <Delete yes={delRate} no={() => setModal(MODAL.none)} 
                    content={(e) => e.stopPropagation()} />
            </div>
        </div>
    );
};

export default Customers;