<template>
  <div class="q-pa-md" style="" >
    <q-toolbar class="bg-primary text-white" >
      <q-toolbar-title><b>Usuários</b></q-toolbar-title>
    </q-toolbar>

    <q-list >
      <q-item v-for="(ela, key) in elas" :key="key" class="q-my-sm" clickable v-ripple :to="'/chat/' + key" >
        <q-item-section avatar >
          <q-avatar color="primary" text-color="white" class='text-weight-bold' >
            {{ ela.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class='text-h6' ><b>{{ ela.name }}</b></q-item-label>
        </q-item-section>

        <q-item-section side >
          <q-icon
          :color="ela.online ? 'light-green' : 'grey-6'"
          name='fiber_manual_record' ></q-icon>
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
