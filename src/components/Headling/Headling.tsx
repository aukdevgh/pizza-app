import cn from 'classnames';
import { IHeadlingProps } from './Headling.props';
import styles from './Headling.module.css';

function Headling({ children, className, ...props }: IHeadlingProps) {
    return (
        <h1 className={cn(styles.h1, className)} {...props}>
            {children}
        </h1>
    );
}

export default Headling;
