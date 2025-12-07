import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../store/slices/cartSlice';
import styles from './Cart.module.scss';
import Breadcrumb from '../../components/ui/Breadcrumb';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalCount } = useAppSelector(state => state.cart);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (totalCount === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары для оформления заказа</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <Breadcrumb />
      <h2 className={styles.title}>Корзина ({totalCount})</h2>
      <div className={styles.items}>
        {items.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.id}</span>
              <div className={styles.quantity}>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className={styles.removeButton}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartFooter}>
        <button onClick={handleClearCart} className={styles.clearButton}>
          Очистить корзину
        </button>
      </div>
    </div>
  );
};

export default Cart;
