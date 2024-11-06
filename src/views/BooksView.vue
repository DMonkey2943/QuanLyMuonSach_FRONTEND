<template>
  <div class="row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
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
import BookList from '@/components/BookList.vue'
import InputSearch from '@/components/InputSearch.vue'
import BookService from '@/services/book.service'

export default {
  components: {
    InputSearch,
    BookList
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: ''
    }
  },
  watch: {
    // Giam sat cac thay doi cua bien searchText.
    // Bo chon phan tu dang duoc chon trong danh sach
    searchText() {
      this.activeIndex = -1
    }
  },
  computed: {
    // Chuyen cac doi tuong Book thanh chuoi de tien cho tim kiem:
    bookStrings() {
      return this.books.map((book) => {
        const { TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan } = book
        return [TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan].join('')
      })
    },
    // Tra ve cac Book co chua thong tin can tim kiem:
    filteredBooks() {
      if (!this.searchText) {
        return this.books
      }
      return this.books.filter((book, index) => this.bookStrings[index].includes(this.searchText))
      // return this.books
    },
    activeBook() {
      if (this.activeIndex < 0) return null
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
