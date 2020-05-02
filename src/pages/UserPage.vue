<template>
  <div class="q-pa-md" style="max-width: 350px" >
    <q-toolbar class="bg-primary text-white shadow-2" >
      <q-toolbar-title>Usuários</q-toolbar-title>
    </q-toolbar>

    <q-list bordered >
      <q-item v-for="(ela, key) in elas" :key="key" class="q-my-sm" clickable v-ripple :to="'/chat/' + key" >
        <q-item-section avatar >
          <q-avatar color="primary" text-color="white" >
            {{ ela.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ ela.name }}</q-item-label>
        </q-item-section>

        <q-item-section side >
          <q-badge
          :color="ela.online ? 'light-green' : 'grey-6'"
          >
          {{ ela.online ? 'online' : 'offline' }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapState('data', ['elas', 'detalhesDoUsuario'])
  }
}
</script>

<style type="text/css" >
</style>
