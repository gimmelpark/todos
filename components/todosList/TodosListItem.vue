<template>
  <NuxtLink 
    :to="{ name: 'todo-id', params: { id: todoId } }" 
    class="flex flex-col justify-evenly h-16 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50"
  >
    <div class="flex flex-row">
      <div class="ml-2 text-gray-400">
        #{{ todoN }}
      </div>

      <div 
        class="ml-4 w-4/5 whitespace-nowrap truncate"
        :title=" todo.title "
      >
        {{ todo.title }}
      </div>
    </div>
    
    <div class="flex flex-row justify-between">
      <div class="flex flex-row items-center">
        <div class="ml-3">
          <svg
            class="h-4 w-4 text-gray-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fill-rule="evenodd" 
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <NuxtLink
          :to="{ name: 'user-id', params: { id: todo.userId } }"
          class="text-gray-600 hover:underline"
        >
          {{ userText }}
        </NuxtLink>
      </div>

      <div 
        :class="statusClass" 
        class="mr-4"
      >
        {{ statusText }}
      </div>
    </div>
    
  </NuxtLink>
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
    user() {
      return this.$store.getters['users/getUserById'](this.todo.userId)
    },
    userText() {
      return this.user !== undefined ? this.user.name : '...'
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
