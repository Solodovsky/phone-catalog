import React, { useState } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { ProductCard } from '../../components/ui/ProductCard';
import styles from './Favorites.module.scss';
import { Product } from '../../api/productsApi';

const Favorites: React.FC = () => {
  const favoriteIds = useAppSelector(state => state.favorites);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  return (
    <section className={`page container ${styles.favoritesPage}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Favourites</h1>
        {favoriteIds.length === 0 ? (
          ''
        ) : (
          <span className={styles.count}>
            {favoriteIds.length} {favoriteIds.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>
      <div className={styles.grid}>
        {favoriteProducts.map(phone => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
