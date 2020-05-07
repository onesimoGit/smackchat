import { firebaseAuth, firebaseDb } from 'boot/firebase'
import Vue from 'vue'

let messagesRef

const state = {
  detalhesDoUsuario: {},
  elas: {
    'wYhjstmLkMhtKcEiI0LCJHLdFu42': {
      'name': 'Vera',
      'email': 'vera@gostosa.com',
      'online': true
    },
    '5K3nl8Ujm8doLiX7MWEBDHOSWII2': {
      'name': 'Lily',
      'email': 'lily@gostosa.com',
      'online': false
    },
    'CKfGRbOoqrMZW1FBz3ZYFIous8A2': {
      'name': 'Louca',
      'email': 'louca@gostosa.com',
      'online': false
    }
  },
  messages: {}
}

const mutations = {
  setDetalhesDoUsuario (state, payload) {
    console.log('setting user details ...')
    state.detalhesDoUsuario = payload
  //  Vue.set(state.detalhesDoUsuario, payload.id, payload.ela)
  },
  unsetDetalhesDoUsuario (state, payload) {
    console.log('unsetting user details ...')
    state.detalhesDoUsuario = payload
  },
  updateDetalhesDoUsuario (state, payload) {
    console.log('update state to online: true : ')
    console.log(payload)
    state.detalhesDoUsuario.online = payload.updates.online
  //  Object.assign(state.detalhesDoUsuario[payload.id], payload.updates)
  },
  adicionarMensagens (state, payload) {
    Vue.set(state.messages, payload.id, payload.message)
  //  console.log(state.messages)
  },
  clearMessages (state) {
    state.messages = {}
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
        console.log('usuario logado')
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  updateOnlineStatus ({ eslintObrigatorio }, payload, state) {
    console.log('update firebase online status to true')
    console.log(payload)
    firebaseDb.ref('users/' + payload.id).update(payload.updates)
  },
  handleAuthStateChanged ({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()

          console.log('from the snapshot: ', userDetails)

          commit('setDetalhesDoUsuario', {
            id: userId,
            nome: userDetails.name,
            email: userDetails.email,
            online: userDetails.online // aqui o online vem como false
          })

          commit('updateDetalhesDoUsuario', {
            id: userId,
            updates: { online: true }
          })

          dispatch('updateOnlineStatus', {
            id: userId,
            updates: {
              online: true
            }
          })

          this.$router.push('/users')
        })
      } else {
        console.log('Ninguem logado')

        console.log('state.detalhesDoUsuario.id')
        console.log(state.detalhesDoUsuario.id)

        if (state.detalhesDoUsuario.id) {
          dispatch('updateOnlineStatus', {
            id: state.detalhesDoUsuario.id,
            updates: {
              online: false
            }
          })

          commit('unsetDetalhesDoUsuario', {})
          this.$router.replace('/auth')
        }
      }
    })
  },
  logout () {
    console.log('signed out ...')
    firebaseAuth.signOut()
  },
  firebaseGetMessages ({ state, commit }, chatUserId) {
    let meuId = state.detalhesDoUsuario.id

    messagesRef = firebaseDb.ref('chats/' + meuId + '/' + chatUserId)

    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key

      commit('adicionarMensagens', {
        id: messageId,
        message: messageDetails
      })
    })
  },
  stopGettingMessages ({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  sendMessage ({ state }, payload) {
    console.log(payload.otherUserId)
    firebaseDb.ref('chats/' + state.detalhesDoUsuario.id + '/' + payload.otherUserId)
      .push(payload.toSend)

    payload.toSend.from = 'them'

    firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.detalhesDoUsuario.id)
      .push(payload.toSend)
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
