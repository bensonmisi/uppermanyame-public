<template>
  <div>
    <v-btn rounded color="primary" small depressed @click="getData">Add Item</v-btn>
    <v-dialog width="800px" v-model="addDialog">
      <v-card rounded="0">
         <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
          <v-toolbar-title>Add Invoice item</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="addDialog=false"><v-icon>mdi-close</v-icon></v-btn>
         </v-app-bar>
         <v-card-text>
          <template v-if="application && application.permittype">
            <template v-if="application.permittype.code=='GW1'">
            <InvoiceBorehole :application="application" :uom="uom"/>
            </template>
              <template v-else-if="application.permittype.code=='GW4'">
            <InvoiceGwabstraction :application="application" :uom="uom" :boreholes="boreholes" :purpose="settings.purposelist"/>
            </template>
             <template v-else-if="application.permittype.code=='W1'">
            <InvoiceSurfacewater :application="application" :uom="uom" :dams="settings.streams" :purpose="settings.purposelist"/>
            </template>
          </template>
         </v-card-text>
         
  
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
 props:['application'],
 data(){
  return{
    addDialog:false
  }
 },
 methods:{
  async getData(){
    await this.$store.dispatch("settings/getData")
    await this.$store.dispatch('boreholes/getData')
    this.addDialog=true
  }  
     
 },
 computed:{
  uom(){
    return this.$store.state.settings.data.uom
  },
   boreholes(){
        return this.$store.state.boreholes.data
    },
    settings(){
        return this.$store.state.settings.data
    }
 }
}
</script>

<style>

</style>