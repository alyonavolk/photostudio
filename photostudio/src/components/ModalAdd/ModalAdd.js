import { useState, useEffect } from 'react';
import './modalAdd.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../subComponents/Button/Button';

import { api } from '../../resources/config';
import { MODAL } from '../../resources/Routes';

const ModalAdd = ({close, content}) => {
    return (
        <div className='modalAdd' onClick={content}>
            <div className='modalAdd__header'>
                <h3>Добавить</h3>
                <Button mix='empty' onClick={close}>
                    &#10008;
                </Button>
            </div>
            <div className='modalAdd__content'>

            </div>
        </div>
    );
};

export default ModalAdd;