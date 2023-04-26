import { $authHost, $host } from './index';

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand');
  return data;
};

export const deleteBrand = async (id) => {
  const { data } = await $authHost.delete(`api/brand/${id}`);
  return data;
};

export const deleteType = async (id) => {
  const { data } = await $authHost.delete(`api/type/${id}`);
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

export const fetchDevices = async (
  typeId,
  brandId,
  page,
  limit,
  search,
  rating
) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
      search,
      rating,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/item/${id}`);
  return data;
};

export const searchDevices = async (name, page = 1, limit = 4) => {
  const { data } = await $host.get('api/device/search', {
    params: {
      name,
      page,
      limit,
    },
  });
  return data;
};

export const deleteDevice = async (id) => {
  const { data } = await $authHost.delete(`api/device/item/${id}`);
  return data;
};

export const updateDeviceRating = async (id, rating, votes, ratingSum) => {
  const { data } = await $authHost.put(`api/device/item/${id}`, {
    rating,
    votes,
    ratingSum,
  });
  // console.log(data);
  return data;
};
