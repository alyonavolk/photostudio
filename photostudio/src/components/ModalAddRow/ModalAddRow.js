import { useState, useEffect } from 'react';
import './modalAddRow.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../subComponents/Button/Button';

import { api } from '../../resources/config';
import { MODAL } from '../../resources/Routes';

const ModalAddRow = ({close, content, modal, getOrders}) => {
    const [customer, setCustomer] = useState([]);
    const [services, setServices] = useState([]);
    const [rate, setRate] = useState([]);

    const [selectCustomer, setSelectCustomer] = useState(0);
    const [selectServices, setSelectServices] = useState(0);
    const [selectRate, setSelectRate] = useState(0);

    useEffect(() => {
        if (modal === MODAL.addOrder) {
            getCustomer();
            getRate();
            getServices();
        }
    }, [modal]);

    const regDate = /((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))\s([01][0-9]|2[0-3]):([012345][0-9]))/;

    const formik = useFormik({
        initialValues: {
            dateCompletion: ''
        },
        validationSchema: Yup.object({
            dateCompletion: Yup.string()
            .matches(regDate, 'Неверно введена дата')
            .length(16, 'Неверно введена дата')
            .required('Введите дату')
        }),
        onSubmit: async () => {
            if (selectCustomer !== 0 && selectRate !== 0 && selectServices !== 0) {
                await api.post('/addOrder', {
                    services: selectServices,
                    rate: selectRate,
                    customer: selectCustomer,
                    dateCompletion: formik.values.dateCompletion
                }).then((res) => {
                    console.log(res.data);
                });
                close();
                await getOrders();
            }
        } 
    })

    const getCustomer = async () => {
        const res = await api.get('/customers');
        console.log(res.data);
        setCustomer(res.data);
    }

    const getRate = async () => {
        const res = await api.get('/rate');
        console.log(res.data);
        setRate(res.data);
    }

    const getServices = async () => {
        const res = await api.get('/typeServices');
        console.log(res.data);
        setServices(res.data);
    }

    return (
        <div className='modalAddRow' onClick={content}>
            <div className='modalAddRow__header'>
                <h3>Добавить</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalAddRow__content'>
                <p>Заказчик</p>
                <select className='modalChange__select' value={selectCustomer} onChange={(e) => setSelectCustomer(e.target.value)} >
                    <option className='modalChange__select_notActive' value={0}>Выберите заказчика</option>
                    {customer.map( data => (
                        <option key={data.id_customer} value={data.id_customer}>{data.c_fio}</option>
                    ))}
                </select>
                <p>Вид услуги</p>
                <select className='modalChange__select' value={selectServices} onChange={(e) => setSelectServices(e.target.value)} >
                    <option className='modalChange__select_notActive' value={0}>Выберите услугу</option>
                    {services.map( data => (
                        <option key={data.id_services} value={data.id_services}>{data.s_name}</option>
                    ))}
                </select>
                <p>Тариф</p>
                <select className='modalChange__select' value={selectRate} onChange={(e) => setSelectRate(e.target.value)} >
                    <option className='modalChange__select_notActive' value={0}>Выберите тариф</option>
                    {rate.map( data => (
                        <option key={data.id_rate} value={data.id_rate}>{data.r_name}</option>
                    ))}
                </select>
                <div className='modalAddRow__input'>
                    <div>
                    <p>Дата выполнения:</p>
                        <input className='orders__input'
                        placeholder='2023-02-01 12:00'
                        name='dateCompletion' type='text'
                        onChange={formik.handleChange} 
                        value={formik.values.dateCompletion}
                        onBlur={formik.handleBlur}/>
                    </div>
                    {formik.touched.dateCompletion && formik.errors.dateCompletion? <div className='modalAddRow__input_error'>{formik.errors.dateCompletion}</div> : null}
                </div>
                <div className='modalAddRow__content_btn'>
                    <Button type='submit' mix='prim' onClick={formik.handleSubmit}>Добавить</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddRow;