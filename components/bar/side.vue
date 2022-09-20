<template>
    <v-navigation-drawer
      elevation-1
          color="indigo darken-4"
      dark
      app
      permanent
    >
      <v-toolbar-title class="pa-2">
        <img  src="/logo.png" width="180px"/>
      </v-toolbar-title>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>

<script>
export default {
 data(){
    return{
          items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' ,url:"/dashboard" },
          { title: 'My Permits', icon: 'mdi-account-box' ,url:"/permits"},
          { title: 'My Properties', icon: 'mdi-bank' ,url:"/myproperty"},
          { title: 'My Bills', icon: 'mdi-account-box' ,url:"/bills"},
          { title: 'My Statement', icon: 'mdi-file-table' ,url:"/statement"},
          { title: 'My Payments', icon: 'mdi-cash-check' ,url:"/payments"},
          { title: 'Invoices', icon: 'mdi-receipt' ,url:"/invoices"},
        ],
    }
 },methods:{
  async logout(){
   await this.$auth.logout()
 }
 }
}
</script>

<style>

</style>