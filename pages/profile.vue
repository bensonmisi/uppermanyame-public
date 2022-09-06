<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
    <div class="text-h6">Profile Settings</div>
    <div class="d-flex pt-3 pb-3">
        <div>
            <v-btn small text to="dashboard">Dashboard</v-btn>
        </div>
        <div>/</div>
        <div>
            <v-btn small disabled text>Profile Settings</v-btn>
        </div>
    </div>
    </div>
    <v-divider/>
    <v-row class="mt-3">
        <v-col md="6" offset-md="3">
            <v-form v-model="valid" ref="form" lazy-validation>
            <v-card>
                <v-card-title>Profile Settings</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                        <label>Name</label>
                        <v-text-field outlined v-model="form.name" :rules="nameRule"  dense/>
                    </v-col>
                  </v-row>
                  <v-row>
                     <v-col>
                        <label>Surname</label>
                        <v-text-field outlined dense v-model="form.surname" :rules="surnameRule"/>
                    </v-col>
                  </v-row>
                   <v-row>
                     <v-col>
                        <label>Email</label>
                        <v-text-field type="email" outlined dense v-model="form.email" :rules="emailRule"/>
                    </v-col>
                  </v-row>

                   <v-row>
                     <v-col>
                        <label>Phonenumber</label>
                        <v-text-field outlined dense v-model="form.phonenumber" :rules="rule"/>
                    </v-col>
                  </v-row>

                   <v-row>
                     <v-col>
                        <label>National ID</label>
                        <v-text-field outlined dense v-model="form.nationalID" :rules="rule"/>
                    </v-col>
                  </v-row>

                </v-card-text>
                <v-card-actions>
                    <v-btn  depressed color="error" to="dashboard">Cancel</v-btn>
                    <v-spacer/>
                    <v-btn  depressed color="success" :loading="loading" :disabled="disabled" @click="update">Submit</v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
auth:true,
layout:"user",
data(){
    return{
         emailRule:[ v => !!v || 'E-mail is required',v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
         nameRule:[v=> !!v ||'Name is required'],
         surnameRule:[v=> !!v ||'Password is required'],
         rule:[v=> !!v ||'Field is required'],
         valid:false,
         loading:false,
         disabled:false,
         valid:false,
         form:{
            name:"",
            surname:"",
            email:"",
            phonenumber:"",
            nationalID:""
         }
    }
},mounted(){
    this.form.name = this.loggedInUser.name
    this.form.surname = this.loggedInUser.surname
    this.form.email = this.loggedInUser.email
    this.form.phonenumber = this.loggedInUser.phonenumber
    this.form.nationalID = this.loggedInUser.nationalID
},methods:{
     async update(){
        if(this.$refs.form.validate()){
            this.valid = true
            this.loading= true
            this.disabled = true
            this.$store.dispatch("profile/updateprofile",this.form)
            this.loading = false
            this.disabled= false
        }
     }
},
computed:{
  ...mapGetters(['loggedInUser']),
   }
}
</script>

<style>

</style>