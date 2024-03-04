import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Search.module.css';
import { ISearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, ISearchProps>(function Search(
    { className, isValid = true, ...props },
    ref
) {
    return (
        <div className={styles['search-wrapper']}>
            <input
                className={cn(styles.search, className, {
                    [styles.invalid]: isValid
                })}
                placeholder="Введите блюдо или состав"
                ref={ref}
                {...props}
            />
            <img
                className={styles.icon}
                src="/search-icon.svg"
                alt="search icon"
            />
        </div>
    );
});

export default Search;
