<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated >
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('chat')"
          v-go-back.single
          flat
          dense
          round
          icon="arrow_back"
          label="Voltar"
        />

        <q-btn
          v-if="$route.fullPath.includes('auth')"
          v-go-back.single
          flat
          dense
          round
          icon="arrow_back"
          label="Voltar"
        />

        <q-toolbar-title>
          {{ titulo }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="account_circle"
          class='absolute-right'
          to='/auth'
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    titulo () {
      let titulo = ''

      if (this.$route.fullPath === '/') {
        titulo = 'Página de Usuários'
      } else if (this.$route.fullPath === '/auth') {
        titulo = 'Página de Autenticação'
      } else {
        titulo = 'Página de Chat'
      }

      return titulo
    }
  }
}
</script>

<style>
</style>
