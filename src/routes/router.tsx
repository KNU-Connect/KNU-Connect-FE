import { AppLayout } from '@/components';
import { ProtectedRoute } from '@/pages/auth/components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './paths';
import {
  ChatPage,
  ChatDetailPage,
  HomePage,
  LoginPage,
  MentorSearchPage,
  MentorDetailPage,
  MyPage,
  MyPostsPage,
  SignUpPage,
  NetworkingDetailPage,
  NetworkingCreatePage,
} from '@/pages';

/**
 * 애플리케이션 라우터 설정
 * - 각 페이지별로 다른 레이아웃 타입 적용
 * - 로그인, 회원가입 페이지는 레이아웃 없이 표시
 * - 404 페이지는 레이아웃 없이 표시
 */
const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.CHAT,
        element: <ChatPage />,
      },
      {
        path: ROUTES.MENTOR,
        element: <MentorSearchPage />,
      },
      {
        path: ROUTES.MENTOR_DETAIL,
        element: <MentorDetailPage />,
      },
      {
        path: ROUTES.MY,
        element: <MyPage />,
      },
      {
        path: ROUTES.MY_POSTS,
        element: <MyPostsPage />,
      },
      {
        path: ROUTES.NETWORKING_DETAIL,
        element: <NetworkingDetailPage />,
      },
    ],
  },
  {
    path: ROUTES.CHAT_DETAIL,
    element: <AppLayout headerType='none' navType='none' />,
    children: [
      {
        index: true,
        element: <ChatDetailPage />,
      },
    ],
  },
  {
    path: ROUTES.NETWORKING_CREATE,
    element: <AppLayout headerType='none' navType='none' />,
    children: [
      {
        index: true,
        element: <NetworkingCreatePage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
