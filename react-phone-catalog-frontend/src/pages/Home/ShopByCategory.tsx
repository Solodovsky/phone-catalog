import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

const ShopByCategory = () => {
  const categories = [
    {
      id: 'phones',
      title: 'Mobile Phones',
      link: '/phones',
      image: '/public/img/category-phones.png',
      imageAlt: 'Phones',
    },
    {
      id: 'tablets',
      title: 'Tablets',
      link: '/tablets',
      image: '/public/img/category-tablets.png',
      imageAlt: 'Tablets',
    },
    {
      id: 'accessories',
      title: 'Accessories',
      link: '/accessories',
      image: '/public/img/category-accessories.png',
      imageAlt: 'Accessories',
    },
  ];

  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.shopByCategoryTitle}>Shop by category</h2>
      <div className={styles.shopByCategoryItems}>
        {categories.map(category => (
          <Link
            key={category.id}
            to={category.link}
            className={styles.shopByCategoryLink}
          >
            <img
              src={category.image}
              alt={category.imageAlt}
              className={styles.shopByCategoryImage}
            />

            <div className={styles.shopByCategoryItemContent}>
              <h3 className={styles.shopByCategoryItemTitle}>
                {category.title}
              </h3>
              <span className={styles.shopByCategoryItemLink}>models</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
