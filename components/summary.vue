<template>
  <div>
    <v-row>
        <v-col md="3">
            <v-card outlined>
                <v-card-text   class="card-body">
                 <div class="d-flex justify-space-between">                    
                    <div>
                        <div class="summary-figure">{{ totals ? totals.properties : `--`}}</div>
                        <div class="summary-title">Properties</div>
                    </div>
                    <div>
                        <v-btn fab depressed>
                        <v-icon class="icon">mdi-bank</v-icon>
                        </v-btn>
                        </div>
                </div>  
                <div class=" text-left mt-3">
                    <v-btn outlined  small to="/myproperty">View Details</v-btn>
                </div>
                </v-card-text>
            </v-card>
        </v-col>
           <v-col md="3">
              <v-card outlined>
                <v-card-text class="card-body">
                 <div class="d-flex justify-space-between">
                   
                    <div>
                          <div class="summary-figure">{{ totals ? totals.permits : `--`}}</div>
                        <div class="summary-title">Permit Applications</div>
                      
                    </div>
                     <div>
                        <v-btn fab depressed>
                        <v-icon class="icon">mdi-clipboard-check-outline</v-icon>
                        </v-btn>
                        </div>
                </div>  
                <div class=" text-left mt-3">
                    <v-btn outlined  small to="/permits">View Details</v-btn>
                </div>
                </v-card-text>
            </v-card>
        </v-col>
           <v-col md="3">
             <v-card outlined>
                <v-card-text class="card-body">
                 <div class="d-flex justify-space-between">
                    
                    <div>
                           <div class="summary-figure">{{ totals ? totals.bills.currency : `--`}}{{ totals ? totals.bills.amount : '--'}}</div>
                        <div class="summary-title">OutStanding Bill</div>
                     
                    </div>
                    <div>
                        <v-btn fab depressed>
                        <v-icon class="icon-currency">mdi-currency-usd</v-icon>
                        </v-btn>
                        </div>
                </div>  
                <div class=" text-left mt-3">
                    <v-btn outlined  small to="/bills">View Details</v-btn>
                </div>
                </v-card-text>
            </v-card>
        </v-col>
             <v-col md="3">
             <v-card outlined>
                <v-card-text class="card-body">
                 <div class="d-flex justify-space-between">
                    
                    <div>
                           <div class="summary-figure">{{ totals ? totals.bills.currency : `--`}}{{ totals ? totals.bills.amount : '--'}}</div>
                        <div class="summary-title">My Wallet</div>
                     
                    </div>
                    <div>
                        <v-btn fab depressed>
                        <v-icon class="icon">mdi-currency-usd</v-icon>
                        </v-btn>
                        </div>
                </div>  
                <div class=" text-left mt-3">
                    <v-btn outlined  small to="/payments">View Details</v-btn>
                </div>
                </v-card-text>
            </v-card>
        </v-col>
         
    </v-row>
  </div>
</template>

<script>
export default {
   computed:{
    totals(){
        return this.$store.state.dashboard.data.totals
    }
   }
}
</script>

<style scoped>
 .icon{
    padding: 10px;
    font-size: 40px !important;
    font-weight: lighter !important;
    color: green !important;
 }
 .icon-currency{
  padding: 10px;
    font-size: 40px !important;
    font-weight: lighter !important;
    color:rgba(191, 17, 17, 0.862) !important;  
 }
 
 .card-body{
    padding: 20px;
 }
 .summary-title{
    font-size: 14px;
    margin-top: 10px;
    --bs-text-opacity: 1;
    color: #7a7b7cb1!important
 }
 .summary-figure{
    font-size: 24px;
    margin-top: 5px;
    color: black;
 }
</style>