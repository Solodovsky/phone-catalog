import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/header/Header';
import Home from './pages/Home/Home';
import Phones from './pages/Phones';
import Tablets from './pages/Tablets';
import Accessories from './pages/Accessories';
import Favorites from './pages/Favourites/Favorites';
import Cart from './pages/Cart/Cart';
import './App.scss';
import Footer from './components/footer/Footer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/phones" element={<Phones />} />
              <Route path="/tablets" element={<Tablets />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
