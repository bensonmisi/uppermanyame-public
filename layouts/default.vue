<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      dark
       color="indigo darken-4"
      height="100px"
    >
      <v-toolbar-title > 
     <v-img src="/logo.png" to="/" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn large text to="/auth/login">Login Account</v-btn>
    </v-app-bar>
    <v-main>
     
        <Nuxt />
    
    </v-main>
    <v-footer
      fixed
      app
    >
      <span>&copy; UMSCC @ {{ new Date().getFullYear() }}</span>
       <v-spacer/>Developed by Anixsys Ptvt Ltd
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      fixed:false
    }
  }
}
</script>
