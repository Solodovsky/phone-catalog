import { useMemo } from 'react';
import HomeBannerSilder, { HomeBannerSlide } from './HomeBannerSilder';
import styles from './Home.module.scss';
import NewModelsSlider from './NewModelsSlider';
import ShopByCategory from './ShopByCategory';

const Home: React.FC = () => {
  const slides = useMemo<HomeBannerSlide[]>(
    () => [
      {
        id: 1,
        imageUrl: '/img/banner.png',
        imageAlt: 'iPhone banner',
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
      <NewModelsSlider />
      <ShopByCategory />
    </div>
  );
};

export default Home;
