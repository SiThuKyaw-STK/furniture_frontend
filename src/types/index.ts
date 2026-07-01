export interface NavItem {
    title: string;
    href?: string;
    description?: string;
};

export interface NavItemWitchChildren extends NavItem {
    card: NavItemWitchChildren[];
    menu: NavItemWitchChildren[];
};

export type MainNavItem = NavItemWitchChildren;