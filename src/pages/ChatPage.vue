<template>

  <q-page
    ref='chatPage'
    class='q-page flex column' >
    <q-banner
      v-if='!usuarioAConversar.online'
      class='text-black-4 bg-grey-6' >
      <b>{{ usuarioAConversar.name }}</b> Não está online
    </q-banner>

    <br><br>

    <!-- chat message -->
    <div
      :class="{ 'invisible' : !showMessages }"
      class="column col justify-end q-px-md" >

      <q-chat-message
        style='font-size: 16px'
        v-for='(message, key) in messages'
        :key='key'
        :text="[message.text]"
        :name="message.from == 'eu' ? 'eu' : usuarioAConversar.name"
        :from="message.from"
        :sent="message.from == 'eu' ? true : false"
        class='text-weight-bold'
      />
    </div>

    <!-- o foooter -->
    <q-footer class='bg-white q-pt-lg' >
      <q-toolbar class='bg-white q-footer' >

        <q-form @submit='submeter' class='full-width' >
          <q-input
          v-model="message.text"
          label="Mensagem"
          dense
          bg-color='white'
          ref='nuMessage'
          style='font-size: 18px'
          >
            <template v-slot:after >
              <q-btn
                round
                dense
                flat
                icon="send"
                type="submit"
                @click='submeter'
                color='light-green-10' />
            </template>
          </q-input>
        </q-form>

      </q-toolbar>
    </q-footer>

  </q-page>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import usuarioAConversar from '../mixins/usuarioAConversar'

export default {
  mixins: [ usuarioAConversar ],
  data () {
    return {
      text: '',
      ph: '',

      dense: false,

      message: {
        text: '',
        from: 'eu'
      },

      showMessages: false
    }
  },
  methods: {
    ...mapActions('data', ['firebaseGetMessages', 'stopGettingMessages', 'sendMessage']),

    submeter () {
    /*  this.messages.push({
        text: this.text,
        from: 'eu'
      })  */

      let otherUSer = this.$route.params.blablabla

      this.sendMessage({
        toSend: {
          text: this.message.text,
          from: 'eu'
        },
        otherUserId: otherUSer
      })

      this.clearMessage()
    },
    scrollToBottom () {
      let chatPage = this.$refs.chatPage.$el
      setTimeout(() => {
        window.scrollTo(0, chatPage.scrollHeight)
      }, 20)
    },
    clearMessage () {
      this.message.text = ''
      this.$refs.nuMessage.focus()
    }
  },
  mounted () {
    alert('fuck fuck fuck')
    this.firebaseGetMessages(this.$route.params.blablabla)
  },
  computed: {
    ...mapState('data', ['messages', 'detalhesDoUsuario'])
  },
  destroyed () {
    this.stopGettingMessages()
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
        setTimeout(() => {
          this.showMessages = true
        }, 300)
      }
    }
  }
}
</script>

<style lang='stylus' >

</style>
