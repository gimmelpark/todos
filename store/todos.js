export const state = () => ({
  todos: [],
})

export const getters = {
  getTodos: state => state.todos,
  getTodoById: state => id => state.todos.find( el => el.id === id ),
}

export const mutations = {
  setTodos (state, todos) {
    state.todos = todos
  },
}

export const actions = {
  async APIgetTodos ( { commit }, users) {
    let todos = []
    try {
      if ( users === undefined ) {
        todos = await this.$axios.$get('https://jsonplaceholder.typicode.com/todos')
      }
      commit ('setTodos', todos)
    } catch (e){
      console.error('API ERROR: CANNOT GET TODOS LIST: ', e)
    }
  },
}