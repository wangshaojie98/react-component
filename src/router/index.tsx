import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const Home = lazy(() => import('../page/home'))
const MyComponent = lazy(() => import('../page/component'))

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/component",
    element: <Suspense>
      <MyComponent></MyComponent>
    </Suspense>,
  },
]);

export default router