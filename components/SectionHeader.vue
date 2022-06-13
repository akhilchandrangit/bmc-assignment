<template>
  <div class="flex justify-between items-center py-5">
    <h1 class="font-bold text-2xl">Users</h1>
    <button type="button" v-on:click="showPopup = true"
      class="flex items-center justify-center py-3 px-10 rounded-[48px] bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-light" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd" />
      </svg>
      Add
    </button>
    <AddUserPopup :showPopup="showPopup" @closePopup="showPopup = false" @addUser="addUser" />
  </div>
</template>

<script>
import Vue from 'vue';
import Button from '~/components/Button.vue'
import AddUserPopup from '~/components/AddUserPopup.vue'

export default Vue.extend({
  name: 'NuxtSectionHeader',
  components: {
    Button,
    AddUserPopup,
  },
  data: () => ({
    showPopup: true,
  }),
  methods: {
    addUser(data) {
      console.log(data);
    }
  }
});
</script>
