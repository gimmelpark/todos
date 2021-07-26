export const state = () => ({
  todos: [],

  sortTypes: [
    {
      type: 0,
      text: 'By default',
    },
    {
      type: 1,
      text: 'By name',
    },
    {
      type: 2,
      text: 'By status',
    },
  ],
  sort: {
    type: 0,
    dir: true,
  },

  APIloadingStarted: false,
  APIloadingCompleted: false,
  APIloadingError: undefined,
  URL: 'https://jsonplaceholder.typicode.com/todos',
})

export const getters = {
  getTodos: state => state.todos,
  getTodoById: state => id => state.todos.find( el => el.id === id ),
  getTodosByUser: state => userId => state.todos.filter( el => el.userId === userId),

  getSort: state => state.sort,
  getSortTypes: state => state.sortTypes,

  getLoadingStarted: state => state.APIloadingStarted,
  getLoadingCompleted: state => state.APIloadingCompleted,
  getLoadingError: state => state.APIloadingError,
}

export const mutations = {
  setTodos (state, todos) {
    state.todos = todos
  },

  setSort (state, sort) {
    state.sort = sort
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
      window.$nuxt.error(e)
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

  setTodos ( { commit, state }, todos) {
    const todosUpperCase = todos.map( todo => ({
      ...todo,
      title: todo.title.charAt(0).toUpperCase() + todo.title.substr(1)
    }))

    commit('setTodos', 
      sortTodos (todosUpperCase, state.sort.type, state.sort.dir)
    )
  },

  setSortType ( { commit, state }, type) {
    commit ('setSort', {
      type,
      dir: state.sort.dir,
    })

    commit('setTodos', 
      sortTodos (state.todos, state.sort.type, state.sort.dir)
    )
  },

  setSortDirection ( { commit, state }, dir) {
    commit ('setSort', {
      type: state.sort.type,
      dir,
    })

    commit('setTodos', 
      sortTodos (state.todos, state.sort.type, state.sort.dir)
    )
  }
}



const sortTodos = function ( todos , type, dir ) {
  let todosSorted = JSON.parse( JSON.stringify(todos) )

  switch (type) {
    case 0:
      todosSorted = sortById (todosSorted, dir)
      break
    case 1:
      todosSorted = sortByAlph (todosSorted, dir)
      break
    case 2:
      todosSorted = sortByStatus (todosSorted, dir)
      break
    default:
      break
  }

  return todosSorted
}

const sortById = function ( todos, dir ) {
  return dir ? 
    todos.sort( (a, b) => a.id - b.id ) : 
    todos.sort( (a, b) => b.id - a.id )
}

const sortByAlph = function ( todos, dir ) {
  const mapped = todos.map( (el, i) => ({
    ind: i,
    id: dir ? el.id : -(el.id),
    title: el.title.toLowerCase(),
  }))

  mapped.sort( (a, b) => {
    if ( a.title > b.title ) return 1
    if ( a.title < b.title ) return -1
    return a.id - b.id
  })

  return dir ? 
    mapped.map( el => todos[el.ind] ) : 
    mapped.map( el => todos[el.ind] ).reverse()
}

const sortByStatus = function ( todos, dir ) {
  const completed = sortById(
    todos.filter( el => el.completed 
  ), true)
  const uncompleted = sortById(
    todos.filter( el => !el.completed 
  ), true)
  return dir ? 
    completed.concat(uncompleted) : 
    uncompleted.concat(completed)
}