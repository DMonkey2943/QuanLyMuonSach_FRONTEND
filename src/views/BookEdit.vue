<template>
  <div v-if="book" class="page">
    <h4>Hiệu chỉnh Sách</h4>
    <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from '@/components/BookForm.vue'
import BookService from '@/services/book.service'

export default {
  components: {
    BookForm
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      book: null,
      message: ''
    }
  },
  methods: {
    async getBook(id) {
      try {
        this.book = await BookService.getBookById(id)
      } catch (error) {
        console.log(error)
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: 'notfound',
          params: {
            pathMatch: this.$route.path.split('/').slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash
        })
      }
    },

    async updateBook(data) {
      try {
        console.log({
          ...data,
          NXBId: data.NhaXuatBan._id
        })
        await BookService.updateBook(this.book._id, {
          ...data,
          NXBId: data.NhaXuatBan._id
        })
        alert('Sách được cập nhật thành công')
        this.$router.push({ name: 'books' })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteBook() {
      if (confirm('Bạn muốn xóa Liên hệ này?')) {
        try {
          await BookService.delete(this.book._id)
          this.$router.push({ name: 'books' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  created() {
    this.getBook(this.id)
    this.message = ''
  }
}
</script>
