import React from 'react'
import App from './App.tsx'
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import { Provider } from 'react-redux'
import store from './core/redux/store.ts'
import SignInForm from './components/organisms/onboarding/signin_form.tsx';
import SignupForm from './components/organisms/onboarding/signup_form.tsx';
import Admin_dashboard from './pages/admin_pages/admin_dashboard.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/signin',
        element:<SignInForm/>
      },
      {
        path:'/signup',
        element:<SignupForm/>
      }
    ]
  },
  {
    path:'/admin',
    element:(<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Admin_dashboard/>
    </ThemeProvider>
    )
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
