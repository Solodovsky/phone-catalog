import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  to: string;
  children: React.ReactNode;
  end?: boolean;
};

const NavItem: React.FC<Props> = ({ to, children, end = false }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
      }
      end={end}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
