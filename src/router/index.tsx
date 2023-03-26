import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const Home = lazy(() => import('../page/home'))
const TestHome = lazy(() => import('../page/home/test'))
const MyComponent = lazy(() => import('../page/component'))

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/TestHome",
    element: <TestHome></TestHome>,
  },
  {
    path: "/component",
    element: <Suspense>
      <MyComponent></MyComponent>
    </Suspense>,
  },
]);

export default router