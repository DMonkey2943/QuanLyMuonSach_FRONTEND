<script>
export default {
  props: {
    books: { type: Array },
    activeIndex: { type: Number, default: -1 }
  },
  emits: ['update:activeIndex'],
  methods: {
    updateActiveIndex(index) {
      this.$emit('update:activeIndex', index)
    }
  }
}
</script>

<template>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Sách</th>
        <th scope="col">Hình Ảnh</th>
        <th scope="col">Tác giả</th>
        <th scope="col">Nhà xuất bản</th>
        <th scope="col">Năm xuất bản</th>
        <th scope="col">Số quyển</th>
        <th scope="col">Đơn giá</th>
        <th scope="col">Tùy chọn</th>
      </tr>
    </thead>
    <tbody v-for="(book, index) in books" :key="book._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td scope="row">{{ book.TenSach }}</td>
        <td>
          <img
            v-if="book.HinhAnh"
            :src="book.HinhAnh"
            alt="Hình ảnh sách"
            style="max-width: 80px"
          />
        </td>
        <td>{{ book.TacGia }}</td>
        <td>{{ book.NhaXuatBan.TenNXB }}</td>
        <td>{{ book.NamXuatBan }}</td>
        <td>{{ book.SoQuyen }}</td>
        <td>{{ book.DonGia }}</td>
        <td>
          <router-link
            :to="{
              name: 'book.edit',
              params: { id: book._id }
            }"
          >
            <!-- <span class="mt-2 badge badge-warning">
              <i class="fas fa-edit"></i>
              Hiệu chỉnh
            </span> -->
            <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i>Hiệu chỉnh</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
