import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/BooksView.vue'

const routes = [
  {
    path: '/',
    name: 'books',
    component: Books
  }
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
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'notfound',
  //   component: () => import('@/views/NotFound.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
