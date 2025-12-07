import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import {
  FavoriteIcon,
  CartIcon,
  MenuIcon,
  CloseIcon,
  LogoIcon,
} from '../icons';
import { MobileMenu } from './MobileMenu';
import { useMobileMenu } from './useMobileMenu';
import styles from './Header.module.scss';

const navItems = [
  { to: '/', label: 'HOME', end: true },
  { to: '/phones', label: 'PHONES' },
  { to: '/tablets', label: 'TABLETS' },
  { to: '/accessories', label: 'ACCESSORIES' },
];

const Header: React.FC = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const cartItemsCount = useAppSelector(state => state.cart?.totalCount || 0);
  const favoritesCount = useAppSelector(
    (state: any) => state.favorites?.length || 0,
  );

  const renderFavoritesLink = (extraClass = '') => (
    <NavLink
      to="/favorites"
      className={({ isActive }) =>
        `${styles.iconLink} ${extraClass} ${
          isActive ? styles.mobileIconLinkActive : ''
        }`.trim()
      }
      aria-label="Favorites"
    >
      <FavoriteIcon className={styles.icon} width={40} height={40} />
      {favoritesCount > 0 && (
        <span className={styles.badge}>{favoritesCount}</span>
      )}
    </NavLink>
  );

  const renderCartLink = (extraClass = '') => (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `${styles.iconLink} ${extraClass} ${
          isActive ? styles.mobileIconLinkActive : ''
        }`.trim()
      }
      aria-label="Cart"
    >
      <CartIcon className={styles.icon} />
      {cartItemsCount > 0 && (
        <span className={styles.badge}>{cartItemsCount}</span>
      )}
    </NavLink>
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} ${styles.headerContent}`}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.logoLink} aria-label="Home">
            <LogoIcon />
          </NavLink>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopIcons}>
            {renderFavoritesLink()}
            {renderCartLink()}
          </div>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Menu'}
          >
            {isMenuOpen ? (
              <CloseIcon className={styles.closeIcon} />
            ) : (
              <MenuIcon className={styles.menuIcon} />
            )}
          </button>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          navItems={navItems}
          renderFavoritesLink={renderFavoritesLink}
          renderCartLink={renderCartLink}
        />
      </div>
    </header>
  );
};

export default Header;
