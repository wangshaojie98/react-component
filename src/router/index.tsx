import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const Home = lazy(() => import('../page/home'))
const TestHome = lazy(() => import('../page/home/test'))
const TestHome1 = lazy(() => import('../page/home/test1'))
const MyComponent = lazy(() => import('../page/component'))

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/TestHome",
    element: <Suspense><TestHome></TestHome></Suspense>,
  },
  {
    path: "/TestHome1",
    element: <Suspense><TestHome1></TestHome1></Suspense>,
  },
  {
    path: "/component",
    element: <Suspense>
      <MyComponent></MyComponent>
    </Suspense>,
  },
]);

export default router