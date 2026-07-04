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
  title: string;
  content: string;
  image: string;
  author: string;
  updatedAt: string;
};

export type MainNavItem = NavItemWitchChildren;