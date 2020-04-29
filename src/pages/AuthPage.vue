<template>

  <div class="q-gutter-y-md q-pt-xs q-mt-sm" >
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="registar" label="Registar" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated >
        <q-tab-panel name="login" >

          <!-- login/register -->
          <login-register :tab='tab' />
        </q-tab-panel>

        <q-tab-panel name="registar" >

          <!-- login/register -->
          <login-register :tab='tab' />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>

</template>

<script>

import LoginRegister from '../components/LoginRegister'

export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components: { LoginRegister },
  methods: {
  }
}

</script>

<style>
</style>
