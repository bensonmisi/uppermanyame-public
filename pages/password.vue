<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
    <div class="text-h6">Change Password</div>
    <div class="d-flex pt-3 pb-3">
        <div>
            <v-btn small text to="dashboard">Dashboard</v-btn>
        </div>
        <div>/</div>
        <div>
            <v-btn small disabled text>Change Password</v-btn>
        </div>
    </div>
    </div>
    <v-divider/>
    <v-row class="mt-3">
        <v-col md="6" offset-md="3">
            <v-form v-model="valid" ref="form" lazy-validation>
            <v-card>
                <v-card-title>Change Password</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                        <label>New Password</label>
                          <v-text-field
                          dense
                            v-model="form.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[passwordrules.required, passwordrules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            hint="At least 8 characters"
                            counter
                            outlined
                            @click:append="show1 = !show1"
                        />
                    </v-col>
                  </v-row>
                  <v-row>
                     <v-col>
                        <label>Confirm Password</label>
                           <v-text-field
                           dense
                            v-model="form.confirmpassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[passwordrules.required, passwordrules.min,passwordrules.confirm]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Confirm Password"
                            hint="At least 8 characters"
                            counter
                            outlined 
                            @click:append="show2 = !show2" 
                        />
                    </v-col>
                  </v-row>

                </v-card-text>
                <v-card-actions>
                    <v-btn  depressed color="error" to="dashboard">Cancel</v-btn>
                    <v-spacer/>
                    <v-btn  depressed color="success" :loading="loading" :disabled="loading" @click="update">Submit</v-btn>
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
      form:{
        password: '',
        confirmpassword:'',
        },
        passwordrules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          confirm: v => v === this.form.password || 'Password Mismatch'
        },
         show1: false,
        show2:false,
        valid:false,
        loading:false,
    }
},methods:{
     async update(){
        if(this.$refs.form.validate()){
            this.valid = true
            this.loading= true
            this.disabled = true
            this.$store.dispatch("profile/changepassword",this.form)
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