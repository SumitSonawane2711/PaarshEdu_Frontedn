import React from 'react'
import App from './App.tsx'
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './core/redux/store.ts'
import SignInForm from './components/organisms/onboarding/signin_form.tsx';
import SignupForm from './components/organisms/onboarding/signup_form.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import ProtectedRoute from './components/templates/Protected-routes.tsx';
import Edit_course from './pages/admin_pages/edit_course.tsx';
import Edit_categories from './pages/admin_pages/edit_categories.tsx';
import Edit_instructor from './pages/admin_pages/edit_instructor.tsx';
import Edit_users from './pages/admin_pages/edit_users.tsx';
import Form from './pages/admin_pages/admin_compnents/course_form.tsx';
import User_dashboard from './pages/user_pages/user_dashboard.tsx';
import UserProfile from './pages/user_pages/user_profile.tsx';
import Courses from './pages/user_pages/user_courses.tsx';
import Admin_dashboard from './pages/admin_pages/Admin_dashboard.tsx';
import CourseDetails from './pages/home/course_details.tsx';
import Home from './pages/home/Home.tsx';

// const HomeLazy = React.lazy (()=>import('./pages/home/Home.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/signin',
        element: <SignInForm />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path:'/course_details/:id',
        element:<CourseDetails></CourseDetails>
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ProtectedRoute redirectTo="/signin" requiredRoles={['admin']} >
          <Admin_dashboard />
        </ProtectedRoute>
      </ThemeProvider>
    ),
    children: [
      {
        path: 'courses',
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={['admin']} >
            <Edit_course/>
          </ProtectedRoute>
        )
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={['admin']} >
            <Edit_categories/>
          </ProtectedRoute>
        )
      },
      {
        path: 'instructor',
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={['admin']} >
            <Edit_instructor/>
          </ProtectedRoute>
        )
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={['admin']} >
            <Edit_users/>
          </ProtectedRoute>
        )
      },
      {
        path: 'form',
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={['admin']} >
            <Form/>
          </ProtectedRoute>
        )
      },
    ]
  },

  {
    path: "/user",
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProtectedRoute redirectTo="/signin" requiredRoles={["user"]}>
        <User_dashboard />
      </ProtectedRoute>
      </ThemeProvider>
    ),
    children: [
      {
        path: "profile",
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={["user"]}>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <ProtectedRoute redirectTo="/signin" requiredRoles={["user"]}>
            <Courses />
          </ProtectedRoute>
        ),
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
