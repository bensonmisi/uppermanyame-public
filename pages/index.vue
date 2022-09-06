<template>
 <div>
  <div class="banner-img">
  <v-row class="banner">
    <v-col md="6" class="welcome">
      <div class="display-3">Upper Manyame SubCatchment Council</div>
       <div class="display-1">Public Portal</div>
      <p><i>water secure Sub Catchment premised upon integrated water resources management principles underpinned by active stakeholder participation</i></p>
     
      <div>
         <v-btn x-large to="/auth/login">Login Account</v-btn>
      </div>
    </v-col>
    <v-col md="6" class="register">
      <Register/>
    </v-col>

  </v-row>
  </div>
  <div class="action">
  <v-container>
    <v-row class="mt-5">
    <v-col md="3" class="text-center white--text">
      
      <v-icon class="icon">mdi-cogs</v-icon>
      <div class="title">Permit Applications</div>
        
    </v-col>
     <v-col md="3" class="text-center white--text">
     
      <v-icon class="icon">mdi-receipt</v-icon>
      <div class="title">Property Statements</div>
       
    </v-col>
     <v-col md="3" class="text-center white--text">
      <v-icon class="icon">mdi-currency-usd</v-icon>
      <div class="title">Online Payments</div>
        
    </v-col>
     <v-col md="3" class="text-center white--text">
      <v-icon class="icon">mdi-bell</v-icon>
      <div class="title">Notifications</div>
        
    </v-col>
  </v-row>
  </v-container>
  </div>
  <v-container class="mt-15">
    <v-row>
      <v-col md="4" offset-md="4" class="text-center display-2">Permit Types</v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="borehole.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Authority to drill a borehole
    </v-card-title>

    <v-card-subtitle>
      Did you know its a crime to drill a borehole without a permit
    </v-card-subtitle>

  </v-card>
      </v-col>
       <v-col md="4">
        <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="tap.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Authority to abstract groundwater
    </v-card-title>

    <v-card-subtitle>
      Did you know after successfully drilling your borehole you need a permit to abstract water
    </v-card-subtitle>
  </v-card>
      </v-col>
        <v-col md="4">
        <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="bulkwater.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Bulk water supply
    </v-card-title>

    <v-card-subtitle>
     Did you know its illegal to operate a bulk water supply business without a permit
    </v-card-subtitle>
  </v-card>
      </v-col>
    </v-row>
      <v-row>
      <v-col md="4">
        <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="riversand.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
    Authority to conduct operation which will interfere with a Bed
    </v-card-title>

    <v-card-subtitle>
       Did you know  one requires a permit to conduct operations on a bed eg riversand abstraction..
    </v-card-subtitle>
  </v-card>
      </v-col>
       <v-col md="4">
        <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="surfacewater.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Permit to abstract surface water
    </v-card-title>

    <v-card-subtitle>
     Did you know one requires a permit to abstract water from any  surface water source such as rivers , dams, swamps etc even if it is on a private property 
    </v-card-subtitle>
  </v-card>
      </v-col>
        <v-col md="4">
      </v-col>
    </v-row>
  </v-container>
 </div>
</template>

<script>
export default {
  name: 'IndexPage',
  auth:false,
  data(){
    return{
      show:false
    }
  }
}
</script>
<style scoped>
   .banner-img{
    background-image: url("/banner.jpg") !important;
    background-size: cover;
   }
  .banner{
    height: 600px !important; 
   
  }
  .register{
    padding-right: 150px;
    padding-top: 50px ;
  }
  .welcome{    
    padding-left: 150px;
    padding-top: 100px ;
    color: #fff !important;
  }
  .mt-15{
    margin-top: 50px !important;
  }
  .action{
    height: 200px;
    background-color: rgb(38, 39, 79);
  }
  .icon{
    font-size: 100px !important;
    color: rgba(255, 255, 255, 0.875);
  }
</style>
