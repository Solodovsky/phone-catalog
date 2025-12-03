import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import ProductList from './ProductList';
import productsApi, { Product } from '../../api/productsApi';

type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  category: Category;
  title: string;
  emptyMessage: string;
};

const ProductPage: React.FC<Props> = ({ category, title, emptyMessage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductCount] = useState<number>(0);

  const sort = searchParams.get('sort') || '';
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');

  const getPageNumber = (param: string | null): number => {
    if (!param) return 1;
    const parsed = parseInt(param, 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const getPerPage = (param: string | null): number => {
    if (!param) return 16;
    const parsed = parseInt(param, 10);
    return isNaN(parsed) || parsed < 1 ? 16 : parsed;
  };

  const activePageNumber = getPageNumber(pageParam);
  const productsPerPage = getPerPage(perPageParam);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const queryParams: Record<string, string | number> = {};

        if (sort) {
          queryParams.sort = sort;
        }

        queryParams.perPage = productsPerPage;
        queryParams.page = activePageNumber;

        const response = await productsApi.fetchData<Product>(
          category,
          queryParams,
        );

        if (response) {
          setProductsList(response.data);

          if (response.pagination) {
            setTotalProductCount(response.pagination.total);
          }
        }
      } catch (error) {
        console.log(':(');
      }
    };
    fetchProductsData();
  }, [category, activePageNumber, productsPerPage, sort]);

  const updateSearchParams = (
    newSort?: string,
    newPage?: number,
    newPerPage?: number,
  ) => {
    const params = new URLSearchParams();

    const finalSort = newSort !== undefined ? newSort : sort;
    const finalPage = newPage !== undefined ? newPage : activePageNumber;
    const finalPerPage =
      newPerPage !== undefined ? newPerPage : productsPerPage;

    if (finalSort) {
      params.set('sort', finalSort);
    }

    if (finalPage !== 1) {
      params.set('page', finalPage.toString());
    }

    if (newPerPage !== undefined || perPageParam) {
      params.set('perPage', finalPerPage.toString());
    }

    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (newPageNumber: number) => {
    updateSearchParams(undefined, newPageNumber);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    updateSearchParams(newSort, 1);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);
    updateSearchParams(undefined, 1, newPerPage);
  };

  return (
    <div className="page container">
      <h2>{title}</h2>
      <span>{totalProductsCount}: models</span>
      <div>
        <select
          name="Sort by"
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="age">Newest</option>
          <option value="title">Phone Name</option>
          <option value="price">Price</option>
        </select>

        <select
          name="Items per page"
          id="per-page-select"
          value={productsPerPage.toString()}
          onChange={handlePerPageChange}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </div>
      {productsList.length === 0 ? (
        <div>{emptyMessage}</div>
      ) : (
        <ProductList products={productsList} />
      )}
      {totalProductsCount > productsPerPage && (
        <Pagination
          totalItems={totalProductsCount}
          itemsPerPage={productsPerPage}
          currentPage={activePageNumber}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductPage;
