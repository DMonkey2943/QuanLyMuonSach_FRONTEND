<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mb-5">
          <div class="card-header text-center">
            <h4>Đăng ký tài khoản</h4>
            <p>Bạn chưa có tài khoản? Hãy đăng ký ngay nhé!</p>
          </div>
          <div class="card-body">
            <!-- Thông báo lỗi chung nếu có -->
            <p class="text-danger text-center">{{ messageError }}</p>
            <!-- Thêm xử lý schema trong onSubmit để bắt lỗi -->
            <Form @submit="handleSubmit" :validation-schema="readerFormSchema">
              <div class="form-group">
                <label for="HoTen">Họ tên:</label>
                <Field name="HoTen" type="text" class="form-control" />
                <ErrorMessage name="HoTen" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="Email">Email:</label>
                <Field name="Email" type="text" class="form-control" />
                <ErrorMessage name="Email" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="MatKhau">Mật khẩu:</label>
                <Field name="MatKhau" type="password" class="form-control" />
                <ErrorMessage name="MatKhau" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="Phai">Phái:</label>
                <div>
                  <Field name="Phai" type="radio" :value="false" /> Nam
                  <Field name="Phai" type="radio" :value="true" /> Nữ
                </div>
                <ErrorMessage name="Phai" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="DienThoai">Số điện thoại:</label>
                <Field name="DienThoai" type="text" class="form-control" />
                <ErrorMessage name="DienThoai" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="DiaChi">Địa chỉ:</label>
                <Field name="DiaChi" type="text" class="form-control" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
              </div>

              <button type="submit" class="btn btn-primary btn-block">Đăng ký</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'
import ReaderService from '@/services/reader.service'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const readerFormSchema = yup.object().shape({
      HoTen: yup.string().required('Họ tên Độc giả không được để trống.'),
      MatKhau: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
        .required('Mật khẩu không được để trống.'),
      Email: yup
        .string()
        .required('Email không được để trống.')
        .matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 'Email không hợp lệ'),
      DienThoai: yup
        .string()
        .required('Số điện thoại không được để trống.')
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ'),
      DiaChi: yup.string().required('Địa chỉ không được để trống.'),
      Phai: yup.boolean().required('Giới tính không được để trống.')
    })
    return {
      readerFormSchema,
      payload: {
        HoTen: '',
        Email: '',
        MatKhau: '',
        Phai: '',
        DienThoai: '',
        DiaChi: ''
      },
      messageError: ''
    }
  },
  methods: {
    async handleSubmit(values) {
      try {
        await ReaderService.createReader(values)
        alert('Đăng ký tài khoản thành công. Hãy đăng nhập ngay!')
        this.$router.push({ name: 'reader.login' })
      } catch (error) {
        this.messageError = 'Đăng ký thất bại. Vui lòng thử lại sau.'
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
