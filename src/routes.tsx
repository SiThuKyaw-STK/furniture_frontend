import React from 'react'
import { createBrowserRouter } from 'react-router'
import HomePage from './pages/Home';
import ContactPage from './pages/Contact';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {path: '', Component: HomePage},
      {path: 'contact', Component: ContactPage}
    ]
  }
]);