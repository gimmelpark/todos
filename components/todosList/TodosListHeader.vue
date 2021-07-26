<template>
  <div ref="todosHeader" class="h-12 flex flex-row items-center bg-gray-50 shadow">
    <todos-sort class="ml-8" />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('setTodosHeaderHeight', this.$refs.todosHeader.clientHeight)
  }
}
</script>
