import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/BooksView.vue'
import ReaderBooks from '@/views/Reader/BooksView.vue'
import ReaderBorrowBooks from '@/views/Reader/HistoryBorrowBookView.vue'
import Publishers from '@/views/PublishersView.vue'
import Employees from '@/views/EmployeesView.vue'
import Readers from '@/views/ReadersView.vue'
import Login from '@/views/LoginView.vue'
import ReaderLogin from '@/views/Reader/ReaderLoginView.vue'
import Dashboard from '@/views/DashboardView.vue'
import BorrowBooks from '@/views/BorrowBookView.vue'

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
    path: '/reader/login',
    name: 'reader.login',
    component: ReaderLogin
  },
  {
    path: '/reader/books',
    name: 'reader.books',
    component: ReaderBooks,
    meta: { requiresAuth: true }
  },
  {
    path: '/reader/borrowBooks',
    name: 'reader.borrowBooks',
    component: ReaderBorrowBooks,
    meta: { requiresAuth: true }
  },
  {
    path: '/books',
    name: 'books',
    component: Books,
    meta: { requiresAuth: true }
  },
  {
    path: '/book/:id',
    name: 'book.edit',
    component: () => import('@/views/BookEdit.vue'),
    props: true, //Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true }
  },
  {
    path: '/book/add',
    name: 'book.add',
    component: () => import('@/views/BookAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/publishers',
    name: 'publishers',
    component: Publishers,
    meta: { requiresAuth: true }
  },
  {
    path: '/publisher/:id',
    name: 'publisher.edit',
    component: () => import('@/views/PublisherEdit.vue'),
    props: true, //Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true }
  },
  {
    path: '/publisher/add',
    name: 'publisher.add',
    component: () => import('@/views/PublisherAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee/:id',
    name: 'employee.edit',
    component: () => import('@/views/EmployeeEdit.vue'),
    props: true, //Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true }
  },
  {
    path: '/employee/add',
    name: 'employee.add',
    component: () => import('@/views/EmployeeAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/readers',
    name: 'readers',
    component: Readers,
    meta: { requiresAuth: true }
  },
  {
    path: '/reader/:id',
    name: 'reader.edit',
    component: () => import('@/views/ReaderEdit.vue'),
    props: true, //Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true }
  },
  {
    path: '/reader/add',
    name: 'reader.add',
    component: () => import('@/views/ReaderAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/borrowBooks',
    name: 'borrowBooks',
    component: BorrowBooks,
    meta: { requiresAuth: true }
  },
  {
    path: '/borrowBooks/book/:id',
    name: 'borrowBooksByBook',
    component: () => import('@/views/BorrowBookByBookView.vue'),
    props: true, //Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true }
  },
  {
    path: '/borrowBooks/reader/:id',
    name: 'borrowBooksByReader',
    component: () => import('@/views/BorrowBookByReaderView.vue'),
    props: true, //Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true }
  },
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
