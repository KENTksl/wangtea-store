export type Product = {
  _id: string;
  name: string;
  category: string;
  sku: string;
  note: string;
  packaging: string;
  origin: string;
  badge?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;

