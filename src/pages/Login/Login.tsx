import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';

export interface ILoginForm {
    email: { value: string };
    password: { value: string };
}

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErroMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());

        const target = e.target as typeof e.target & ILoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return (
        <div className={styles.login}>
            <Headling>Вход</Headling>

            {loginErroMessage && (
                <div className={styles.error}>{loginErroMessage}</div>
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
                <Button appearence="big">Вход</Button>
            </form>

            <div className={styles.links}>
                <div>Нет аккаунта?</div>
                <Link to="/auth/register">Зарегитсрироваться</Link>
            </div>
        </div>
    );
}

export default Login;
