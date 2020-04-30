<template>
  <div>

    <h5>{{ tab }}</h5>

    <q-form @submit='submeter' >
      <q-input
      color="teal"
      filled
      v-model="formulario.nome"
      label="Nome"
      v-if="tab == 'registar'" >

        <template v-slot:prepend >
          <q-icon name="event" />
        </template>
      </q-input>

      <q-input
      color="teal"
      filled
      type='email'
      v-model="formulario.email"
      label="Email"
      class='q-pt-md' >

        <template v-slot:prepend >
          <q-icon name="event" />
        </template>
      </q-input>

      <q-input
      color="teal"
      filled
      type='password'
      v-model="formulario.password"
      label="Password"
      class='q-pt-md' >

        <template v-slot:prepend >
          <q-icon name="event" />
        </template>
      </q-input>

      <q-btn
      color='green'
      type='submit'
      :label='tab'
      class='q-mt-xs' />
    </q-form>

  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'LoginRegister',
  props: ['tab'],
  data () {
    return {
      formulario: {
        nome: '',
        email: 'vera@gostosa.com',
        password: 'veravera'
      }
    }
  },
  methods: {
    ...mapActions('data', ['registar', 'login']),

    submeter () {
      if (this.tab === 'login') {
        this.login(this.formulario)
      } else if (this.tab === 'registar') {
        this.registar(this.formulario)
      }
    }
  }
}

</script>

<style>
</style>
