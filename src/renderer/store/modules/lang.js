import * as types from '../mutation-types'

const { locale, locales } = { locale: 'en', locales: ['de', 'en'] }

// state
export const state = {
  locale: locale, 
  locales: locales
}

// getters
export const getters = {
  locale: state => state.locale,
  locales: state => state.locales
}

// mutations
export const mutations = {
  [types.SET_LOCALE] (state, { locale }) {
    state.locale = locale
  }
}

// actions
export const actions = {
  setLocale ({ commit }, { locale }) {
    commit(types.SET_LOCALE, { locale })

    // Cookies.set('locale', locale, { expires: 365 })
  }
}
