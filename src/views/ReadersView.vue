<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Danh sách Độc giả
        <i class="fa-solid fa-user-group"></i>
      </h4>

      <div class="m-3 row justify-content-around-align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i>Làm mới
        </button>
        <button class="ml-4 btn btn-sm btn-success" @click="goToAddReader">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <ReaderList
        v-if="filteredReadersCount > 0"
        :readers="filteredReaders"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có Độc giả nào.</p>
    </div>
  </div>
</template>

<script>
import ReaderList from '@/components/ReaderList.vue'
import ReaderService from '@/services/reader.service'

export default {
  components: {
    ReaderList
  },
  data() {
    return {
      readers: [],
      activeIndex: -1
    }
  },
  watch: {},
  computed: {
    readerStrings() {
      return this.readers.map((reader) => {
        const { TenNXB, DiaChi } = reader
        return [TenNXB, DiaChi].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredReaders() {
      return this.readers
    },
    activeReader() {
      if (this.activeIndex < 0) return null
      return this.filteredReaders[this.activeIndex]
    },
    filteredReadersCount() {
      return this.filteredReaders.length
    }
  },
  methods: {
    async retrieveReaders() {
      try {
        this.readers = await ReaderService.getAllReaders()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveReaders()
      this.activeIndex = -1
    },
    goToAddReader() {
      this.$router.push({
        name: 'reader.add'
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
