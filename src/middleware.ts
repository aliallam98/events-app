import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes:[
        "/",
        "/api/webhooks/clerk",
        "/api/edgestore/(.*)"
    ],
    ignoredRoutes: [
      '/api/webhooks/clerk',
      '/api/webhooks/stripe',
      '/api/edgestore/(.*)'
    ]

});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};