import { useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store';
import { userActions, register } from '../../store/user.slice';
import styles from './Register.module.css';

export interface IRegisterForm {
    name: { value: string };
    email: { value: string };
    password: { value: string };
}

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErroMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());

        const target = e.target as typeof e.target & IRegisterForm;
        const { name, email, password } = target;
        await sendRegister(name.value, email.value, password.value);
    };

    const sendRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        dispatch(register({ name, email, password }));
    };

    return (
        <div className={styles.login}>
            <Headling>Вход</Headling>

            {registerErroMessage && (
                <div className={styles.error}>{registerErroMessage}</div>
            )}

            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                        Ваш emial
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="current-email"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">
                        Ваш password
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="пароль"
                        autoComplete="current-password"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                        Вашe bvz
                    </label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Имя"
                    />
                </div>

                <Button appearence="big">Зарегитсрироваться</Button>
            </form>

            <div className={styles.links}>
                <div>Есть аккаунт?</div>
                <Link to="/auth/login">Войти</Link>
            </div>
        </div>
    );
}

export default Register;
