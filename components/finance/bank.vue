<template>

   
   <div class="mt-4">
   <v-btn depressed  large color="success" @click="vdialog=true" block>BANK TRANSFER</v-btn>

   <v-dialog v-model="vdialog" width="400px">
    <v-form ref="form" lazy-validation>
        <v-card>
        <v-card-title>ATTACH BANK TRANSFER</v-card-title>
        <v-card-text>
            
            <v-row>
                <v-col>
                    <v-text-field outlined label="Mobile Number" v-model="form.phone" :rules="rule"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field outlined label="Enter Amount" v-model="form.amount"  type="number" :rules="rule"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn block color="success" @click="submit">Submit</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        
    </v-card>
    </v-form>
   </v-dialog>
   <v-dialog v-model="confirmDialog" width="400px">
        <v-card>
        <v-card-title>Confirm PAYMENT</v-card-title>
        <v-card-text>
              <v-alert
      prominent
      text
      type="info"
    >
         Instruct client to check mobile and enter mobile water pin to authorize payment
      
    </v-alert>
     <v-btn @click="checkpayment()" block :loading="loading">Check Payment</v-btn>
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
       vdialog:false,
       confirmDialog:false,
       loading:false,
       recordId:'',
       form:{
        mode:'ECOCASH',
        phone:'',
        amount:'',
        applicationId:''
       },
       rule:[v=>!!v || 'Required']
    }
 },
 methods:{
 async submit(){
   if (this.$refs.form.validate()) {
        this.valid = false;
        let chargeamount = Number(this.form.amount) + Number(this.form.amount) * 0.025;
        this.$swal({
          title: "Service Charge",
          text:
            "Please note PAYNOW charges a service fee of 2.5%. Amount that will be charge to your phone will be ZWL" + chargeamount,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                this.form.applicationId = this.id
              await this.$axios
                .post("/administrator/receipting/payment/mobilepayment", this.form)
                .then((res) => {
                  if (res.data.status == "success") {
                    this.recordId = res.data.data.id;
                    this.confirmDialog = true;
                    this.vdialog = false;
                  }
                });
            } catch (error) {
              this.$swal("error", error.response.data.message, "error");
            }
          }
        });
      }  
 },
 async checkpayment(){
   this.loading=true
   await this.$store.dispatch('receipting/checkpayment',this.recordId)
   this.confirmDialog=false
   this.loading=false
 }
 }
}
</script>

<style>

</style>