<template>
  <div class="q-pa-md" style="max-width: 350px" >
    <q-toolbar class="bg-primary text-white shadow-2" >
      <q-toolbar-title>Usuários</q-toolbar-title>
    </q-toolbar>

    <q-list bordered >
      <q-item v-for="user in users" :key="user.id" class="q-my-sm" clickable v-ripple to='/chat' >
        <q-item-section avatar >
          <q-avatar color="primary" text-color="white" >
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side >
          <q-badge
          :color="user.online ? 'light-green' : 'grey-6'"
          >
          {{ user.online ? 'online' : 'offline' }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [
        {
          id: 2324,
          name: 'Vera',
          online: true
        },
        {
          id: 3444,
          name: 'Lily',
          online: false
        },
        {
          id: 4311,
          name: 'Louca',
          online: true
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style type="text/css" >
</style>
