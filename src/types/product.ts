export type Product = {
  _id: string;
  name: string;
  description: string;
  ingredients: string;
  dosage: string;
  disclosureNumber: string;
  applications: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;
