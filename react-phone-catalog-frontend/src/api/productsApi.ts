const API_BASE_URL = 'http://localhost:5000/api';

export type Phone = {
  id: string;
  category: 'phones';
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  isNew?: boolean;
};

export type Tablet = {
  id: string;
  category: 'tablets';
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  isNew?: boolean;
};

export type Accessory = {
  id: string;
  category: 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  isNew?: boolean;
};

export type Product = Phone | Tablet | Accessory;

export type EndpointName = 'products' | 'tablets' | 'phones' | 'accessories';
export type QueryParams = {
  [key: string]: string | number;
};

export type PaginationResponse<T> = {
  data: T[];
  pagination?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export const productsApi = {
  fetchData: async <T>(
    url: EndpointName,
    queryParams: QueryParams = {},
  ): Promise<PaginationResponse<T> | undefined> => {
    try {
      const params = new URLSearchParams();

      let queryString = '';

      for (const key in queryParams) {
        queryString += `${key}=${queryParams[key]}&`;
      }

      const baseUrl = `${API_BASE_URL}/${url}?${queryString}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API ERROR:', error);
      return undefined;
    }
  },
};

export default productsApi;
