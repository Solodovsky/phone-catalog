import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import styles from './HomeSlider.module.scss';
import { Product, productsApi } from '../../api/productsApi';
import { ProductCard } from '../../components/ui/ProductCard';
import SliderLeftIcon from '../../components/icons/SliderLefticon';
import SliderRightIcon from '../../components/icons/SliderRightIcon';

type Props = {
  title: string;
  phones: Product[];
};

const HomeSlider: React.FC<Props> = ({ title, phones }) => {
  const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      type="button"
      aria-label="Previous slide"
      onClick={onClick}
      className={`${styles.sliderButton} ${styles.prevButton}`}
    >
      <SliderLeftIcon />
    </button>
  );

  const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      type="button"
      aria-label="Next slide"
      onClick={onClick}
      className={`${styles.sliderButton} ${styles.nextButton} `}
    >
      <SliderRightIcon />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },

      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.Slider}>
      <div className={styles.sliderHeader}>
        <h2 className={styles.sliderTittle}>{title}</h2>
      </div>
      {phones.length > 0 && (
        <Slider {...settings} className={styles.slick}>
          {phones.map(phone => (
            <ProductCard key={phone.id} product={phone} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeSlider;
