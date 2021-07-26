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
    userId () {
      return parseInt(this.$route.params.id)
    },
  },

}
</script>
