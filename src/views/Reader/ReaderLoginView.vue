<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h4>Đăng nhập</h4>
            <p>Bạn là độc giả? Hãy đăng nhập ngay để Mượn sách nhé!</p>
          </div>
          <div class="card-body">
            <p class="text-danger text-center">{{ messageError }}</p>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="payload.Email"
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input
                  v-model="payload.MatKhau"
                  id="password"
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
  data() {
    return {
      payload: {
        Email: '',
        MatKhau: '',
        VaiTro: 'docgia'
      },
      messageError: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login(this.payload)
        alert('Đăng nhập thành công')

        const token = response.token
        const payload = JSON.parse(atob(token.split('.')[1]))
        localStorage.setItem('token', token) // Store token in localStorage
        localStorage.setItem('id', payload.id) // Save user ID
        localStorage.setItem('role', payload.role) // Save user role

        this.$root.emitter.emit('loginStatusChanged')

        const redirect = this.$route.query.redirect || '/reader/books' // Lấy đường dẫn redirect hoặc mặc định là /books
        this.$router.push(redirect)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.messageError = error.response.data.message // Display server error message
        }
        console.error('Login failed: ', error)
      }
    }
  }
}
</script>
