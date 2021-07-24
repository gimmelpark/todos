export const state = () => ({
  headerHeight: undefined,
  todosHeaderHeight: undefined,
})

export const getters = {
  getHeaderHeight: state => state.headerHeight,
  getTodosHeaderHeight: state => state.todosHeaderHeight,
}

export const mutations = {
  setHeaderHeight (state, h) {
    state.headerHeight = h
  },
  setTodosHeaderHeight (state, h) {
    state.todosHeaderHeight = h
  },
}

export const actions = {
  setHeaderHeight ( { commit }, h) {
    commit('setHeaderHeight', h)
  },
  setTodosHeaderHeight ( { commit }, h) {
    commit('setTodosHeaderHeight', h)
  },
}