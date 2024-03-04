import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartAction } from '../../store/cart.slice';

function Product() {
    const data = useLoaderData() as { data: IProduct };
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const add = (id: number) => {
        dispatch(cartAction.add(id));
    };

    const back = () => {
        navigate('/');
    };

    return (
        <Suspense fallback="loading...">
            <Await resolve={data.data}>
                {({ data }: { data: IProduct }) => (
                    <div className={styles.product}>
                        <div className={styles.head}>
                            <button className={styles.back} onClick={back}>
                                &#60;&nbsp;Назад
                            </button>
                            <Headling>{data.name}</Headling>
                            <Button
                                className={styles.add}
                                onClick={() => add(data.id)}
                            >
                                <img
                                    src="/cart-button-icon.svg"
                                    alt="cart icon"
                                />
                                &nbsp;В корзину
                            </Button>
                        </div>

                        <div className={styles.body}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url('${data.image}')`
                                }}
                            ></div>

                            <div className={styles.details}>
                                <div className={styles.field}>
                                    <div>Цена</div>
                                    <div className={styles.price}>
                                        {data.price}&nbsp;
                                        <span className={styles.currency}>
                                            &#8381;
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <div>Рейтинг</div>
                                    <div className={styles.rating}>
                                        {data.rating}&nbsp;
                                        <img
                                            src="/star-icon.svg"
                                            alt="star icon"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div>Состав:</div>
                                    <ul className={styles.list}>
                                        {data.ingredients.map((ingredient) => (
                                            <li
                                                key={
                                                    Math.random() +
                                                    ingredient.length
                                                }
                                            >
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    );
}

export default Product;
