<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema" enctype="multipart/form-data">
    <div class="form-group">
      <label for="TenSach">Tên Sách:</label>
      <Field name="TenSach" type="text" class="form-control" v-model="bookLocal.TenSach" />
      <ErrorMessage name="TenSach" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="HinhAnh">Hình ảnh:</label>
      <Field name="HinhAnh" type="file" class="form-control" v-model="bookLocal.HinhAnh" />
      <ErrorMessage name="HinhAnh" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="TacGia">Tác giả:</label>
      <Field name="TacGia" type="text" class="form-control" v-model="bookLocal.TacGia" />
      <ErrorMessage name="TacGia" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="NhaXuatBan">Nhà xuất bản:</label>
      <select name="NhaXuatBan" class="form-control" v-model="bookLocal.NhaXuatBan._id">
        <option
          v-for="nxb in publishers"
          :key="nxb._id"
          :value="nxb._id"
          :selected="nxb._id === bookLocal.NhaXuatBan?._id"
        >
          {{ nxb.TenNXB }}
        </option>
      </select>
      <ErrorMessage name="NhaXuatban" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="NamXuatBan">Năm xuất bản:</label>
      <Field name="NamXuatBan" type="text" class="form-control" v-model="bookLocal.NamXuatBan" />
      <ErrorMessage name="NamXuatBan" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="SoQuyen">Số quyển:</label>
      <Field name="SoQuyen" type="number" class="form-control" v-model="bookLocal.SoQuyen" />
      <ErrorMessage name="SoQuyen" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DonGia">Đơn giá:</label>
      <Field name="DonGia" type="text" class="form-control" v-model="bookLocal.DonGia" />
      <ErrorMessage name="DonGia" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">Thoát</button>
    </div>
  </Form>
</template>

<script>
import axios from 'axios'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: ['submit:book', 'delete:book'],
  props: {
    book: { type: Object, required: true }
  },
  data() {
    const bookFormSchema = yup.object().shape({
      TenSach: yup.string().required('Tên Sách không được để trống.'),
      TacGia: yup.string().required('Tác giả không được để trống.'),
      NamXuatBan: yup.string().required('Năm xuất bản không được để trống.'),
      SoQuyen: yup
        .number()
        .required('Số quyển không được để trống.')
        .min(1, 'Số quyển phải lớn hơn 0')
      //   HinhAnh: yup
      //     .mixed()
      //     .required('Hình ảnh không được để trống')
      //     .test('fileSize', 'Ảnh phải <5MB', (value) => value && value.size <= 5 * 1024)
      //     .test(
      //       'fileFormat',
      //       'Ảnh không đúng định dạng',
      //       (value) => value && 'image/png/jpeg'.includes(value.type)
      //     )
    })
    return {
      bookLocal: this.book,
      bookFormSchema,
      publishers: [],
      selectedNXBId: null
    }
  },
  methods: {
    async fetchNhaXuatBans() {
      try {
        const response = await axios.get('http://localhost:3001/api/nhaxuatban')
        this.publishers = response.data
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà xuất bản:', error)
      }
    },

    submitBook() {
      this.$emit('submit:book', this.bookLocal)
    },
    deleteBook() {
      this.$emit('delete:book', this.bookLocal._id)
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?')
      if (!reply) {
        return false
      } else {
        this.$router.push({ name: 'books' })
      }
    }
  },
  mounted() {
    this.fetchNhaXuatBans()
  }
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
