import { useEffect, useMemo, useState } from 'react';
import HomeBannerSilder, { HomeBannerSlide } from './HomeBannerSilder';
import styles from './Home.module.scss';
import HomeSlider from './HomeSlider';
import ShopByCategory from './ShopByCategory';
import productsApi, { Product } from '../../api/productsApi';

const Home: React.FC = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSlidersData = async () => {
      const [newModelsData, hotPricesData] = await Promise.all([
        productsApi.fetchData<Product>('phones', { model: 'iphone-14' }),
        productsApi.fetchData<Product>('phones', { hotPrices: 'price' }),
      ]);

      if (newModelsData) setNewModels(newModelsData.data);
      if (hotPricesData) setHotPrices(hotPricesData.data);
    };

    fetchSlidersData();
  }, []);

  const slides = useMemo<HomeBannerSlide[]>(
    () => [
      {
        id: 1,
        imageUrl: '/img/banner.png',
        imageAlt: 'iPhone banner',
        mobileImageUrl: '/img/mobile-slider-image.png',
      },
      {
        id: 2,
        imageUrl: '/img/banner1.jpg',
        imageAlt: 'iPhone banner',
      },
      {
        id: 3,
        imageUrl: '/img/banner2.jpg',
        imageAlt: 'iPhone banner',
      },
    ],
    [],
  );

  return (
    <div className="page container">
      <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>
      <HomeBannerSilder slides={slides} />
      <HomeSlider products={newModels} title="Brand new models" />
      <ShopByCategory />
      <HomeSlider products={hotPrices.slice(0, 18)} title="Hot prices" />
    </div>
  );
};

export default Home;
