<template>
  <div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('todos', {
      todosLoaded: 'getLoadingCompleted',
    }),
    ...mapGetters('users', {
      userLoaded: 'getLoadingCompleted',
    }),

    user () {
      return this.$store.getters['users/getUserById'](this.userId)
    },
  },
}
</script>
