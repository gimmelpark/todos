<template>
  <div class="flex-grow">
    <todos-list-header />

    <div 
      class="px-3 md:px-16 xl:px-64 2xl:px-72 overflow-auto" 
      :style=" listStyle "
    >
      <div
        v-for="(todo, i) in todos"
        :key="`todo-${i}`"
        class="mb-3"
        :class=" i === 0 ? 'mt-3' : '' "
      >
        <todos-list-item 
          :todo-id='todo.id'
          :todo-n='i + 1'
        />
      </div>
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

    // высота списка (для фиксации всего кроме списка)
    listStyle () {
      return `height: calc(100vh - ${this.$store.getters.getHeaderHeight}px - ${this.$store.getters.getTodosHeaderHeight}px);`
    },
  },
}
</script>