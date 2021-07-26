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

  async fetch ({ store }) {
    if ( !store.getters['todos/getLoadingStarted'] || !store.getters['users/getLoadingStarted'] ) {
      await store.dispatch('todos/storeInit')
    }
  },

  computed: {
    todoId () {
      return parseInt(this.$route.params.id)
    },
  },

}
</script>
