import ProductCard from '../../../components/ProdutcCard/ProductCard';
import { IMenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

function MenuList({ products }: IMenuListProps) {
    return (
        <div className={styles.list}>
            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    id={p.id}
                    rating={p.rating}
                    price={p.price}
                    name={p.name}
                    description={p.ingredients.join(', ')}
                    image={p.image}
                />
            ))}
        </div>
    );
}

export default MenuList;
