<template>
  <div id="addUserModel" tabindex="-1" aria-hidden="true" :class="{ 'hidden': !showPopup }"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-[525px] h-full md:h-auto m-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 p-9">
        <h3
          class="flex justify-center items-center w-full p-4 pt-0 rounded-t border-b-2 dark:border-gray-600 text-xl text-center font-semibold text-gray-900 dark:text-white">
          Add User
        </h3>
        <form @submit="checkForm" class="mt-5">
          <div class="mb-6">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Name</label>
            <input type="name" id="name" placeholder="John Doe" v-model="formValues.name"
              class="bg-transparent border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="getInputClass('name')">
          </div>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
              Email</label>
            <input type="email" id="email" v-model="formValues.email"
              class="bg-transparent border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="john.doe@example.com" :class="getInputClass('email')">
          </div>
          <div class="mb-6">
            <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
              Gender</label>
            <select class="form-select form-select-lg mb-3
              appearance-none
              block
              w-full
              px-4
              py-2
              font-normal
              text-gray-900 text-sm
              bg-white bg-clip-padding bg-no-repeat
              border-2
              rounded
              transition
              ease-in-out
              m-0" :class="getInputClass('gender')" name="gender" v-model="formValues.gender">
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="mb-6">
            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Status</label>
            <div class="flex flex-wrap">
              <div class="flex items-center mr-4">
                <input id="active" type="radio" value="active" name="status" v-model="formValues.status"
                  class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
              </div>
              <div class="flex items-center mr-4">
                <input id="inactive" type="radio" value="inactive" name="status" v-model="formValues.status"
                  class="w-4 h-4 text-black bg-gray-100 border-gray-300">
                <label for="inactive" class="ml-2 text-sm font-medium text-gray-900">Inactive</label>
              </div>
            </div>
          </div>

          <button type="submit" :disabled="isSubmitting" :class="{ 'opacity-75': isSubmitting }"
            class="text-black bg-[#FFDD00] hover:opacity-75 focus:ring-4 focus:outline-none font-medium rounded-[54px] text-sm w-full px-5 py-2.5 text-center">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '~/components/Button.vue';
import type { AddUserFormError, AddUserFormValue } from '~/types/form';

export default Vue.extend({
  name: 'NuxtAddUserPopup',
  components: {
    Button,
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    formErrors: {} as AddUserFormError,
    formValues: {
      name: null,
      email: null,
      status: 'active',
      gender: 'male'
    } as AddUserFormValue
  }),
  methods: {
    closePopup() {
      this.$emit('closePopup');
    },
    checkForm(e: Event) {
      this.formErrors = {};

      const fields = Object.keys(this.formValues) as (keyof AddUserFormValue)[];
      fields.forEach(field => {
        if (!this.formValues[field]) {
          this.formErrors[field] = 'This field is required';
        }
      });

      if (!this.isValidEmail(this.formValues.email as string)) {
        this.formErrors.email = 'Invalid email';
      }

      e.preventDefault();

      if (Object.keys(this.formErrors).length === 0) {
        this.$emit('addUser', this.formValues);
      }
    },
    isValidEmail(email: string) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    },
    getInputClass(field: string) {
      const hasError = this.formErrors[field as keyof AddUserFormError];
      return {
        'border-red-300': hasError,
        'border-gray-300': !hasError,
      };
    },
  }
});
</script>
