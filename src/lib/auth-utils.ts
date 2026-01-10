export type UserRole = "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | "VENDOR"

interface RouteConfig {
    exact: (string | RegExp)[];
    patterns: RegExp[];
}

export const authRoutes: string[] = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    patterns: []
};

export const vendorProtectedRoutes: RouteConfig = {
    exact: [/^\/vendor/],
    patterns: []
};

export const superAdminProtectedRoutes: RouteConfig = {
    exact: [/^\/super_admin/],
    patterns: []
};
export const adminProtectedRoutes: RouteConfig = {
    exact: [/^\/admin/],
    patterns: []
};

export const customerProtectedRoutes: RouteConfig = {
    exact: [/^\/dashboard/],
    patterns: []
};

export const isAuthRoutes = (pathName: string) => {
    return authRoutes.some((route: string) => route === pathName)
}

export const isRouteMatches = (pathName: string, routes: RouteConfig): boolean => {
    return routes.exact.some(route =>
        typeof route === "string"
            ? route === pathName
            : route.test(pathName)
    ) || routes.patterns.some(p => p.test(pathName))
}

export const getRouteOwner = (pathName: string): "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | "VENDOR" | "COMMON" | null => {

    if (isRouteMatches(pathName, superAdminProtectedRoutes)) {
        return "SUPER_ADMIN"
    }
    if (isRouteMatches(pathName, adminProtectedRoutes)) {
        return "ADMIN"
    }
    if (isRouteMatches(pathName, vendorProtectedRoutes)) {
        return "VENDOR"
    }
    if (isRouteMatches(pathName, customerProtectedRoutes)) {
        return "CUSTOMER"
    }
    if (isRouteMatches(pathName, commonProtectedRoutes)) {
        return "COMMON"
    }
    return null
}

export const getDefaultDashboardRoutes = (role: UserRole): string => {

    if (role === "SUPER_ADMIN") {
        return "/super_admin/dashboard"
    }
    if (role === "ADMIN") {
        return "/admin/dashboard"
    }
    if (role === "VENDOR") {
        return "/vendor/dashboard"
    }
    if (role === "CUSTOMER") {
        return "/dashboard"
    }
    return "/common/dashboard"
}

export const isValidRediretForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath)
    if (routeOwner === null || routeOwner === "COMMON") {
        return true
    }
    if (routeOwner === role) {
        return true
    }
    return false
}