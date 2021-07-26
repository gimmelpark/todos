<template>
  <div>
    <NuxtLink 
      :to="{ name: 'todo-id', params: { id: todo.id } }"
      class="ml-1 font-semibold hover:underline"
      :class=" todoClass "
    >
      {{ todo.title }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    todoClass () {
      return this.todo.completed ? 
        'text-completed-500' :
        'text-uncompleted-400'
    },
  },
}
</script>
