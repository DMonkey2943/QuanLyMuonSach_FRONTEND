<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Quản lý mượn sách</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'books' }" class="nav-link">
          Sách
          <i class="fas fa-book"></i>
        </router-link>
      </li>

      <li class="nav-item ml-3">
        <router-link :to="{ name: 'publishers' }" class="nav-link">
          Nhà xuất bản
          <i class="fa-solid fa-building-user"></i>
        </router-link>
      </li>

      <li class="nav-item ml-3">
        <router-link :to="{ name: 'employees' }" class="nav-link">
          Nhân viên
          <i class="fa-solid fa-users-gear"></i>
        </router-link>
      </li>

      <li class="nav-item ml-3">
        <router-link :to="{ name: 'readers' }" class="nav-link">
          Độc giả
          <i class="fa-solid fa-user-group"></i>
        </router-link>
      </li>

      <li class="nav-item ml-5" v-if="!isLoggedIn">
        <router-link :to="{ name: 'login' }" class="nav-link">
          Đăng nhập
          <i class="fa-solid fa-user-lock"></i>
        </router-link>
      </li>

      <li class="nav-item ml-4" v-if="isLoggedIn">
        <a @click="logout" class="nav-link">
          Đăng xuất
          <i class="fa-solid fa-sign-out-alt"></i>
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false // Trạng thái đăng nhập
    }
  },
  mounted() {
    // Kiểm tra token khi component được mount
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      // Kiểm tra token trong localStorage
      const token = localStorage.getItem('token')
      this.isLoggedIn = !!token // Nếu có token thì isLoggedIn = true
    },
    logout() {
      // Xóa token và chuyển hướng về trang đăng nhập
      localStorage.removeItem('token')
      this.isLoggedIn = false
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
