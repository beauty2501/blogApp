import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home"
import { AuthLayout, Login } from './components/index';
import AddPost from "./pages/AddPost"
import EditPost from "./pages/EditPost"
import AllPosts from "./pages/AllPosts"
import Post from "./pages/Post"
import Signup from './pages/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/login",
        element: (<AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
    },
    {
      path: "/all-posts",
      element: (
          <AuthLayout authentication>
              {" "}
              <AllPosts />
          </AuthLayout>
      ),
  },
  {
    path: "/add-post",
    element: (
        <AuthLayout authentication>
            {" "}
            <AddPost />
        </AuthLayout>
    ),
},
{
  path: "/edit-post/:slug",
  element: (
      <AuthLayout authentication>
          {" "}
          <EditPost />
      </AuthLayout>
  ),
},
{
  path: "/post/:slug",
  element: <Post />,
},
    ],
  },
])

root.render(
  <React.StrictMode>
    <Provider store= {store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
