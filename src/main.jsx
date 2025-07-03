import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error404 from './components/Error404.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import createStore from './utilitis/createStore.js'
import Payment from './components/Payment.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <ProductList />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <ProductDetail />
      }
    ],
    errorElement: <Error404 />
  },
  {
    path: '/payment',
    element: <Payment />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={createStore}>
    <RouterProvider router={appRouter}>
    </RouterProvider>
  </Provider>
)
