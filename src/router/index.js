import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/BooksView.vue'
import Login from '@/views/LoginView.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/books',
    name: 'books',
    component: Books,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/book/:id',
  //   name: 'book.edit',
  //   component: () => import('@/views/BookEdit.vue'),
  //   props: true //Truyền các biến trong $route.params vào làm props
  // },
  // {
  //   path: '/book/add',
  //   name: 'book.add',
  //   component: () => import('@/views/BookAdd.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Kiểm tra xem route có yêu cầu đăng nhập không
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem('token')

    if (!token) {
      // Nếu không có token, chuyển hướng về trang đăng nhập
      next({
        path: '/login',
        query: { redirect: to.fullPath } // Chuyển hướng người dùng về trang login và lưu lại trang đã yêu cầu
      })
    } else {
      // Nếu có token, cho phép tiếp tục vào route
      next()
    }
  } else {
    // Nếu route không yêu cầu đăng nhập, cho phép tiếp tục
    next()
  }
})

export default router
