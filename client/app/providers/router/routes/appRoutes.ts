export const appRoutes = [
  {
    name: "index",
    path: "/",
    component: () => import("@/pages/dashboard"),
  },
  {
    name: "about",
    path: "/about",
    component: () => import("@/pages/about"),
    meta: {
      middleware: ["auth"],
    },
  },

];
