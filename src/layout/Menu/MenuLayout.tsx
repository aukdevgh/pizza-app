import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import styles from './MenuLayout.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function MenuLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);
    const productsCount = items.reduce((acc, item) => (acc += item.count), 0);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img
                        className={styles.avatar}
                        src="/avatar.png"
                        alt="avatar"
                    />

                    <div className={styles.name}>{profile?.name}</div>
                    <div className={styles.email}>{profile?.email}</div>
                </div>
                <div className={styles.menu}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive
                            })
                        }
                    >
                        <img src="/menu-icon.svg" alt="menu icon" />
                        Меню
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive
                            })
                        }
                    >
                        <img src="/cart-icon.svg" alt="cart icon" />
                        Корзина{' '}
                        <span className={styles['cart-count']}>
                            {productsCount}
                        </span>
                    </NavLink>
                </div>
                <Button className={styles.exit} onClick={logout}>
                    <img src="/exit-icon.svg" alt="exit icon" />
                    Выход
                </Button>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}

export default MenuLayout;
