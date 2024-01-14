import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes:[
        "/",
        "/api/webhooks/(.*)",
        "/api/edgestore/"
    ],
    ignoredRoutes: [
      '/api/webhook/clerk',
      '/api/edgestore'
    ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};