import { useState, useEffect } from 'react';
import './customers.scss';
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
    const [customers, setCustomers] = useState([]);
    const [modal, setModal] = useState();
    const [remove, setRemove] = useState({del: false, id: 0});

    const [currentPage, setCurrentPage] = useState(1);
    const CustomersPerPage = 7;
    const lastCustomersIndex = currentPage * CustomersPerPage;
    const firstCustomersIndex = lastCustomersIndex - CustomersPerPage;
    const currentCustomers = customers.slice(firstCustomersIndex, lastCustomersIndex);

    const paginate = page => {
        setCurrentPage(page);
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        const res = await api.get('/customers');
        console.log(res.data);
        setCustomers(res.data);
    }

    const delCustomer = async () => {
        remove.del && await api.post('/delete', {table: 'customer', row: 'id_customer', id: remove.id})
        .then(() => {
            setModal(MODAL.none);
            setRemove({del: false, id: 0});
            console.log(remove);
        })
        await getCustomers();
    }

    const phoneReg = /^([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;

    const formik = useFormik({
        initialValues: {
            fio: '',
            tel: ''
        },
        validationSchema: Yup.object({
            fio: Yup.string().required('Введите ФИО заказчика'),
            tel: Yup.string().matches(phoneReg, 'Неверный номер телефона').required('Введите номер телефона')
        }),
        onSubmit: async () => {
            await api.post('/addCustomer', {
                name: formik.values.fio,
                telephone: formik.values.tel
            }).then((res) => {
                console.log(res.data);
            });
            formik.values.fio = '';
            formik.values.tel = '';
            setModal(MODAL.none);
            await getCustomers();
        } 
    })


    return (
        <div className='customer'>
            <h2 className='customer__title'>
                Заказчики
            </h2>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='customer__row_fio'>ФИО заказчика</th>
                            <th className='customer__row_tel'>Телефон заказчика</th>
                            <th className='customer__row_last' 
                            onClick={() => setModal(MODAL.add)} >
                                +
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((res) => (   
                            <tr key={res.id_customer} className='clientTable'>
                                <td>
                                    {res.id_customer}
                                </td>
                                <td>
                                    {res.c_fio}
                                </td>
                                <td>
                                    {res.c_telephone}
                                </td>
                                <td className='customer__row_btn'>
                                    <Button mix='empty' 
                                    onClick={() => {setRemove({del: true, id: res.id_customer}); 
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
                    totalOrders={customers.length} 
                    ordersPerPage={CustomersPerPage}
                    paginate={paginate} />
                </div>
            </div>
            <div className={`orders__modal ${modal === MODAL.add ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <ModalAdd close={() => setModal(MODAL.none)} 
                        table='customer'
                        content={(e) => e.stopPropagation()}
                        formik={formik}
                        titleOne='ФИО заказчика:' titleTwo='Номер телефона заказчика:'
                        placeholderOne='Иванов Иван Иванонич' placeholderTwo='7(999)999-99-99'
                        nameOne='fio' nameTwo='tel'
                        valueOne={formik.values.fio} valueTwo={formik.values.tel}
                        touchedOne={formik.touched.fio} touchedTwo={formik.touched.tel}
                        errorsOne={formik.errors.fio} errorsTwo={formik.errors.tel}
                    />
            </div>
            <div className={`orders__modal ${modal === MODAL.delete ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <Delete yes={delCustomer} no={() => setModal(MODAL.none)} 
                    content={(e) => e.stopPropagation()} />
            </div>
        </div>
    );
};

export default Customers;