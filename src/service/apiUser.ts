import { axiosInstance } from "@/lib/axios";
import { IUser } from "@/types";

export const fetchUsers = async (): Promise<IUser[]> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const fetchUsersById = async (
  id: string
): Promise<Omit<IUser, "password">> => {
  const response = await axiosInstance.get(`/users/${id}`);
  const detailUser = {
    id: response.data.id,
    username: response.data.username,
    email: response.data.email,
  };

  return detailUser;
};

export const registerUser = async (user: Omit<IUser, "id">): Promise<IUser> => {
  const response = await axiosInstance.post("/users", user);
  return response.data;
};
