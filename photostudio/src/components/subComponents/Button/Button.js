import './button.scss';

const Button = ({onClick, children, mix}) => {
    return (
        <button onClick={onClick} className={`btn btn__${mix}`}>
            {children}
        </button>
    );
};

export default Button;