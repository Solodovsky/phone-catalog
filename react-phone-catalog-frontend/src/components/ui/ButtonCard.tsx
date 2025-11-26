import React from 'react';
import styles from './ButtonCard.module.scss';

type ButtonCardProps = {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  isSelected?: boolean;
};

export const ButtonCard: React.FC<ButtonCardProps> = ({
  onClick,
  disabled = false,
  label = 'Add to cart',
  isSelected = false,
}) => {
  return (
    <button
      className={`${styles.btnCard} ${
        isSelected ? styles.btnCardSelected : ''
      }`.trim()}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
};

export default ButtonCard;
