<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">My Payments</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>My Payments</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        
            <v-card class="mt-5">  
        <v-card-title>
            <div class="title">My Payments</div>
            <v-spacer/>
 
            </v-card-title>    
        <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Method</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                      <template v-if="suspense && suspense.length>0">
                        <tr v-for=" sus in suspense" :key="sus.id">
                            <td>{{sus.date}}</td>
                            <td>{{sus.address}}</td>
                            <td>{{sus.method}}</td>
                            <td>{{sus.currency}}{{sus.amount}}</td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr><td colspan="4" class="text-center red--text">No Records Found </td></tr>
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
    await this.$store.dispatch('clientsuspense/getData')
  },
  computed: {
     suspense() {
      return this.$store.state.clientsuspense.data
    }
  },
};
</script>

<style>
</style>