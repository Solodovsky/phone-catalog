import { ButtonCard } from './ButtonCard';
import { FavoriteIcon } from '../../components/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';

import styles from './ProductCard.module.scss';
import { Phone } from '../../api/productsApi';
import { toggleFavorite } from '../../store/slices/favoritesSlice';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart?.items || []);
  const favorites = useAppSelector((state: any) => state.favorites || []);

  const path = `public/${phone.images[0]}`;

  const isInCart = cartItems.some(item => item.id === phone.id);
  const isInFavorites = favorites.includes(phone.id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(phone.id));
    } else {
      dispatch(addToCart(phone.id));
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(phone.id));
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={path} alt={phone.name} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{phone.name}</h3>
        <div className={styles.price}>
          <span className={styles.priceRegular}>${phone.priceRegular}</span>
        </div>
        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Screen:</span>
            <span className={styles.specValue}>{phone.screen.slice(0, 9)}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Capacity:</span>
            <span className={styles.specValue}>{phone.capacity}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>RAM:</span>
            <span className={styles.specValue}>{phone.ram}</span>
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
