<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">New Permit</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>New Permit</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        <Stepper :progress="3"/>
      </div>
      <div class="mt-3">
        <v-card>
        <v-card-title>
          Invoicing
          <v-spacer/>
          <InvoiceAdd :application="application"/>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="invoices.length>0">
               <tr v-for="inv in invoices" :key="inv.id">
                <td>{{inv.createdAt | simpleDateformate}}</td>
                <td>{{inv.property.address}}</td>
                <td>{{inv.invoicenumber}}</td>
                <td><small>{{inv.application.permittype.name}}</small></td>
                <td>{{`1:`+inv.exchangerate.value}}</td>
                <td class="text-center">{{inv.currency.name}}{{inv.amount}}</td>
                <td class="text-right"><v-btn small color="error" depressed @click="deleteitem(inv.id)">delete item</v-btn></td>
               </tr>
               <tr>
                <td colspan="5">Total Invoice</td>
                <td class="text-center">{{invoices[0].currency.name}}{{totalinvoice}}</td>
                <td class="text-right"></td>
               </tr>
                <tr>
                <td colspan="5"></td>
                <td colspan="2"><v-btn small depressed block color="primary">Download Invoice</v-btn></td>
                
               </tr>
               <tr>
                <td colspan="5"></td>
                <td colspan="2"><FinanceDetails :application="application"/></td>
               
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
      <Loader :overlay="loading"/>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "user",
  async mounted() {
    this.loading=true
    this.applicationId = this.$route.params.id
    await this.$store.dispatch('invoice/getById',this.applicationId)
    await this.$store.dispatch('application/getById',this.applicationId)
    this.loading=false
  },
  data(){
  return{
    loading:false,
    applicationId:""
  }
  },
  methods:{
    async deleteitem(id){
        this.$swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async(result) => {
  if (result.isConfirmed) {
       const payload ={id:id,application:this.applicationId}
       await this.$store.dispatch("invoice/deleteData",payload)
    }
})
}
  },computed:{
    invoices(){
      return this.$store.state.invoice.data
    },
    application(){
      return this.$store.state.application.data
    },
    totalinvoice(){
       const data = this.$store.state.invoice.data

       let total = 0
         data.forEach(element => {
             total = total + Number(element.amount)
         });

         return total
    }
  }
};
</script>

<style>
</style>