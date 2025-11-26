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

export type EndpointName = 'products' | 'tablets' | 'phones' | 'accessories';

export const productsApi = {
  fetchData: async <T>(
    url: EndpointName,
    model = '',
    sortBy = '',
  ): Promise<T[] | undefined> => {
    try {
      const baseUrl = `${API_BASE_URL}/${url}?model=${model}&sortBy=${sortBy}`;
      const response = await fetch(baseUrl);
      console.log(response);
      if (!response.ok) {
        throw new Error(':(');
      }
      const { data } = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default productsApi;
