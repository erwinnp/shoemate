export interface IUser {
  createdAt?: string;
  username: string;
  email: string;
  password: string;
  id?: string;
}

export interface IShoe {
  createdAt?: string;
  shoe_name: string;
  shoe_size: number;
  shoe_value: number;
  shoe_status: "Keep" | "Sold" | "OnSale";
  id?: string;
  userId?: string;
}
