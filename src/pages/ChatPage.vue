<template>

  <q-page class='flex column' >
    <q-banner class='text-white bg-orange' >
      Perdeu conexão com a internet
    </q-banner>

    <!-- chat message -->
    <div class="column col justify-end" >
      <q-chat-message
      v-for='message in messages'
      :key='message.id'
      :text="[message.text]"
      :from="message.from"
      :sent="message.from == 'eu' ? true : false"
      />
    </div>

    <!-- o foooter -->
    <q-footer>
      <q-toolbar>

        <q-form @submit='submeter' class='full-width' >
          <q-input
          v-model="text"
          label="Mensagem"
          outlined
          dense
          bg-color='white'
          >
            <template v-slot:after >
              <q-btn round dense flat icon="send" type="submit" @click='submeter' />
            </template>
          </q-input>
        </q-form>

      </q-toolbar>
    </q-footer>

  </q-page>
</template>

<script>

export default {
  data () {
    return {
      text: '',
      ph: '',

      dense: false,
      messages: [
        {
          id: 233,
          text: 'Olá, estou bem como todo mundo',
          from: 'eu'
        },
        {
          id: 325,
          text: 'Vai a esquina',
          from: 'ela'
        },
        {
          id: 579,
          text: 'Vamo juntos',
          from: 'eu'
        }
      ]
    }
  },
  methods: {
    submeter () {
      this.messages.push({
        text: this.text,
        from: 'eu'
      })
    }
  }
}
</script>

<style >
</style>
