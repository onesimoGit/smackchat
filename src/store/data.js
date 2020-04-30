import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
  detalhesDoUsuario: {}
}

const mutations = {
  setDetalhesDoUsuario (state, payload) {
    console.log('setting user details to empty ...')
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
  updateOnlineStatus ({ eslintObrigatorio }, payload) {
    firebaseDb.ref('users/' + payload.userId).update(payload.updates)
  },
  handleAuthStateChanged ({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()

          console.log('userDetails: ', userDetails)

          commit('setDetalhesDoUsuario', {
            id: userId,
            nome: userDetails.name,
            email: userDetails.email,
            online: userDetails.online
          })

          dispatch('updateOnlineStatus', {
            userId: state.detalhesDoUsuario.id,
            updates: {
              online: true
            }
          })

          this.$router.push('/')
        })
      } else {
        console.log('Ninguem logado nessuno')

        dispatch('updateOnlineStatus', {
          userId: state.detalhesDoUsuario.id,
          updates: {
            online: false
          }
        })

        commit('setDetalhesDoUsuario', {})
        this.$router.replace('/auth')
      }
    })
  },
  logout () {
    console.log('signed out ...')
    firebaseAuth.signOut()
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
