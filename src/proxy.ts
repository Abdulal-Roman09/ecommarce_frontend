import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getDefaultDashboardRoutes, getRouteOwner, isAuthRoutes, UserRole } from './lib/auth-utils';
import { deleteCookie } from './services/auth/jwtHendeler';



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const accessToken = request.cookies.get("accessToken")?.value || null

    let userRole: UserRole | null = null

    if (accessToken) {
        const veryfiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string)

        if (typeof veryfiedToken === "string") {
            await deleteCookie("accessToken")
            await deleteCookie("refreshToken")
            return NextResponse.redirect(new URL("/login", request.url))
        }

        userRole = veryfiedToken.role
    }

    const routeOwner = getRouteOwner(pathName)


    const isAuth = isAuthRoutes(pathName)

    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url))
    }

    if (routeOwner === null) {
        return NextResponse.next()
    }
    if (!accessToken) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set("redirect", pathName)
        return NextResponse.redirect(loginUrl)
    }
    if (routeOwner === "COMMON") {
        return NextResponse.next()
    }
    if (routeOwner === "ADMIN" || routeOwner === "CUSTOMER" || routeOwner === "SUPER_ADMIN" || routeOwner === "VENDOR") {
        if (userRole !== routeOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url))
        }
    }
    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)']
}