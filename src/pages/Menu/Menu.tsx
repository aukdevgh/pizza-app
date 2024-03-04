import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import MenuList from './MenuList/MenuList';
import styles from './Menu.module.css';

function Menu() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);

            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
                params: { name }
            });
            setProducts(data);

            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div className={styles.head}>
                <Headling>Menu</Headling>
                <Search onChange={updateFilter} />
            </div>
            <div>
                {error && error}
                {isLoading && 'loading...'}
                {!isLoading && products.length > 0 && (
                    <MenuList products={products} />
                )}
                {!isLoading && products.length === 0 && (
                    <>Не найдено блюд по запросу</>
                )}
            </div>
        </>
    );
}

export default Menu;
