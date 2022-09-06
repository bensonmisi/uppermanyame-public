<template>
    <div>
        <v-row class="login">
            <v-col md="4" offset-md="4">
                <v-form ref="form" lazy-validation>
                <v-card>
                    <v-card-title>Password Reset</v-card-title>
                    <v-card-text>
                   <v-row>
                <v-col>
                    <v-text-field
                    v-model="form.password"
                     dense 
                     label="Password" 
                      outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    counter
                    :rules="passwordRule"
                    @click:append="show1 = !show1"
                   />
                </v-col>
                   </v-row>
                   <v-row>
                 <v-col>
                        <v-text-field  v-model="form.password_confirmation"
                    outlined
                    dense
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    label="ConfirmPassword"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                    :rules="confirmpasswordRule"
                    />
                </v-col>
             </v-row>
                    </v-card-text>
                     <v-card-actions class="d-flex justify-space-between">
            <v-btn text to="/auth/login">Cancel</v-btn>
            <v-btn large class="primary" @click="submit">Reset</v-btn>
        </v-card-actions>
                </v-card>
                </v-form>
                <v-btn text block class="mt-5" to="/">Create Account</v-btn>
            </v-col>
        </v-row>
         <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      top
      :color="color"
      :width="500"
      centered
      v-model="snackbar"
    >
      {{ text }}
    </v-snackbar>
      <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    
    </div>
</template>

<script>
export default {
 auth:false,
 data() {
    return {
      show1: false,
      show2:false,
      color: "",
      snackbar: false,
      overlay:false,
      loading:false,
      token:"",
      text: "",
        passwordRule: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 10) ||
          "Password must be greater than 10 characters",
      ],
      confirmpasswordRule: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 10) ||
          "Password must be greater than 10 characters",
        (v) =>
          (v && v.length == this.form.password.length) ||
          "Passwords must match",
      ],
      form: {   
         token:"",     
          password:'',
          password_confirmation:''
      },
    };
  },
  mounted(){
  this.token = this.$route.params.token
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading=true
          try {
            this.overlay =true
               this.form.token=this.token
                 await this.$axios.post("/auth/account/reset/"+this.token,this.form).then(res=>{
                   this.overlay = false
                 this.color="success"
                this.snackbar=true
                this.text=res.data.message
                this.loading=false
                   this.$router.push({path:'/auth/login'})
                 }).catch(error=>{
                 this.overlay = false
                 const message = error.response ? error.response.data.message : error.message
                 this.text = message
                 this.snackbar=true
                 this.color="error"
                this.loading=false
                 })
               
               
                 
            } catch (err) {
                 this.overlay = false
                 const message = err.response ? err.response.data.message : err.message
                 this.text = message
                 this.snackbar=true
                 this.color="error"
                 this.loading=false
            }
      }
    },
  },

}
</script>

<style>
 .login{
    padding-top: 150px;
 }
</style>