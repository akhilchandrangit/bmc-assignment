<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b uppercase">
              <tr>
                <th scope="col" class="text-sm font-normal text-gray-500 px-6 py-4 text-left">
                  Name
                </th>
                <th scope="col" class="text-sm font-normal text-gray-500 px-6 py-4 text-left">
                  Email
                </th>
                <th scope="col" class="text-sm font-normal text-gray-500 px-6 py-4 text-left">
                  Gender
                </th>
                <th scope="col" class="text-sm font-normal text-gray-500 px-6 py-4 text-left">
                  Status
                </th>
                <th scope="col" class="text-sm font-normal text-gray-500 px-6 py-4 text-left">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users"
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 capitalize">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">{{ user.name }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ user.email }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ user.gender }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    class="px-4 py-2 rounded-[36px] capitalize text-white"
                    :class="{ 'bg-green-500' : user.status === 'active', 'bg-red-500' : user.status === 'inactive'}">{{
                    user.status }}</button>
                </td>
                <td class="text-sm text-red-500 font-light px-6 py-4 whitespace-nowrap"
                  v-on:click="deleteUser(user.id)">
                  delete
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '~/components/Button.vue';
import type { User } from '~/types/user';

export default Vue.extend({
  name: 'NuxtTable',
  components: {
    Button,
  },
  data() {
    return {
      users: [] as User[],
    };
  },
  props: {
    doRefetch: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    doRefetch: {
      immediate: false,
      handler(doRefetch) {
        if (doRefetch) {
          this.getUsers();
        }
      }
    }
  },
  methods: {
    async getUsers() {
      const users = await this.$axios.$get('/');
      this.users = users;
    },
    async deleteUser(id: number) {
      await this.$axios.delete(`/${id}`);
      await this.getUsers();
    }
  },
  async mounted() {
    await this.getUsers();
  }
});
</script>
