<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Danh sách Sách
        <i class="fas fa-book"></i>
      </h4>

      <div class="m-3 row justify-content-around-align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i>Làm mới
        </button>
        <button class="ml-4 btn btn-sm btn-success" @click="goToAddBook">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có Sách nào.</p>
    </div>
  </div>
</template>

<script>
// import BookCard from '@/components/BookCard.vue'
import BookList from '@/components/BookList.vue'
import BookService from '@/services/book.service'

export default {
  components: {
    // BookCard,
    BookList
  },
  data() {
    return {
      books: [],
      activeIndex: -1
    }
  },
  watch: {},
  computed: {
    // Chuyen cac doi tuong Contact thanh chuoi de tien cho tim kiem:
    bookStrings() {
      return this.books.map((book) => {
        const { TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan } = book
        return [TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredBooks() {
      return this.books
    },
    activeBook() {
      if (this.activeIndex < 0) return null
      console.log('Clicked')
      return this.filteredBooks[this.activeIndex]
    },
    filteredBooksCount() {
      return this.filteredBooks.length
    }
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAllBooks()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveBooks()
      this.activeIndex = -1
    },
    goToAddBook() {
      this.$router.push({
        name: 'book.add'
      })
    }
  },
  mounted() {
    this.refreshList()
  }
}
</script>

<style>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
