export const state = () => ({
  todos: [],

  APIloadingStarted: false,
  APIloadingCompleted: false,
  APIloadingError: undefined,
  URL: 'https://jsonplaceholder.typicode.com/todos',
})

export const getters = {
  getTodos: state => state.todos,
  getTodoById: state => id => state.todos.find( el => el.id === id ),

  getLoadingStarted: state => state.APIloadingStarted,
  getLoadingCompleted: state => state.APIloadingCompleted,
  getLoadingError: state => state.APIloadingError,
}

export const mutations = {
  setTodos (state, todos) {
    state.todos = todos
  },

  loadingStart (state) {
    state.APIloadingStarted = true
  },
  loadingComplete (state) {
    state.APIloadingCompleted = true
  },
  loadingError (state, error) {
    state.APIloadingError = error
  },
}

export const actions = {
  async storeInit ( { dispatch, commit } ) {
    try {
      commit ('loadingStart')
      await dispatch('APIgetAllTodos')
      commit ('loadingComplete')
    } 
    catch (e) {
      commit ('loadingError', e)
    }
    finally {
      await dispatch('users/findUsersWithTodos', null, { root: true })
    }
  },

  async APIgetAllTodos ( { state, dispatch }) {
    const todos = await this.$axios.$get(state.URL)
    dispatch ('setTodos', todos)
  },

  async APIgetTodos ( { state, dispatch, rootGetters }) {

    const selectedUsers = rootGetters['users/getSelectedUsers']
    let todos = []
    let userTodos = []
    
    for (const userId of selectedUsers) {
      userTodos = await this.$axios.$get(state.URL, { params: { userId } })
      todos = todos.concat(userTodos)
    }

    dispatch ('setTodos', todos)
  },

  setTodos ( { commit }, todos) {
    const todosUpperCase = todos.map( todo => ({
      ...todo,
      title: todo.title.charAt(0).toUpperCase() + todo.title.substr(1)
    }))
    commit('setTodos', todosUpperCase)
  },
}