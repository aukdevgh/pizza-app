import { Suspense, lazy } from 'react';
import { createBrowserRouter, defer } from 'react-router-dom';
import axios from 'axios';
import MenuLayout from '../layout/Menu/MenuLayout';
import Error from '../pages/Error/Error';
import { PREFIX } from '../helpers/API';
import Product from '../pages/Product/Product';
import AuthLayout from '../layout/Auth/AuthLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import RequireAuth from '../helpers/RequireAuth';
import Success from '../pages/Success/Success';

const Menu = lazy(() => import('../pages/Menu/Menu'));
const Cart = lazy(() => import('../pages/Cart/Cart'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <MenuLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<>loading...</>}>
                        <Menu />
                    </Suspense>
                )
            },
            {
                path: '/cart',
                element: (
                    <Suspense fallback={<>loading...</>}>
                        <Cart />
                    </Suspense>
                )
            },
            {
                path: '/success',
                element: (
                    <Suspense fallback={<>loading...</>}>
                        <Success />
                    </Suspense>
                )
            },
            {
                path: '/product/:id',
                element: <Product />,
                errorElement: <>error</>,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            axios
                                .get(`${PREFIX}/products/${params.id}`)
                                .then((data) => resolve(data))
                                .catch((e) => reject(e));
                        })
                    });
                }
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> }
        ]
    },
    { path: '*', element: <Error /> }
]);
