import { IButtonPops } from './Button.pops';
import cn from 'classnames';
import styles from './Button.module.css';

function Button({
    children,
    className,
    appearence = 'small',
    ...props
}: IButtonPops) {
    return (
        <button
            className={cn(styles.button, styles.accent, className, {
                [styles.small]: appearence === 'small',
                [styles.big]: appearence === 'big'
            })}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
