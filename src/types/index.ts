export interface NavItem {
    title: string;
    href?: string;
    description?: string;
};

export interface NavItemWitchChildren extends NavItem {
    card: NavItemWitchChildren[];
    menu: NavItemWitchChildren[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};

export type Post = {
  id: string;
  author: string;
  title: string;
  content: string;
  image: string;
  body: string;
  updatedAt: string;
  tags: string[];
};

export type Category = {
  id: string;
  label: string;
};

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  imageUrl: string
}

export type MainNavItem = NavItemWitchChildren;