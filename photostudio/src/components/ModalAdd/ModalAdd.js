import './modalAdd.scss';

import Button from '../subComponents/Button/Button';

const ModalAdd = ({close, content, formik, table, ...props}) => {

    return (
        <div className='modalAdd' onClick={content}>
            <div className='modalAdd__header'>
                <h3>Добавить</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalAdd__content'>
                <div className='modalAddRow__input'>
                    <div>
                        <p>{props.titleOne}</p>
                            <input className='orders__input'
                            placeholder={props.placeholderOne}
                            name={props.nameOne} type='text'
                            onChange={formik.handleChange} 
                            value={props.valueOne}
                            onBlur={formik.handleBlur}/>
                        </div>
                        {props.touchedOne && props.errorsOne ? <div className='modalAddRow__input_error'>{props.errorsOne}</div> : null}
                </div>
                
                { table === 'services' ? <div className='modalAddRow__input'>
                    <div>
                        <p>Стоимость услуги:</p>
                            <input className='orders__input'
                            placeholder='5000'
                            name='price' type='text'
                            onChange={formik.handleChange} 
                            value={formik.values.price}
                            onBlur={formik.handleBlur}/>
                        </div>
                        {formik.touched.price && formik.errors.price ? <div className='modalAddRow__input_error'>{formik.errors.price}</div> : null}
                </div> : ''}
                <div className='modalAddRow__input'>
                    <div>
                        <p>{props.titleTwo}</p>
                            <input className='orders__input'
                            placeholder={props.placeholderTwo}
                            name={props.nameTwo} type='text'
                            onChange={formik.handleChange} 
                            value={props.valueTwo}
                            onBlur={formik.handleBlur}/>
                        </div>
                        {props.touchedTwo && props.errorsTwo ? <div className='modalAddRow__input_error'>{props.errorsTwo}</div> : null}
                    </div>
                    <div className='modalAddRow__content_btn'>
                        <Button type='submit' mix='prim' onClick={formik.handleSubmit}>Добавить</Button>
                    </div>
                </div>
        </div>
    );
};

export default ModalAdd;