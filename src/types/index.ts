export interface NavItem {
    title: string;
    href?: string;
    description?: string;
};

export interface NavItemWitchChildren extends NavItem {
    card?: NavItemWitchChildren[];
    menu?: NavItemWitchChildren[];
};

export type Image = {
  id: number;
  path: string
}
export type Product = {
  id: number;
  name: string;
  description: string;
  images: Image[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};

export type Post = {
  id: number;
  author: {fullName: string};
  title: string;
  content: string;
  image: string;
  body: string;
  updatedAt: string;
  tags: {name: string};
};

export type Category = {
  id: number;
  name: string;
};

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  imageUrl: string
}

export type MainNavItem = NavItemWitchChildren;