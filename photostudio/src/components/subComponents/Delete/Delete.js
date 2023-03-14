import './delete.scss';
import Button from '../Button/Button';

const Delete = ({yes, no, content}) => {
    return (
        <div className='modalDelete' onClick={content}>
            <div className='modalDelete__header'>
                <h3>Удалить запись?</h3>
            </div>
            <div className='modalDelete__content'>
                <Button mix='prim' onClick={yes}>
                    Да
                </Button>
                <Button mix='prim' onClick={no}>
                    Нет
                </Button>
            </div>
        </div>
    );
};

export default Delete;