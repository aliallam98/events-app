import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/events',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/edgestore/init'
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    '/api/webhook/stripe',
    '/api/edgestore/init'
  ]
});
 
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};