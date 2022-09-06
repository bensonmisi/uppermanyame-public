<template>
  <div>
    <v-row>
        <v-col md="3">
            <v-card>
                <v-card-text class="card-body">
                 <div class="d-flex">
                    <div><v-icon class="icon">mdi-bank</v-icon></div>
                    <div>
                        <div class="summary-title">Properties</div>
                        <div class="summary-figure">3</div>
                    </div>
                </div>  
                </v-card-text>
                <v-card-actions>
                    <v-btn text small>View Details</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
           <v-col md="3">
              <v-card>
                <v-card-text class="card-body">
                 <div class="d-flex">
                    <div><v-icon class="icon">mdi-clipboard-check-outline</v-icon></div>
                    <div>
                        <div class="summary-title">Permits</div>
                        <div class="summary-figure">3</div>
                    </div>
                </div>  
                </v-card-text>
                <v-card-actions>
                    <v-btn text small>View Details</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
           <v-col md="3">
             <v-card>
                <v-card-text class="card-body">
                 <div class="d-flex">
                    <div><v-icon class="icon-currency">mdi-currency-usd</v-icon></div>
                    <div>
                        <div class="summary-title">My Balance(USD)</div>
                        <div class="summary-figure">3</div>
                    </div>
                </div>  
                </v-card-text>
                <v-card-actions>
                    <v-btn text small>View Details</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
           <v-col md="3">
             <v-card>
                <v-card-text class="card-body">
                 <div class="d-flex">
                    <div><v-icon class="icon-currency">mdi-currency-usd</v-icon></div>
                    <div>
                        <div class="summary-title">My Balance(ZWL)</div>
                        <div class="summary-figure">3</div>
                    </div>
                </div>  
                </v-card-text>
                <v-card-actions>
                    <v-btn text small>View Details</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

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
    font-size: 18px;
    color: rgb(143, 141, 141);
 }
 .summary-figure{
    font-size: 24px;
    margin-top: 5px;
    color: black;
 }
</style>