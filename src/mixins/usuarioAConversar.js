export default {
  computed: {
    usuarioAConversar () {
      if (this.$store.state.data.elas[this.$route.params.blablabla]) {
        return this.$store.state.data.elas[this.$route.params.blablabla]
      } else {
        return {}
      }
    }
  }
}
