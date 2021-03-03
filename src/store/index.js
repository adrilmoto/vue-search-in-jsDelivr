import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packages: []
  },
  getters: {
    packages (state) {
      return state.packages
    }
  },
  mutations: {
    ADD_PACKAGES (state, packages) {
      state.packages = packages
    },
    // addPopularPackages (state, payload) {
    //   state.data = payload.data
    // },
    addInfoPackage (state, payload) {
      state.package = payload
    }
  },
  actions: {
    async fetchPackage (_, p) {
      try {
        // package
        let urlPackage = `https://data.jsdelivr.com/v1/package/${p.type}/${p.name}/badge/year?style=rounded`
        const {data: dataPackage} = await axios(urlPackage, {method: 'GET'})
        console.log('dataPackage', dataPackage)
        // versions
        const urlVersions = `https://data.jsdelivr.com/v1/package/${p.type}/${p.name}`
        const {data: dataVersions} = await axios(urlVersions, {method: 'GET'})
        console.log('dataVersions', dataVersions)
        // files
        const urlFiles = `https://data.jsdelivr.com/v1/package/${p.type}/${p.name}@${dataVersions.tags.latest}`
        const {data: dataFiles} = await axios(urlFiles, {method: 'GET'})
        console.log('dataFiles', dataFiles)
        // done
        return {
          package: dataPackage,
          versions: dataVersions,
          files: dataFiles
        }
      }
      catch (e) {
        throw new Error(e)
      }
    },
    fetchPackages ({ commit }, {q, page}) {
      return new Promise((resolve, reject) => {
        console.log('fetchPackages start', q, page)
        if (q.length === 0) {
          console.log('fetchPackages POPULAR')
          axios(
            `https://data.jsdelivr.com/v1/stats/packages?limit=10&page=${page}`,
            {
              method: 'GET',
            })
            .then((data) => {
              // if (data.status !== 200) reject()
              console.log('fetchPackages DONE', data)
              commit('ADD_PACKAGES', data.data)
              resolve()
            })
            .catch(e => {
              reject(e)
            })
        }
        // search with query string is possible only with npm...
        else {
          console.log('fetchPackages SEARCH', q)
          axios(
            `https://registry.npmjs.org/-/v1/search?text=${q}&size=10`,
            {
              method: 'GET',
            })
            .then((data) => {
              console.log('fetchPackages DONE', data)
              resolve(data.data)
            })
            .catch(e => {
              reject(e)
            })
        }
      })
    }
  }
})
