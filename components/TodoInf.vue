<template>
  <div>
    <div class="mt-3 ml-4">
      <div class="text-lg font-bold text-gray-500">
        Todo:
      </div>
      <div class="ml-1 font-semibold text-gray-600">
        {{ todoText }}
      </div>
    </div>

    <div class="mt-3 ml-4">
      <div class="text-lg font-bold text-gray-500">
        User Name:
      </div>
      <NuxtLink
        :to=" userLinkTo "
        class="ml-1 font-semibold text-gray-600"
        :class=" userClass "
      >
        {{ userNameText }}
      </NuxtLink>
    </div>

    <div class="mt-3 ml-4">
      <div class="text-lg font-bold text-gray-500">
        Status:
      </div>
      <div 
        class="ml-1 font-semibold"
        :class="statusClass"
      >
        {{ statusText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    todoId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('todos', {
      todoLoaded: 'getLoadingCompleted',
    }),
    ...mapGetters('users', {
      userLoaded: 'getLoadingCompleted',
    }),

    todo () {
      return this.$store.getters['todos/getTodoById'](parseInt(this.todoId))
    },

    user () {
      return this.$store.getters['users/getUserById'](this.todo.userId)
    },

    todoText () {
      return this.todoLoaded ? 
        this.todo.title :
        'Loading...'
    },

    userLinkTo () {
      return this.userLoaded ? 
          { 
            name: 'user-id', 
            params: { 
              id: this.todo.userId 
            } 
          }
        : ''
    },

    userClass () {
      return this.userLoaded ? 
        'hover:underline' :
        ''
    },
    
    userNameText () {
      return this.userLoaded ? 
        this.user.name :
        'Loading...'
    },

    statusText () {
      return this.todoLoaded ? 
        this.todo.completed ? 'Completed' : 'Not Completed':
        'Loading...'
    },

    statusClass () {
      return this.todoLoaded ? 
        this.todo.completed ? 'text-completed-500' : 'text-uncompleted-400':
        'text-gray-600'
    },

  },
}
</script>
