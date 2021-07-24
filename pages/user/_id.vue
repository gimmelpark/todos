<template>
  <div>
    <content-header />

    <user-inf
      :user-id=" userId "
    />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  computed: {
    userId () {
      return parseInt(this.$route.params.id)
    },
  },

  created() {
    if (!this.$store.getters['users/getLoadingStarted']) {
      this.$store.dispatch('todos/storeInit')
    }
  },
}
</script>
