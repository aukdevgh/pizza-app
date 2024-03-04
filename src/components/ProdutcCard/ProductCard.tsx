import { MouseEvent } from 'react';
import { IProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartAction } from '../../store/cart.slice';

function ProductCard(props: IProductCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartAction.add(props.id));
    };

    return (
        <Link to={`/product/${props.id}`} className={styles.link}>
            <div className={styles.card}>
                <div
                    className={styles.head}
                    style={{ backgroundImage: `url('${props.image}')` }}
                >
                    <div className={styles.price}>
                        {props.price}&nbsp;
                        <span className={styles.currency}>&#8381;</span>
                    </div>
                    <button className={styles.add} onClick={add}>
                        <img src="/cart-button-icon.svg" alt="add to cart" />
                    </button>
                    <div className={styles.rating}>
                        {props.rating}&nbsp;
                        <img src="/star-icon.svg" alt="star icon" />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.title}>{props.name}</div>
                    <div className={styles.description}>
                        {props.description}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
