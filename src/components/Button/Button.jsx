import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={css.Button} type="button">
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
