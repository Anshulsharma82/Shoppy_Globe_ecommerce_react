import { createRoot } from 'react-dom/client'
import { lazy,Suspense } from 'react'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import createStore from './utilitis/createStore.js'

const ProductList = lazy(() => import('./components/ProductList.jsx') )
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const Payment = lazy(() => import('./components/Payment.jsx'))
const Cart = lazy(() => import('./components/Cart.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))
const Error404 = lazy(() => import('./components/Error404.jsx'))

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Suspense> <Home /> </Suspense> 
      },
      {
        path: '/products',
        element: <Suspense> <ProductList /> </Suspense>
      },
      {
        path: '/cart',
        element: <Suspense> <Cart /> </Suspense>
      },
      {
        path: '/product/:id',
        element: <Suspense ><ProductDetail /> </Suspense>
      }
    ],
    errorElement: <Suspense> <Error404 /> </Suspense>
  },
  {
    path: '/payment',
    element: <Suspense> <Payment /> </Suspense>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={createStore}>
    <RouterProvider router={appRouter}>
    </RouterProvider>
  </Provider>
)
