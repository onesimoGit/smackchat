import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
  detalhesDoUsuario: {}
}

const mutations = {
  setDetalhesDoUsuario (state, payload) {
    console.log('setting user details ...')
    state.detalhesDoUsuario = payload
  }
}

const actions = {
  registar ({ eslintObrigatorio }, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(feedback => {
        console.log(feedback)
        let randomId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + randomId).set({
          name: payload.nome,
          email: payload.email,
          online: true
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  login ({ eslintObrigatorio }, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(feedback => {
        console.log(feedback)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  handleAuthStateChanged ({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          console.log('userDetails: ', userDetails)
          commit('setDetalhesDoUsuario', {
            nome: userDetails.name,
            email: userDetails.email,
            online: userDetails.online
          })
        })
      } else {
        console.log('Ninguem logado nessuno')
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
