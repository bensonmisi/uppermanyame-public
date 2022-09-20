<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">My Statement</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
           <div>
            <v-btn small text to="/myproperty">Properties</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>My Statement</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        
            <v-card class="mt-5">  
        <v-card-title>
            <div class="title">My Statement</div>
            <v-spacer/>
 
            </v-card-title>    
        <v-card-text>
          <v-card outlined>
            <v-card-text>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>PPnumner</th>
                  <th>Address</th>
                  <th>Account Number</th>                
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{statement.ppnumber}}</td>
                  <td>{{statement.address}}</td>
                  <td>{{statement.accountnumber}}</td>
                </tr>
              </tbody>

            </template>
          </v-simple-table>
            </v-card-text>
          </v-card>
          <v-row class="mt-3">
            <v-col>
              <v-card outlined>
                <v-card-title>Totals(USD)</v-card-title>
                <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr><th>Total Debit</th><td class="text-right">{{`USD`+totals.debitusd}}</td></tr>
                        <tr><th>Total Credit</th><td class="text-right">{{`USD`+totals.creditusd}}</td></tr>
                        <tr><th>Balance</th><td class="text-right">{{`USD`+(totals.debitusd-totals.creditusd)}}</td></tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
             <v-col>
              <v-card outlined>
                <v-card-title>Totals(ZWL)</v-card-title>
                <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr><th>Total Debit</th><td class="text-right">{{`ZWL`+totals.debitzwl}}</td></tr>
                        <tr><th>Total Credit</th><td class="text-right">{{`ZWL`+totals.creditzwl}}</td></tr>
                        <tr><th>Balance</th><td class="text-right">{{`ZWL`+(totals.debitzwl-totals.creditzwl)}}</td></tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col>
              <v-card outlined>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>AutoIdx</th>
                          <th>Description</th>
                          <th>Debit</th>
                          <th>Credit</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="statement.statements && statement.statements.length>0">
                          <tr v-for="sta in statement.statements" :key="sta.id">
                            <td>{{sta.txdate}}</td>
                            <td>{{sta.autoIdx}}</td>
                            <td>{{sta.description}}</td>
                            <td>{{sta.currency}}{{sta.debit}}</td>
                            <td>{{sta.currency}}{{sta.credit}}</td>
                            <td>{{sta.currency}}{{sta.outstanding}}</td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="6" class="text-center red--text">No Statement Found</td>
                          </tr>
                        </template>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
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
    let id = this.$route.params.id
     await this.$store.dispatch('statement/getData',id)
  },
  computed: {
    statement() {
      return this.$store.state.statement.data
    },
    totals(){
      let debitusd =0
      let creditusd=0
      let debitzwl= 0
      let creditzwl=0

      let data = this.$store.state.statement.data.statements
      console.log(data)
      if(data)
      {
      if(data.length>0){
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if(element.currency.toUpperCase() =='USD')
          {
          debitusd = debitusd + Number(element.debit)
          creditusd = creditusd + Number(element.credit)
          }
          if(element.currency.toUpperCase() =='ZWL'){
           debitzwl = debitzwl + Number(element.debit)
          creditzwl = creditzwl + Number(element.credit) 
          }
          
        }
      }
      }
      return {debitusd:debitusd,creditusd:creditusd,debitzwl:debitzwl,creditzwl:creditzwl}
    }
  },
};
</script>

<style>
</style>