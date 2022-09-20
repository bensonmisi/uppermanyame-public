<template>

   
   <div class="mt-4">
   <v-btn depressed  large color="success" @click="vdialog=true" block>BANK TRANSFER</v-btn>

   <v-dialog v-model="vdialog" width="700px">
    <v-form ref="form" lazy-validation>
        <v-card>
        <v-card-title>ATTACH BANK TRANSFER</v-card-title>
        <v-card-text>
            
            <v-row>
                <v-col>
                    <v-text-field outlined label="Your Bank Name" v-model="form.bank" :rules="rule"/>
                </v-col>
                <v-col>
                    <v-text-field outlined label="Transfer Description" v-model="form.description" :rules="rule"/>
                </v-col>
            </v-row>
               <v-row>
                <v-col>
                    <v-text-field type="date" outlined label="Transfer Date" v-model="form.transactionDate" :rules="rule"/>
                </v-col>
                <v-col>
                    <v-text-field  outlined label="Account number" v-model="form.accountnumber" :rules="rule"/>
                </v-col>
            </v-row>
               <v-row>
                <v-col>
                   <label>Attached Proof Of Payment</label>
                   <v-file-input
                    v-model="file"
                    :rules="rule"
                ></v-file-input> 
                </v-col>
                <v-col>
                    <v-text-field outlined label="Enter Amount" v-model="form.amount"  type="number" :rules="rule"/>
                </v-col>
            </v-row>
            <v-row>
              <v-col>
                
               
           
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="error" depressed @click="vdialog=false">Cancel</v-btn>
          <v-spacer/>
             <v-btn  rounded depressed color="success" @click="submit">Submit</v-btn>
        </v-card-actions>
        
    </v-card>
    </v-form>
   </v-dialog>
     </div>
</template>

<script>
export default {
    props:['invoicenumber','currency'],
 data(){
    return{
       vdialog:false,
       confirmDialog:false,
       loading:false,
       recordId:'',
       file:null,
       form:{
        bank:'',
        invoicenumber:'',
        description:'',
        transactionDate:'',
        accountnumber:'',
        currency:'',
        amount:'',
       },
       rule:[v=>!!v || 'Required']
    }
 },
 methods:{
 async submit(){
   if (this.$refs.form.validate()) {
        this.valid = false;
        this.loading = true
             const formData = new FormData();
            formData.append('bank',this.form.bank)
            formData.append('invoicenumber',this.invoicenumber)
            formData.append('description',this.form.description)
            formData.append('transactionDate',this.form.transactionDate)
            formData.append('accountnumber',this.form.accountnumber)
            formData.append('currency',this.currency)
            formData.append('amount',this.form.amount)
            formData.append('file',this.file) 
             let config = { headers: {'content-type': 'multipart/form-data'}}
            await this.$axios({
                method:"POST",
                url:'client-banktransaction',
                data:formData,
                config:config
            }).then(async (res)=>{
            this.$swal('success',res.data.message,'success')
            this.uploadDialog = false
            this.loading=false
          }).catch(error=>{
             const message = error.response ? error.response.data.message : error.message
             this.loading=false
            this.$swal("error",message,"error")  
          })
      }  
 }
 }
}
</script>

<style>

</style>