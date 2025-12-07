import { ButtonCard } from './ButtonCard';
import { FavoriteIcon } from '../../components/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';

import styles from './ProductCard.module.scss';
import { Product } from '../../api/productsApi';
import { toggleFavorite } from '../../store/slices/favoritesSlice';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart?.items || []);
  const favorites = useAppSelector((state: any) => state.favorites || []);

  const path = `/${product.images[0]}`;

  const isInCart = cartItems.some(item => item.id === product.id);
  const isInFavorites = favorites.includes(product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product.id));
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={path} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.price}>
          {product.isNew ? (
            <span className={styles.priceDiscount}>
              ${product.priceDiscount || product.priceRegular}
            </span>
          ) : product.priceDiscount &&
            product.priceDiscount !== product.priceRegular ? (
            <>
              <span className={styles.priceDiscount}>
                ${product.priceDiscount}
              </span>
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            </>
          ) : (
            <span className={styles.priceDiscount}>
              ${product.priceRegular}
            </span>
          )}
        </div>
        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Screen:</span>
            <span className={styles.specValue}>
              {product.screen.slice(0, 9)}
            </span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Capacity:</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>RAM:</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <ButtonCard
            onClick={handleAddToCart}
            label={isInCart ? 'Selected' : 'Add to cart'}
            isSelected={isInCart}
          />
          <button
            className={`${styles.favoriteButton} ${
              isInFavorites ? styles.favoriteButtonActive : ''
            }`}
            onClick={handleToggleFavorite}
            aria-label={
              isInFavorites ? 'Remove from favorites' : 'Add to favorites'
            }
            type="button"
          >
            <FavoriteIcon
              className={`${styles.favoriteIcon} ${
                isInFavorites ? styles.favoriteIconActive : ''
              }`}
              isActive={isInFavorites}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
