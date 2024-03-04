import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import { IProduct } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartAction } from '../../store/cart.slice';

const DELIVERY_FEE = 189;

function Cart() {
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        loadAllProducts();
    }, [items]);

    const total = items
        .map((item) => {
            const product = cartProducts.find((p) => p.id === item.id);

            if (!product) {
                return 0;
            }

            return item.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const getProduct = async (id: number) => {
        const { data } = await axios.get(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllProducts = async () => {
        const products = await Promise.all(
            items.map((item) => getProduct(item.id))
        );
        setCartProducts(products);
    };

    const checkout = async () => {
        await axios.post(
            `${PREFIX}/order`,
            {
                products: items
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );
        dispatch(cartAction.clean());
        navigate('/success');
    };

    return (
        <>
            <Headling className={styles.headling}>Корзина</Headling>
            {items.map((item) => {
                const product = cartProducts.find((p) => p.id === item.id);

                if (!product) {
                    return;
                }

                return (
                    <CartItem key={item.id} count={item.count} {...product} />
                );
            })}

            <div className={styles.field}>
                <div className={styles.text}>Итог</div>
                <div className={styles.price}>
                    {total}&nbsp;
                    <span className={styles.currency}>&#8381;</span>
                </div>
            </div>

            <hr className={styles.hr} />

            <div className={styles.field}>
                <div className={styles.text}>Доставка</div>
                <div className={styles.price}>
                    {DELIVERY_FEE}&nbsp;
                    <span className={styles.currency}>&#8381;</span>
                </div>
            </div>

            <hr className={styles.hr} />

            <div className={styles.field}>
                <div className={styles.text}>
                    Итог <span className={styles.count}>({items.length})</span>
                </div>
                <div className={styles.price}>
                    {total + DELIVERY_FEE}&nbsp;
                    <span className={styles.currency}>&#8381;</span>
                </div>
            </div>

            <div className={styles.checkout}>
                <Button onClick={checkout}>Оформить</Button>
            </div>
        </>
    );
}

export default Cart;
