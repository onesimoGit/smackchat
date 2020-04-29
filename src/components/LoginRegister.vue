<template>
  <div>
    <h5>{{ tab }}</h5>

    <q-form @submit='submeter' >
      <q-input
      color="teal"
      filled
      v-model="nome"
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
      v-model="email"
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
      v-model="password"
      label="Password"
      class='q-pt-md' >

        <template v-slot:prepend >
          <q-icon name="event" />
        </template>
      </q-input>

      <q-btn
      color='green'
      type='submit'
      :label='tab' />
    </q-form>

  </div>
</template>

<script>

export default {
  name: 'LoginRegister',
  props: ['tab'],
  data () {
    return {
      nome: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submeter () {
      if (this.tab === 'login') {
        console.log('para login')
      } else if (this.tab === 'registar') {
        console.log('para registar')
      }
    }
  }
}

</script>

<style>
</style>
