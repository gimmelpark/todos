<template>
  <div>
    <todos-list />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('todos/APIgetTodos')
  }
}
</script>
