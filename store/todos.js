export const state = () => ({
  todos: [],
  allTodos: [],

  // достуа=пные типы сортировки
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
  // текущая сортировка
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
  getAllTodos: state => state.allTodos,

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
  setAllTodos (state, todos) {
    state.allTodos = todos
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
  // инициализация хранилища
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

  // запрос
  async APIgetAllTodos ( { state, dispatch }) {
    const todos = await this.$axios.$get(state.URL)
    dispatch ('setAllTodos', todos)
  },

  // фильтрует todos по выбранным пользователям
  filterTodosByUsers ( { state, commit, rootGetters } ) {
    const selectedUsers = rootGetters['users/getSelectedUsers']
    const filteredTodos = state.allTodos.filter ( el => selectedUsers.includes(el.userId))
    commit ('setTodos', filteredTodos)
  },

  // записывает все задачи в начале
  setAllTodos ( { commit, state, dispatch }, todos) {
    const todosUpperCase = todos.map( todo => ({
      ...todo,
      title: todo.title.charAt(0).toUpperCase() + todo.title.substr(1)
    }))

    const sortedTodos = sortTodos (todosUpperCase, state.sort.type, state.sort.dir)
    commit('setAllTodos', sortedTodos)
    commit('setTodos', sortedTodos)
  },

  // меняет тип сортировки
  setSortType ( { commit, state }, type) {
    commit ('setSort', {
      type,
      dir: state.sort.dir,
    })

    commit('setTodos', 
      sortTodos (state.todos, state.sort.type, state.sort.dir)
    )
  },

  // меняет порядок сортировки
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


// сортировка
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

// сортировка по id
const sortById = function ( todos, dir ) {
  return dir ? 
    todos.sort( (a, b) => a.id - b.id ) : 
    todos.sort( (a, b) => b.id - a.id )
}

// сортировка по алфавиту
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

// по статусу
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