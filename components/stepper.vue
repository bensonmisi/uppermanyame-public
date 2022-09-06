<template>
   <v-stepper>
    <v-stepper-header>
      <v-stepper-step
        :complete="progress> 1"
        step="1"
      >
        Permit Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="progress> 2"
        step="2"
      >
       Permit Documents
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step    :complete="progress> 3" step="3">
       Invoicing
      </v-stepper-step>
      <v-divider></v-divider>
         <v-stepper-step
        :complete="progress> 5"
        step="5"
      >
       Receipting
      </v-stepper-step>
       <v-divider></v-divider>
         <v-stepper-step
        :complete="progress> 6"
        step="6"
      >
       Finish
      </v-stepper-step>
    </v-stepper-header>
   </v-stepper>
</template>

<script>
export default {
props:['progress'],
data(){
    return{
        e1:1
    }
}
}
</script>

<style>

</style>