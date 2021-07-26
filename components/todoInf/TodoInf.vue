<template>
  <div>
    <template v-if=" todoLoaded && userLoaded ">
      <inf-field 
        title="Todo"
        :text=" todo.title "
      />

      <inf-field 
        title="User"
        :text=" user.name "
        :link=" true "
        :link-to=" { name: 'user-id', params: { id: todo.userId } }"
      />

      <inf-field 
        title="Status"
        :text=" statusText "
        :text-color=" statusColor "
      />
    </template>

    <div v-else class="mt-3 ml-4 font-size-lg font-semibold text-gray-500">
      Loading...
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

    statusText () {
      return this.todo.completed ? 'Completed' : 'Not Completed'
    },

    statusColor () {
      return this.todo.completed ? 'completed-500' : 'uncompleted-400'
    },

  },
}
</script>
