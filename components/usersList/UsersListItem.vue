<template>
  <div class="flex flex-row items-center" :class=" userClass ">
    <custom-checkbox
      :checked=" selected "
      class="ml-2"
      @check=" $store.dispatch('users/selectUser', userId) "
    />

    <div 
      class="ml-2 text-gray-600 cursor-pointer"
      @click=" $store.dispatch('users/selectUser', userId) "
    >
      {{ user.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/getUserById'](this.userId)
    },
    selected() {
      return this.$store.getters['users/hasSelectedUser'](this.userId)
    },
    userClass() {
      return this.selected ? '' : 'opacity-50';
    }
  },
}
</script>

