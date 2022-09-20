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
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Type</th>
                            <th class="blue--text">Amount Due</th>
                            <th class="green--text">Amount Paid</th>
                            <th class="red--text">Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
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
  },
  computed: {
    bills() {
    }
  },
};
</script>

<style>
</style>