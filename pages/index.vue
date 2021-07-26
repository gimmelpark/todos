<template>
  <div class="flex flex-row">
    <users-list />
    <todos-list />
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    if ( !store.getters['todos/getLoadingStarted'] || !store.getters['users/getLoadingStarted'] ) {
      await store.dispatch('todos/storeInit')
    }
  }
}
</script>
