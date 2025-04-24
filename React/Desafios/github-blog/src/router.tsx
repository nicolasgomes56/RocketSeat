import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Blog } from './pages/Blog'
import { Post } from './pages/Post'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Blog /> },
      { path: '/post/:postId', element: <Post /> },
    ],
  },
])
