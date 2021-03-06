import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
    data: []
}
/* pour garder les données mis à jour*/
const mutations = {
    RECEIVE_CHARACTERS(state, { characters }) {
        state.data = characters
    }
}
/* lors d'une action sur les données*/
const actions = {
    async FETCH_CHARACTERS({ commit }, name) {
        const url = `https://rickandmortyapi.com/api/character/${name}`
        const { data } = await axios.get(url)
        commit('RECEIVE_CHARACTERS', { characters: data.results })
    }
}
/*récupérer les données */
const getters = {
    characters: state => {
        return state.data.map(data => {
            return {
                name: data.name,
                url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
                image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
                description: data.description === '' ? 'No description listed for this character.' : data.description
            }
        })
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store