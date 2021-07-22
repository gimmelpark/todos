<template>
  <div>

    <div
      v-for="(todo, i) in todos"
      :key="`todo-${i}`"
      class="mx-3 mt-3 max-w-screen-md"
    >
      <todos-list-item 
        :todo-id='todo.id'
        :todo-n='i + 1'
      />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters ('todos', {
      todos: 'getTodos',
    }),

  },
}
</script>