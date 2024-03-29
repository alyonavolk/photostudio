import { useState, useEffect } from 'react';
import './typeServices.scss';
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
    const [services, setServices] = useState([]);
    const [modal, setModal] = useState();
    const [remove, setRemove] = useState({del: false, id: 0});

    const [currentPage, setCurrentPage] = useState(1);
    const ServicesPerPage = 7;
    const lastServicesIndex = currentPage * ServicesPerPage;
    const firstServicesIndex = lastServicesIndex - ServicesPerPage;
    const currentServices= services.slice(firstServicesIndex, lastServicesIndex);

    const paginate = page => {
        setCurrentPage(page);
    }

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        const res = await api.get('/typeServices');
        console.log(res.data);
        setServices(res.data);
    }

    const delServices = async () => {
        remove.del && await api.post('/delete', {table: 'typeservices', row: 'id_services', id: remove.id})
        .then(() => {
            setModal(MODAL.none);
            setRemove({del: false, id: 0});
        })
        await getServices();
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            images: ''
        },
        validationSchema: Yup.object({
            name: Yup.string('Введите строку').required('Введите название услуги'),
            price: Yup.number('Введите число').positive('Введите положительное число').integer('Введите целое число').required('Введите цену услуги'),
            images: Yup.number('Введите число').positive('Введите положительное число').integer('Введите целое число').required('Введите количество снимков')
        }),
        onSubmit: async () => {
            await api.post('/addTypeServices', {
                name: formik.values.name,
                price: formik.values.price,
                numberImages: formik.values.images
            }).then((res) => {
                console.log(res.data);
            });
            formik.values.images = '';
            formik.values.name = '';
            formik.values.price = '';
            setModal(MODAL.none);
            await getServices();
        } 
    })


    return (
        <div className='services'>
            <h2 className='services__title'>
                Виды услуг
            </h2>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='services__row_name'>Название услуги</th>
                            <th className='services__row_price'>Стоимость</th>
                            <th className='services__row_price'>Количество снимков</th>
                            <th className='services__row_last' 
                            onClick={() => setModal(MODAL.add)} >
                                +
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentServices.map((res) => (   
                            <tr key={res.id_services} className='clientTable'>
                                <td>
                                    {res.id_services}
                                </td>
                                <td className='services__row_name'>
                                    {res.s_name}
                                </td>
                                <td className='services__row_price'>
                                    {res.s_price}
                                </td>
                                <td className='services__row_price'>
                                    {res.s_numberImages}
                                </td>
                                <td>
                                    <Button mix='empty' 
                                    onClick={() => {setRemove({del: true, id: res.id_services}); 
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
                    totalOrders={services.length} 
                    ordersPerPage={ServicesPerPage}
                    paginate={paginate} />
                </div>
            </div>
            <div className={`orders__modal ${modal === MODAL.add ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <ModalAdd close={() => setModal(MODAL.none)} 
                        content={(e) => e.stopPropagation()}
                        table='services'
                        formik={formik}
                        titleOne='Вид услуги:' titleTwo='Количество снимков:'
                        placeholderOne='Услуга' placeholderTwo='20'
                        nameOne='name' nameTwo='images'
                        valueOne={formik.values.name} valueTwo={formik.values.images}
                        touchedOne={formik.touched.name} touchedTwo={formik.touched.images}
                        errorsOne={formik.errors.name} errorsTwo={formik.errors.images}
                        />
            </div>
            <div className={`orders__modal ${modal === MODAL.delete ? 'orders__modal_active' : 'orders__modal_close'}`} 
                onClick={() => setModal(MODAL.none)}>
                    <Delete yes={delServices} no={() => setModal(MODAL.none)} 
                    content={(e) => e.stopPropagation()} />
            </div>
        </div>
    );
};

export default Customers;