<template>
    <div>
        <v-row class="login">
            <v-col md="4" offset-md="4">
                <v-form ref="form" lazy-validation>
                <v-card>
                    <v-card-title>Forgot Password</v-card-title>
                    <v-card-text>
                   <v-row>
                    <v-col>
                        <v-text-field type="email" dense outlined label="Email" v-model="form.email" :rules="emailRule">
                             <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="loading"
                  size="24"
                  color="info"
                  indeterminate
                ></v-progress-circular>
                <v-btn v-else small rounded color="success" @click="forgotpassword()">Reset</v-btn>
              </v-fade-transition>
            </template>
                        </v-text-field>
                    </v-col>
                   </v-row>
                    </v-card-text>
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
    </div>
</template>

<script>
export default {
 auth:false,
 data() {
    return {
      show1: false,
      color: "",
      snackbar: false,
      overlay:false,
      loading:false,
      text: "",
      emailRule: [
        (v) => !!v || "Field required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      form: {
        email: "",
      },
    };
  },
  methods: {
    async forgotpassword() {
      if (this.$refs.form.validate()) {
        this.loading=true
          try {
            this.overlay =true
                 await this.$axios.post("/auth/account/forgot",this.form).then(res=>{
                   this.overlay = false
                 this.color="success"
                this.snackbar=true
                this.text=res.data.message
                this.loading=false
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