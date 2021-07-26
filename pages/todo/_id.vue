<template>
  <div>
    <content-header />

    <todo-inf 
      :todo-id=" todoId "
    />
  </div>
</template>

<script>
export default {
  layout: 'notFixed',

  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  computed: {
    todoId () {
      return parseInt(this.$route.params.id)
    },
  },

  created() {
    if (!this.$store.getters['todos/getLoadingStarted']) {
      this.$store.dispatch('todos/storeInit')
    }
  },
}
</script>
