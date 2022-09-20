<template>
  <div class="mt-5">
       <v-alert
      prominent
      type="info"
       text
    >
      <v-row align="center">
        <v-col class="grow">
         If you are already in possesion of valid permits please click on manual permits to add permit details
        </v-col>
        <v-col class="shrink">
          <v-btn rounded depressed color="success" @click="getData">Manual Permits</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-dialog v-model="manualDialog" width="1200px">
      <v-card>
        <v-card-title>
          Manual Permits
          <v-spacer/>
          <RequestAdd/>
          <v-btn small class="ml-2" rounded depressed color="error" @click="getData()"><v-icon>mdi-close</v-icon> Close</v-btn>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                   <th>Property</th>
                   <th>Application Year</th>
                   <th>Permit Type</th>
                   <th>Permit Number</th>
                   <th>Type</th>
                   <th>Expiry Date</th>
                   <th>Approval Status</th>
                   <th>Comment</th>
              </tr>
              </thead>
              <tbody>
                <template v-if="permits && permits.length>0">
                <tr v-for="permit in permits" :key="permit.id">
                  <td><small>{{permit.address}}</small></td>
                  <td><small>{{permit.regyear}}</small></td>
                  <td><small>{{permit.permittype}}</small></td>
                  <td><small>{{permit.permitnumber}}</small></td>
                  <td><small>{{permit.type}}</small></td>
                  <td><small>{{permit.expire_date}}</small></td>
                  <td :class="permit.status=='APPROVED' ? `green--text` : permit.status=='PENDING' ? `orange--text` :`red--text`"><small><b>{{permit.status}}</b></small></td>
                  <td></td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="6" class="text-center red--text">No Records Found</td>
                  </tr>
                </template>
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
  data(){
    return{
      manualDialog:false
    }
  },
  methods:{
    async getData(){
        await this.$store.dispatch("property/getData");
        await this.$store.dispatch("settings/getData");
        await this.$store.dispatch('manualpermits/getData')
        this.manualDialog=true
    }
  },
  computed:{
    permits(){
      return this.$store.state.manualpermits.data
    }
  }
}
</script>

<style>

</style>