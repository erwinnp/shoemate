import { axiosInstance } from "@/lib/axios";
import { IShoe } from "@/types";

export const fetchShoesByUser = async (id: string): Promise<Array<IShoe>> => {
  const response = await axiosInstance.get(`/users/${id}/shoes`);
  return response.data;
};

export const fetchShoeById = async (
  userId: string,
  shoeId: string
): Promise<IShoe> => {
  const response = await axiosInstance.get(`/users/${userId}/shoes/${shoeId}`);
  return response.data;
};

export const createShoe = async (
  userId: string,
  shoe: IShoe
): Promise<IShoe> => {
  const response = await axiosInstance.post(`/users/${userId}/shoes`, shoe);
  return response.data;
};

export const updateShoe = async (
  userId: string,
  shoeId: string,
  shoe: Partial<IShoe>
): Promise<IShoe> => {
  const response = await axiosInstance.put(
    `/users/${userId}/shoes/${shoeId}`,
    shoe
  );
  return response.data;
};

export const deleteShoe = async (
  userId: string,
  shoeId: string
): Promise<void> => {
  await axiosInstance.delete(`/users/${userId}/shoes/${shoeId}`);
};
