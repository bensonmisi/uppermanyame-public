<template>
  <div>
    <v-form ref="form" lazy-validation>
    <v-card>
        <v-card-title>Create Account</v-card-title>
        <v-card-text>
             <v-row>
                <v-col>
                    <v-text-field outlined dense label="Name"  v-model="form.name" :rules="rule"/>
                </v-col>
                 <v-col>
                    <v-text-field outlined dense label="Surname" v-model="form.surname" :rules="rule"/>
                </v-col>
             </v-row>
              <v-row>
                <v-col>
                    <v-text-field type="email" outlined dense label="Email" v-model="form.email" :rules="rule"/>
                </v-col>
                 <v-col>
                    <v-text-field outlined dense label="Phone number" v-model="form.phonenumber" :rules="rule"/>
                </v-col>
             </v-row>
              <v-row>
                <v-col>
                    <v-text-field outlined dense label="National ID" v-model="form.nationalID" :rules="rule"/>
                </v-col>
                 <v-col>
                    <v-select outlined dense label="Gender" :items="['M','F']" v-model="form.gender" :rules="rule"/>
                </v-col>
             </v-row>
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
            <v-btn text to="/auth/login">Already got an account!!</v-btn>
            <v-btn large class="primary" @click="submit">Create Account</v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
    <v-snackbar
      :value="true"
      absolute
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="color"
      :width="500"
      right
    >
      {{text}}
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
 data(){
    return{
        snackbar:false,
        timeout:1200,
        overlay:false,
        show1:false,
        show2:false,
        text:"",
        color:"",
        form:{
          name:'',
          surname:'',
          email:'',
          phonenumber:'',
          nationalID:'',
          gender:'',
          password:'',
          password_confirmation:''


        },
          rule: [(v) => !!v || "Field required"],
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
    }
 },
 methods:{
    async submit(){
      if(this.$refs.form.validate())
      {
     
     this.overlay = true
     await this.$axios.post("/auth/register",this.form).then((res)=>{
          this.color="success"
          this.text =res.data.message
          this.snackbar = true
          this.overlay=false
          this.$refs.form.reset()
           this.$router.push('/auth/login')
     }).catch((error)=>{
       this.color="error"
          this.text =error.response.data.message
          this.snackbar = true
          this.overlay = false
     })
     
      }
    }
 }
}
</script>

<style>

</style>