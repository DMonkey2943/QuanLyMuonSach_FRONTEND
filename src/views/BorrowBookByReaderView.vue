<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Danh sách lượt Mượn sách theo Độc giả
        <i class="fa-solid fa-book-open-reader"></i>
      </h4>

      <h5 class="text-success ml-3">
        {{ reader.HoTen }}
      </h5>
      <div class="ml-5">
        <p>
          <span class="font-weight-bold">Email: </span>
          {{ reader.Email }}
        </p>
        <p>
          <span class="font-weight-bold">Số điện thoại: </span>
          {{ reader.DienThoai }}
        </p>
        <p>
          <span class="font-weight-bold">Địa chỉ: </span>
          {{ reader.DiaChi }}
        </p>
      </div>

      <div class="m-3 row justify-content-around-align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i>Làm mới
        </button>
        <!-- <button class="ml-4 btn btn-sm btn-success" @click="goToAddBorrowBook">
          <i class="fas fa-plus"></i>Thêm mới
        </button> -->
      </div>

      <BorrowBookList
        v-if="filteredBorrowBooksCount > 0"
        :borrowBooks="filteredBorrowBooks"
        v-model:activeIndex="activeIndex"
        @bookReturned="handleBookReturned"
      />
      <p v-else>Không có lượt Mượn sách nào.</p>
    </div>
  </div>
</template>

<script>
import BorrowBookList from '@/components/BorrowBookList.vue'
import BorrowBookService from '@/services/borrowBook.service'
import ReaderService from '@/services/reader.service'

export default {
  components: {
    BorrowBookList
  },
  props: {
    id: { type: String, required: true } // Lấy `id` từ `$route.params`
  },
  data() {
    return {
      borrowBooks: [],
      activeIndex: -1,
      reader: {}
    }
  },
  watch: {},
  computed: {
    borrowBookStrings() {
      return this.borrowBooks.map((borrowBook) => {
        const { TenNXB, DiaChi } = borrowBook
        return [TenNXB, DiaChi].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredBorrowBooks() {
      return this.borrowBooks
    },
    activeBorrowBook() {
      if (this.activeIndex < 0) return null
      return this.filteredBorrowBooks[this.activeIndex]
    },
    filteredBorrowBooksCount() {
      return this.filteredBorrowBooks.length
    }
  },
  methods: {
    async retrieveBorrowBooks() {
      try {
        this.borrowBooks = await BorrowBookService.getAllBorrowBooksByReaderId(this.id)
      } catch (error) {
        console.log(error)
      }
    },
    async getReader(id) {
      try {
        this.reader = await ReaderService.getReaderById(id)
        console.log(this.reader)
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
    refreshList() {
      this.retrieveBorrowBooks()
      this.activeIndex = -1
    },
    goToAddBorrowBook() {
      this.$router.push({
        name: 'borrowBook.add'
      })
    },
    handleBookReturned(borrowBook) {
      alert(
        `Sách "${borrowBook.Sach.TenSach}" đã được trả bởi Độc giả "${borrowBook.DocGia.HoTen}"`
      )
      // Refresh the list
      this.refreshList()
    }
  },
  created() {
    this.getReader(this.id)
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
