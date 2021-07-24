export const state = () => ({
  users: [],
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
  hasSelectedUser: state => id => state.selectedUsers.includes(id),
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

  async findUsersWithTodos ( { commit, rootGetters, dispatch } ) {

    const usersIdRepeat = rootGetters['todos/getTodos'].map( el => el.userId)
    const usersId = []
    usersIdRepeat.forEach(id => {
      if (!usersId.includes(id)) usersId.push(id)
    });
    try {
      commit ('loadingStart')
      commit('setSelectedUsers', usersId)
      const users = await dispatch('APIgetUsers')
      users.filter( el => usersId.includes(el.id) )
      commit('setUsers', users)
      commit ('loadingComplete')
    }
    catch (e) {
      commit ('loadingError', e)
    }
    
  },

  async APIgetUsers ({ state, commit }) {
    let users = []
    users = await this.$axios.$get(state.URL)
    return users
  },

  selectUser ( { commit, state, dispatch }, userId) {
    const newSelectedUsers = state.selectedUsers.slice()

    if ( newSelectedUsers.includes( userId ) ) {
      newSelectedUsers.splice(
        newSelectedUsers.findIndex( el => el === userId )
      , 1)
    } else {
      newSelectedUsers.push(userId)
    }

    commit('setSelectedUsers', newSelectedUsers)
    dispatch('todos/APIgetTodos', null, { root: true })
  },

  selectAllUsers ( { commit, state, dispatch } ) {
    const newSelectedUsers = state.users.map( el => el.id )
    commit('setSelectedUsers', newSelectedUsers)
    dispatch('todos/APIgetTodos', null, { root: true })
  },

  removeAllUsers ( { commit, dispatch } ) {
    commit('setSelectedUsers', [])
    dispatch('todos/APIgetTodos', null, { root: true })
  },

}


