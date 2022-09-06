<template>
    <v-app-bar
     flat
 light
      app
      dark
      class="white"
    >
   

    

      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
         fab
         small
            v-bind="attrs"
            v-on="on"
            color="white"
          >
            <v-icon color="indigo">mdi-account-circle</v-icon>
          </v-btn>
        </template>
   
      <v-card rounded="0">
        <v-toolbar dense>
            <v-toolbar-title  class="caption">Welcome: {{loggedInUser.name}} {{loggedInUser.surname}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-list>
          <v-list-item to="profile">
            <v-list-item-title>Profile Settings</v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list-item to="password">
             <v-list-item-title>Change Password</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn block color="error" @click="logout">logout</v-btn>
        </v-card-actions>
      </v-card>
      </v-menu>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
methods:{
async logout(){
   await this.$auth.logout()
 }
}, 
computed:{
  ...mapGetters(['loggedInUser']),
   }
}
</script>

<style>

</style>