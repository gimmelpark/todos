<template>
  <div class="flex flex-row">
    <users-list />
    <todos-list />
  </div>
</template>

<script>
export default {
  created() {
    if ( !this.$store.getters['todos/getLoadingStarted'] || !this.$store.getters['users/getLoadingStarted']) {
      this.$store.dispatch('todos/storeInit')
    }
  }
}
</script>
