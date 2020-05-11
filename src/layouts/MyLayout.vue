<template>
  <q-layout class='q-layout' view="lHh Lpr lFf" >
    <br>

    <q-header class='q-header' elevated >
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('chat')"
          v-go-back.single
          flat
          dense
          round
          icon="arrow_back"
          label=""
        />

        <q-btn
          v-if="$route.fullPath.includes('auth')"
          v-go-back.single
          flat
          dense
          round
          icon="arrow_back"
          label=""
        />

        <q-toolbar-title>
          <b>{{ titulo }}</b>
        </q-toolbar-title>

        <q-btn
          v-if='!detalhesDoUsuario.online'
          flat
          dense
          round
          icon="account_circle"
          class='absolute-right'
        />
        <q-btn
          v-if='detalhesDoUsuario.online'
          flat
          dense
          round
          icon="account_circle"
          class='q-mr-sm q-btn absolute-right text-weight-bold'
          label="Terminar sessão"
          @click="logoutUser"
        >
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import usuarioAConversar from '../mixins/usuarioAConversar'

export default {
  name: 'MyLayout',
  mixins: [ usuarioAConversar ],
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapState('data', ['detalhesDoUsuario']),

    titulo () {
      let titulo = ''

      if (this.$route.fullPath === '/') {
        titulo = 'Página de Usuários'
      } else if (this.$route.fullPath === '/auth') {
        titulo = 'Página de Autenticação'
      } else {
        titulo = this.usuarioAConversar.name
      }

      return titulo
    }
  },
  methods: {
    ...mapActions('data', ['logout']),
    logoutUser () {
      this.logout()
    }
  }
}

</script>

<style lang='stylus' scoped >
  .q-layout
    font-family: Open Sans Condensed

</style>
