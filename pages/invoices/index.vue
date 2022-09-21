<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">My Invoices</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>My Invoices</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        
            <v-card class="mt-5">  
        <v-card-title>
            <div class="title">My Invoices</div>
            <v-spacer/>
 
            </v-card-title>    
        <v-card-text>
                 <v-simple-table>
          <template v-slot:default>
            <thead dark>
              <tr class="text--white" dark>
                <th>Date</th>
                <th>Address</th>
                <th>Invoice Number</th>
                <th>Permit Type</th>
                <th>Exchange Rate</th>
                <th class="text-center">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="invoices.length>0">
               <tr v-for="inv in invoices" :key="inv.id">
                <td><small>{{inv.date | simpleDateformate}}</small></td>
                <td><small>{{inv.address}}</small></td>
                <td><small>{{inv.invoicenumber}}</small></td>
                <td><small>{{inv.permittype}}</small></td>
                <td><small>{{`1:`+inv.exchangerate}}</small></td>
                <td class="text-center"><small>{{inv.currency}}{{inv.amount}}</small></td>
                <td><small>{{inv.status}}</small></td>
               
               </tr>
            
              </template>
              <template v-else>
                <tr>
                  <td colspan="6" class="text-center red--text">No Invoice Items Found</td>
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

    await this.$store.dispatch('invoice/getAll')
  },
  computed: {
    invoices() {
      return this.$store.state.invoice.data
    }
  },
};
</script>

<style>
</style>