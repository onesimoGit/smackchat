<template>
  <div>

    <h5 v-if="tab == 'login'" ><b>Login</b></h5>
    <h5 v-else ><b>Registar</b></h5>

    <q-form @submit='submeter' >
      <q-input
      color="teal"
      filled
      v-model="formulario.nome"
      label="Nome"
      v-if="tab == 'registar'"
      square
      style='font-size: 16px' >

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
      class='q-pt-md'
      style='font-size: 16px' >

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
      class='q-pt-md'
      square >

        <template v-slot:prepend >
          <q-icon name="event" />
        </template>
      </q-input>

      <q-btn
        color='green'
        type='submit'
        :label='tab'
        class='text-weight-bold q-mt-lg'
        square />
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
        email: '@gostosa.com',
        password: ''
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
