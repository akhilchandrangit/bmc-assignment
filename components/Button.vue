<template>
  <button :class="className">
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'NuxtButton',
  props: {
    text: {
      type: String,
    },
    className: {
      type: String,
      default: '',
    },
  }
});
</script>
