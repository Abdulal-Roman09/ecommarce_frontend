import { NavSection } from "@/types/dashboard.interfac";
import { UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    return [
        {
            title: "Common",
            items: [
                {
                    title: "Dashboard",
                    href: "/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["ADMIN", "SUPER_ADMIN", "VENDOR", "CUSTOMER"],
                },
                {
                    title: "My Profile",
                    href: "/dashboard/profile",
                    icon: "User",
                    roles: ["ADMIN", "SUPER_ADMIN", "VENDOR", "CUSTOMER"],
                },
            ],
        },
    ];
};

export const vendorNavItems = (role: UserRole): NavSection[] => {
    return [
        {
            title: "Management",
            items: [
                {
                    title: "Shop Info",
                    href: "/dashboard/shop",
                    icon: "Store",
                    roles: ["VENDOR"],
                },
                {
                    title: "My Products",
                    href: "/dashboard/products",
                    icon: "Package",
                    roles: ["VENDOR"],
                },
                {
                    title: "Orders",
                    href: "/dashboard/orders",
                    icon: "ShoppingCart",
                    roles: ["VENDOR"],
                },
            ],
        },
    ];
};

export const customerNavItems = (role: UserRole): NavSection[] => {
    return [
        {
            title: "Shopping",
            items: [
                {
                    title: "My Orders",
                    href: "/dashboard/my-orders",
                    icon: "ShoppingBag",
                    roles: ["CUSTOMER"],
                },
                {
                    title: "Wishlist",
                    href: "/dashboard/wishlist",
                    icon: "Heart",
                    roles: ["CUSTOMER"],
                },
            ],
        },
    ];
};

export const adminNavItems = (role: UserRole): NavSection[] => {
    return [
        {
            title: "Administration",
            items: [
                {
                    title: "Categories",
                    href: "/admin/dashboard/categories",
                    icon: "Layers",
                    roles: ["ADMIN", "SUPER_ADMIN"],
                },
                {
                    title: "All Products",
                    href: "/admin/dashboard/products",
                    icon: "ClipboardCheck",
                    roles: ["ADMIN", "SUPER_ADMIN"],
                },
                {
                    title: "Coupons",
                    href: "/admin/dashboard/coupons",
                    icon: "Ticket",
                    roles: ["ADMIN", "SUPER_ADMIN"],
                },
            ],
        },
    ];
};

export const super_adminNavItems = (role: UserRole): NavSection[] => {
    return [
        {
            title: "System Control",
            items: [
                {
                    title: "Manage Users",
                    href: "/super-admin/dashboard/users",
                    icon: "Users",
                    roles: ["SUPER_ADMIN"],
                },
                {
                    title: "Manage Vendors",
                    href: "/super-admin/dashboard/vendors",
                    icon: "ShieldCheck",
                    roles: ["SUPER_ADMIN"],
                },
                {
                    title: "Settings",
                    href: "/super-admin/dashboard/settings",
                    icon: "Settings",
                    roles: ["SUPER_ADMIN"],
                },
            ],
        },
    ];
};

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            
            return [...commonNavItems, ...adminNavItems(role)];
        case "SUPER_ADMIN":
            return [...commonNavItems, ...super_adminNavItems(role)];
        case "VENDOR":
            return [...commonNavItems, ...vendorNavItems(role)];
        case "CUSTOMER":
            return [...commonNavItems, ...customerNavItems(role)];
        default:
            return commonNavItems;
    }
};