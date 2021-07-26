export const state = () => ({
  users: [],
  // выбранные пользователи
  selectedUsers: [],

  APIloadingStarted: false,
  APIloadingCompleted: false,
  APIloadingError: undefined,
  URL: 'https://jsonplaceholder.typicode.com/users',
})

export const getters = {
  getUsers: state => state.users,
  getUserById: state => id => state.users.find( el => el.id === id ),
  getSelectedUsers: state => state.selectedUsers,
  // проверяет, выбран ли пользователь
  hasSelectedUser: state => id => state.selectedUsers.includes(id),
  // проверяет, все ли пользователи выбраны
  allUsersSelected: state => state.selectedUsers.length === state.users.length,

  getLoadingStarted: state => state.APIloadingStarted,
  getLoadingCompleted: state => state.APIloadingCompleted,
  getLoadingError: state => state.APIloadingError,
}

export const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  setSelectedUsers(state, users) {
    state.selectedUsers = users
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

  // находит пользователей, у которых есть задачи
  async findUsersWithTodos ( { commit, rootGetters, dispatch } ) {
    // создаем массив id пользователей
    const usersIdRepeat = rootGetters['todos/getAllTodos'].map( el => el.userId)
    const usersId = []
    usersIdRepeat.forEach(id => {
      if (!usersId.includes(id)) usersId.push(id)
    });

    try {
      commit ('loadingStart')
      // записываем их как выбранных
      commit('setSelectedUsers', usersId)
      // получаем пользователей и фильтруем
      const users = await dispatch('APIgetUsers')
      users.filter( el => usersId.includes(el.id) )
      // записываем
      commit('setUsers', users)
      commit ('loadingComplete')
    }
    catch (e) {
      commit ('loadingError', e)
      window.$nuxt.error(e)
    }
    
  },

  // запрос пользователей
  async APIgetUsers ({ state }) {
    let users = []
    users = await this.$axios.$get(state.URL)
    return users
  },

  // выбор одного пользователя
  selectUser ( { commit, state, dispatch }, userId) {
    const newSelectedUsers = state.selectedUsers.slice()

    // если выбран убираем
    if ( newSelectedUsers.includes( userId ) ) {
      newSelectedUsers.splice(
        newSelectedUsers.findIndex( el => el === userId )
      , 1)
    } else {
      // иначе добавляем
      newSelectedUsers.push(userId)
    }

    // записываем
    commit('setSelectedUsers', newSelectedUsers)
    // фильтрация задач
    dispatch('todos/filterTodosByUsers', null, { root: true })
  },

  // выбрать всех
  selectAllUsers ( { commit, state, dispatch } ) {
    const newSelectedUsers = state.users.map( el => el.id )
    commit('setSelectedUsers', newSelectedUsers)
    dispatch('todos/filterTodosByUsers', null, { root: true })
  },

  // убрать всех
  removeAllUsers ( { commit, dispatch } ) {
    commit('setSelectedUsers', [])
    dispatch('todos/filterTodosByUsers', null, { root: true })
  },

}


