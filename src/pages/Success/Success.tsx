import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

function Success() {
    const navigate = useNavigate();

    return (
        <div className={styles.success}>
            <img className={styles.image} src="/pizza.png" alt="pizza image" />
            <div className={styles.text}>Ваш заказ успешно оформлен!</div>
            <Button appearence="big" onClick={() => navigate('/')}>
                Сделать новый
            </Button>
        </div>
    );
}

export default Success;
