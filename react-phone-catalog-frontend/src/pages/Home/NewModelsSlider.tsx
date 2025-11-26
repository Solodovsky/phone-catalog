import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import styles from './NewModelsSlider.module.scss';
import { Phone, productsApi } from '../../api/productsApi';
import { ProductCard } from '../../components/ui/ProductCard';
import SliderLeftIcon from '../../components/icons/SliderLefticon';
import SliderRightIcon from '../../components/icons/SliderRightIcon';

const NewModelsSlider: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await productsApi.fetchData<Phone>('phones', 'iphone-14');

        if (!data) {
          return;
        }
        setPhones(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

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
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
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
    <div className={styles.newModelsSlider}>
      <div className={styles.sliderHeader}>
        <h2 className={styles.sliderTittle}>Brand new models</h2>
      </div>
      {phones.length > 0 && (
        <Slider {...settings}>
          {phones.map(phone => (
            <ProductCard key={phone.id} phone={phone} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewModelsSlider;
