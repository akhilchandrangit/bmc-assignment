<template>
  <div>
    <Header />
    <div class="container mx-auto">
      <SectionHeader @userAdded="onUserAdded" />
      <UserList :doRefetch="fetchUsers" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/Header.vue'
import SectionHeader from '~/components/SectionHeader.vue'
import UserList from '~/components/UserList.vue'

export default Vue.extend({
  name: 'IndexPage',
  data: () => ({
    fetchUsers: false,
  }),
  components: {
    Header,
    SectionHeader,
    UserList,
  },
  methods: {
    onUserAdded() {
      this.fetchUsers = true;
    }
  }
})
</script>
