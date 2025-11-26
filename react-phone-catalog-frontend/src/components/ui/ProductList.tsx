import React from 'react';
import { Product } from '../../api/productsApi';
import styles from './ProductList.module.scss';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products?: Product[];
};

export const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className={styles.productListEmpty}>
        <p>Нет доступных товаров</p>
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} productId={String(product.id)} />
      ))}
    </div>
  );
};
