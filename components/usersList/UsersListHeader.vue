<template>
  <div class="flex flex-row justify-between items-center py-2">
    <div class="ml-3 font-semibold text-gray-600">Users:</div>
    <button 
      class="mr-3 h-8 w-24 text-white rounded-md shadow-lg hover:shadow-md"
      :class=" btnClass "
      @click=" onClick "
    >{{ btnText }}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters ('users', {
      allSelected: 'allUsersSelected',
    }),
    btnText() {
      return this.allSelected ? 'Remove All' : 'Select All'
    },
    btnClass() {
      return this.allSelected ? 'bg-red-600 hover:bg-red-500' : 'bg-green-700 hover:bg-green-600'
    }
  },
  methods: {
    ...mapActions('users', {
      selectAll: 'selectAllUsers',
      removeAll: 'removeAllUsers',
    }),
    onClick() {
      if (this.allSelected) {
        this.removeAll()
      } else {
        this.selectAll()
      }
    },
  },
}
</script>
