import './button.scss';

const Button = ({onClick, children, mix, type}) => {
    return (
        <button onClick={onClick} className={`btn btn__${mix}`} type={type}>
            {children}
        </button>
    );
};

export default Button;