<template>
  <div class="mt-3 ml-4">
    <div class="text-lg font-bold text-gray-500">
      User todos:
    </div>
    <user-inf-todos-item 
      v-for="(todo, i) in todos"
      :key="`todo-${i}`"
      :todo=" todo "
    />
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    todos () {
      return this.$store.getters['todos/getTodosByUser'](this.userId)
    },
  },
}
</script>
