<template>
  <div class="flex flex-col justify-evenly h-16 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50">
    <div class="flex flex-row">
      <div class="ml-2 text-gray-400">
        #{{ todoN }}
      </div>

      <div class="ml-4">
        {{ todo.title }}
      </div>
    </div>
    

    <div :class="statusClass">
      {{ statusText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoId: {
      type: Number,
      required: true,
    },
    todoN: {
      type: Number,
      required: true,
    },
  },

  computed: {
    todo() {
      return this.$store.getters['todos/getTodoById'](this.todoId)
    },
    statusText() {
      return this.todo.completed ? 'completed' : 'not completed'
    },
    statusClass() {
      return this.todo.completed ? 'text-completed-500' : 'text-uncompleted-400'
    },
  },
}
</script>
