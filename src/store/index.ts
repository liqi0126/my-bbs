import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userId: 0,
    currentPage: 1,
    showBookmark: false,
    bookmark: {},
    showHistory: false,
    browseHistory: []
  },
  mutations: {
    setCurrentPage (state, page) {
      state.currentPage = page
      localStorage.currentPage = page
    },
    login (state, payload) {
      state.token = payload.token
      localStorage.token = payload.token

      state.userId = payload.userId
      localStorage.userId = payload.userId
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')

      state.userId = 0
      localStorage.removeItem('userId')
      localStorage.clear()
    },
    addBookMark (state, post) {
      if (localStorage.bookmark !== undefined) {
        state.bookmark = JSON.parse(localStorage.bookmark)
      }
      state.bookmark[post.id] = post
      localStorage.bookmark = JSON.stringify(state.bookmark)
    },
    removeBookMark (state, id) {
      if (localStorage.bookmark !== undefined) {
        state.bookmark = JSON.parse(localStorage.bookmark)
      }
      delete state.bookmark[id]
      localStorage.bookmark = JSON.stringify(state.bookmark)
    },
    enableBookmark (state) {
      state.showBookmark = true
    },
    disableBookmark (state) {
      state.showBookmark = false
    },
    enableHistory (state) {
      state.showHistory = true
    },
    disableHistory (state) {
      state.showHistory = false
    },
    addHistory (state, newHistory) {
      if (localStorage.browseHistory !== undefined) {
        state.browseHistory = JSON.parse(localStorage.browseHistory)
      }
      state.browseHistory.push(newHistory)
      localStorage.browseHistory = JSON.stringify(state.browseHistory)
    }
  },
  getters: {
    getCurrentPage (state) {
      if (localStorage.currentPage != null) {
        state.currentPage = localStorage.currentPage
      }
      return state.currentPage
    },
    getToken (state) {
      if (localStorage.token != null) {
        state.token = localStorage.token
      }
      return state.token
    },
    getUserId (state) {
      if (localStorage.userId != null) {
        state.userId = localStorage.userId
      }
      return state.userId
    },
    getBookmark (state) {
      if (localStorage.bookmark != null) {
        state.bookmark = JSON.parse(localStorage.bookmark)
      }
      return state.bookmark
    },
    getHistory (state) {
      if (localStorage.browseHistory != null) {
        state.browseHistory = JSON.parse(localStorage.browseHistory)
      }
      if (state.browseHistory != null) {
        return state.browseHistory.reverse()
      } else {
        return null
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
