<template>
  <div>
       <v-btn  rounded color="primary" x-small depressed @click="TrackApplication">Track Permit</v-btn>
        <v-dialog v-model="dialog" width="700px">
            <v-card>
                <v-card-title>Track Application
                    <v-spacer/>
                    <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                                <tr><th>Engineer Inspection</th><td :class="application.engineer=='PENDING' ? `orange--text`:application.engineer=='RECOMMENDED'?`green--text` :`red--text`"><b>{{application.engineer}}</b></td></tr>
                                <tr><th>Subcatchment Council Approval</th><td :class="application.subcatchmentcouncil=='PENDING' ? `orange--text`:application.subcatchmentcouncil=='RECOMMENDED'?`green--text` :`red--text`"><b>{{application.subcatchmentcouncil}}</b></td></tr>
                                 <tr><th>Catchment Manager Approval</th><td :class="application.catchmentmanager=='PENDING' ? `orange--text`:application.catchmentmanager=='RECOMMENDED'?`green--text` :`red--text`"><b>{{application.catchmentmanager}}</b></td></tr>
                                  <tr><th>Catchment Council Approval</th><td :class="application.council=='PENDING' ? `orange--text`:application.council=='RECOMMENDED'?`green--text` :`red--text`"><b>{{application.council}}</b></td></tr>
                                   <tr><th>Overal  Approval</th><td :class="application.overall=='PENDING' ? `orange--text`:application.overall=='RECOMMENDED'?`green--text` :`red--text`"><b>{{application.overall}}</b></td></tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-dialog>
        
  </div>
</template>

<script>
export default {
props:['id'],
data(){
 return{
    dialog:false
 }
},
methods:{
    async TrackApplication(){
        await this.$store.dispatch('application/trackApplication',this.id)
        this.dialog = true
    }
},
computed:{
    application(){
        return this.$store.state.application.application
    }
}
}
</script>

<style>

</style>