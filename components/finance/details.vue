<template>
  <div>
    <v-btn small depressed block color="success" @click="getData()">Make Payment</v-btn>
    <v-dialog v-model="showDialog" width="1000px">
        <template v-if="onlinepayments && onlinepayments.length>0">
              <v-card>
                <v-card-title>Pending Online Payments</v-card-title>
                <v-card-text>
                     <v-alert
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
     Our system has detected {{onlinepayments.length}} Payments attempts with PENDING status please click check button for the system to verify if your attemps where successful 
        </v-alert>
            
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Invoice Number</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="payment in onlinepayments" :key="payment.id">
                                    <td>{{payment.createdAt}}</td>
                                    <td>{{payment.invoicenumber}}</td>
                                    <td>{{payment.amount}}</td>
                                    <td>{{payment.status}}</td>
                                    <td><v-btn round small depressed color="primary" @click="checkpayment(payment.id)">CHECK</v-btn></td>

                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
             </v-card>
        </template>
        <template v-else>
        <v-card>
            <v-card-title>Receipting<v-spacer/><v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
            <v-card-text>
                 <v-row>
                            <v-col md="8">
                <div v-if="invoices.length>0">
                    <v-spacer/>
                    <div>Choose currency</div>
                 <v-btn-toggle>
                    
                    <v-btn v-for="current in currency" :key="current.id" :disabled="current.id==invoices[0].currencyId" @click="changecurrency(current.id)" >
                        {{current.name}}
                        <template v-if="current.id==invoices[0].currencyId">
                           <v-icon class="green--text">mdi-check</v-icon>
                        </template>
                    </v-btn>
                    
                 </v-btn-toggle>
                </div>
                 <v-card class="mt-3" rounded="0">
                    <v-system-bar class="primary">
                      Invoice
                    </v-system-bar>
                    <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Invoice number</th> 
                                <th>Exchange Rate</th>                             
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                           <tr v-for="invoice in invoices" :key="invoice.id">
                            <td>
                                {{invoice.createdAt | simpleDateformate}}
                            </td>
                            <td>
                                <div>{{invoice.invoicenumber}}</div>
                              
                            </td>
                            <td>
                                {{`1:`+invoice.exchangerate.value}}
                            </td>
                            <td>
                                {{invoice.currency.name}}
                                {{invoice.amount}}
                            </td>
                           </tr>
                           <tr class="title">
                            <td colspan="3">Total Invoice</td>
                            <td>{{invoices[0].currency.name}}{{totalInvoice()}}</td>
                           </tr>

                        </tbody>
                    </template>
                </v-simple-table>
                    </v-card-text>
                 </v-card>
                <v-card class="mt-3" rounded="0">
                    <v-system-bar class="success">
                       Receipts
                    </v-system-bar>
                    <v-card-text>
                       
                 <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Receipt number</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                         <template v-if="invoices[0].application.receipt.length>0">
                            <tr v-for="receipt in invoices[0].application.receipt" :key="receipt.id">
                                <td>
                                    {{receipt.createdAt | simpleDateformate}}
                                </td>
                                <td>
                                    {{receipt.receiptnumber}}
                                </td>
                                <td>
                                    {{receipt.currency.name}} {{receipt.amount}}
                                </td>
                                <td>
                                    <v-btn rounded small color="primary" depressed>Print</v-btn>
                                </td>
                                
                            </tr>
                         </template>
                         <template v-else>
                            <tr>
                                <td colspan="7" class="text-center red--text">No Receipts Found</td>
                            </tr>
                         </template>
                        </tbody>
                    </template>
                 </v-simple-table>
                           
                    </v-card-text>
                </v-card>
                 </v-col>
                            <v-col md="4">

                                <v-row v-if="balance>0">
                                    <v-col>
                                    <div class="title text-center">Wallet Balance</div>
                                    <div class="display-1 text-center">{{invoices[0].currency.name}}{{balance}}</div>
                                    
                                    </v-col>
                                </v-row>
                                <template v-if="balance==0">   
                                    <div class="title">Select Payment Method</div>             
                                        <FinanceEcocash :id="application.id"/>
                                        <FinanceOnemoney :id="application.id"/>
                                        <FinanceBank :currency="invoices[0].currency.name" :invoicenumber="invoices[0].invoicenumber"/>
                                </template>
                                <template v-else>
                                    <FinanceSettle :id="id"/>
                                </template>
                                    
                            </v-col>
                        </v-row>
             
            </v-card-text>
        </v-card>
        </template>
       
       </v-dialog>  
  </div>
</template>

<script>
export default {
 props:['application'],
 data(){
  return{
    showDialog:false
  }
 },
 methods:{
 async getData(){
   await this.$store.dispatch('settings/getData')
     await this.$store.dispatch('invoice/getById',this.application.id)
    const payload ={id:this.application.propertyId,currencyId:this.invoices[0].currencyId}
    await this.$store.dispatch("onlinepayments/getByInvoiceNumber",this.invoices[0].invoicenumber)
   await this.$store.dispatch('suspense/getBalance',payload)
   this.showDialog=true
 },
 async checkpayment(id){
    await this.$store.dispatch('receipting/checkPayment',id)
     await this.$store.dispatch('invoice/getById',this.application.id)
 },
 totalInvoice(){
   let totalinvoice = 0;
      this.invoices.forEach(element => {
         totalinvoice = totalinvoice+Number(element.amount)
      });
      return totalinvoice
 },
 async changecurrency(id){
    const payload ={currencyId:id,invoicenumber:this.invoices[0].invoicenumber,applicationId:this.application.id}
    await this.$store.dispatch('invoice/changecurrency',payload)
 }

 },
 computed:{
  currency(){
    return this.$store.state.settings.data.currency
  },
  balance(){
    return this.$store.state.suspense.balance
  },
  invoices(){
    return this.$store.state.invoice.data
  },
  onlinepayments(){
    return this.$store.state.onlinepayments.data
  }

 }
}
</script>

<style>

</style>