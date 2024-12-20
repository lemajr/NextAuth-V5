import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix, authRoutes, DEFAULT_REDIRECT, publicRoutes } from "./lib/routes";

// import {
//    DEFAULT_REDIRECT,
//     apiAuthPrefix,
//     authRoutes,
//     publicRoutes,
// } from "@/lib/routes"

const {auth} = NextAuth(authConfig);


export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return new Response(null, { status: 204 }); // Return an empty response with a status code
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
        }
        return new Response(null, { status: 204 }); // Return a valid response
    }

    if (!isPublicRoute && !isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return new Response(null, { status: 204 }); // Ensure a valid response is returned
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], //clerk auth docs
}
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }