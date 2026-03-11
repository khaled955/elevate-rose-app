export type Category = {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
} & DataBaseProbs;

export type Categories = {
  categories: Category[];
};






export interface CurrentCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
}

export interface CurrentCategoryResponse {
  category: CurrentCategory;
}

