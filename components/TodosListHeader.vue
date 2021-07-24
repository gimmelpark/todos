<template>
  <div ref="todosHeader" class="h-12 bg-gray-50 shadow">

  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('setTodosHeaderHeight', this.$refs.todosHeader.clientHeight)
  }
}
</script>
