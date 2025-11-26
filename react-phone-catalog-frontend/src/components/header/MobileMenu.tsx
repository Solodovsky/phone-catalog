import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  renderFavoritesLink: (extraClass?: string) => React.ReactElement;
  renderCartLink: (extraClass?: string) => React.ReactElement;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  renderFavoritesLink,
  renderCartLink,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      <div className={styles.mobileNavLinks}>
        {navItems.map(item => (
          <NavLink
            key={`${item.to}-mobile`}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${
                isActive ? styles.mobileNavLinkActive : ''
              }`
            }
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className={styles.mobileActions}>
        {renderFavoritesLink(styles.mobileIconLink)}
        {renderCartLink(styles.mobileIconLink)}
      </div>
    </nav>
  );
};

export default MobileMenu;
