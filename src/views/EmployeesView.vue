<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Danh sách Nhân viên
        <i class="fa-solid fa-users-gear"></i>
      </h4>

      <div class="m-3 row justify-content-around-align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i>Làm mới
        </button>
        <button class="ml-4 btn btn-sm btn-success" @click="goToAddEmployee">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <EmployeeList
        v-if="filteredEmployeesCount > 0"
        :employees="filteredEmployees"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có Nhân viên nào.</p>
    </div>
  </div>
</template>

<script>
import EmployeeList from '@/components/EmployeeList.vue'
import EmployeeService from '@/services/employee.service'

export default {
  components: {
    EmployeeList
  },
  data() {
    return {
      employees: [],
      activeIndex: -1
    }
  },
  watch: {},
  computed: {
    employeeStrings() {
      return this.employees.map((employee) => {
        const { TenNXB, DiaChi } = employee
        return [TenNXB, DiaChi].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredEmployees() {
      return this.employees
    },
    activeEmployee() {
      if (this.activeIndex < 0) return null
      return this.filteredEmployees[this.activeIndex]
    },
    filteredEmployeesCount() {
      return this.filteredEmployees.length
    }
  },
  methods: {
    async retrieveEmployees() {
      try {
        this.employees = await EmployeeService.getAllEmployees()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveEmployees()
      this.activeIndex = -1
    },
    goToAddEmployee() {
      this.$router.push({
        name: 'employee.add'
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
