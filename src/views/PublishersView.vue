<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Danh sách Nhà xuất bản
        <i class="fa-solid fa-building-user"></i>
      </h4>

      <div class="m-3 row justify-content-around-align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i>Làm mới
        </button>
        <button class="ml-4 btn btn-sm btn-success" @click="goToAddPublisher">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <PublisherList
        v-if="filteredPublishersCount > 0"
        :publishers="filteredPublishers"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có Nhà xuất bản nào.</p>
    </div>
  </div>
</template>

<script>
import PublisherList from '@/components/PublisherList.vue'
import PublisherService from '@/services/publisher.service'

export default {
  components: {
    PublisherList
  },
  data() {
    return {
      publishers: [],
      activeIndex: -1
    }
  },
  watch: {},
  computed: {
    publisherStrings() {
      return this.publishers.map((publisher) => {
        const { TenNXB, DiaChi } = publisher
        return [TenNXB, DiaChi].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredPublishers() {
      return this.publishers
    },
    activePublisher() {
      if (this.activeIndex < 0) return null
      return this.filteredPublishers[this.activeIndex]
    },
    filteredPublishersCount() {
      return this.filteredPublishers.length
    }
  },
  methods: {
    async retrievePublishers() {
      try {
        this.publishers = await PublisherService.getAllPublishers()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrievePublishers()
      this.activeIndex = -1
    },
    goToAddPublisher() {
      this.$router.push({
        name: 'publisher.add'
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
