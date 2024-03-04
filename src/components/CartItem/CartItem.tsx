import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { AppDispatch } from '../../store/store';
import { ICartItemProps } from './CartItem.props';
import { cartAction } from '../../store/cart.slice';
import styles from './CartItem.module.css';

function CartItem(props: ICartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const add = () => {
        dispatch(cartAction.add(props.id));
    };
    const remove = () => {
        dispatch(cartAction.remove(props.id));
    };
    const deleteItem = () => {
        dispatch(cartAction.delete(props.id));
    };

    return (
        <div className={styles.item}>
            <div
                className={styles.image}
                style={{ backgroundImage: `url('${props.image}')` }}
            ></div>

            <div className={styles.description}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.price}>{props.price}&nbsp; &#8381;</div>
            </div>

            <div className={styles.actions}>
                <button
                    className={cn(styles.button, styles['button--minus'])}
                    onClick={remove}
                >
                    <img src="/minus-icon.svg" alt="decrease" />
                </button>
                <div>{props.count}</div>
                <button
                    className={cn(styles.button, styles['button--plus'])}
                    onClick={add}
                >
                    <img src="/plus-icon.svg" alt="increase" />
                </button>
                <button
                    className={cn(styles.button, styles['button--remove'])}
                    onClick={deleteItem}
                >
                    <img src="/delete-icon.svg" alt="increase" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
