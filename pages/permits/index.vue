<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">Permit Applications</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>Permit Applications</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        
            <v-card class="mt-5">  
        <v-card-title>
            <div class="title">Permit Applications</div>
            <v-spacer/>
 <v-btn rounded small depressed class="indigo white--text" to="/permits/new">New Application</v-btn>
            </v-card-title>    
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Address</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Expiry Date</th>
                            <th>Permit Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="permits && permits.length>0">
                        <tr v-for="permit in permits" :key="permit.id">
                            <td><small>{{permit.id}}</small></td>
                            <td><small>{{permit.property.address}}</small></td>
                            <td><small>{{permit.permittype.name}}</small></td>
                            <td :class="permit.status=='ACTIVE' ? `green--text` : permit.status=='PENDING' ? `orange--text` :`red--text`"><small><b>{{permit.status}}</b></small></td>
                            <td><small>{{permit.expiry_date}}</small></td>
                            <td><small>{{permit.permitnumber}}</small></td>
                            <td class="text-right">
                                <v-btn v-if="permit.status=='ACTIVE'" rounded color="success" x-small depressed><v-icon small>mdi-download</v-icon> Download</v-btn>
                                <v-btn v-else-if="permit.status=='EXPIRED'" rounded color="error" x-small depressed><v-icon small>mdi-sync</v-icon> Renew</v-btn>
                                 <v-btn v-else-if="permit.status=='PENDING'" rounded color="warning" x-small depressed to="/permits/new"><v-icon small>mdi-chevron-double-right</v-icon> Continue</v-btn>
                                 <PermitsTrack v-else :id="permit.id"/>
                            </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="6" class="text-center red--text">No permits found</td>
                            </tr>
                        </template>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
      
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "user",
  async mounted() {
    await this.$store.dispatch("application/getAll")
  },
  methods: {
    async getData() {},
  },
  computed: {
    permits() {
      return this.$store.state.application.applications;
    }
  },
};
</script>

<style>
</style>