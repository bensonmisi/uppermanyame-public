<template>
  <div>
    <v-row class="login">
      <v-col md="4" offset-md="4">
        <v-form ref="form" lazy-validation>
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    type="email"
                    dense
                    outlined
                    label="Email"
                    v-model="form.email"
                    :rules="emailRule"
                  />
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
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn rounded small depressed color="error">Cancel</v-btn>
              <v-spacer />
              <v-btn rounded small depressed color="success" @click="login()"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
        <v-btn text block class="mt-5" to="/">Create Account</v-btn>
        <v-btn text block class="mt-2" to="/auth/forgot"
          >Forgot password?</v-btn
        >
      </v-col>
    </v-row>

  <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
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
  data() {
    return {
      show1: false,
      color: "",
      snackbar: false,
      overlay:false,
      text: "",
      emailRule: [
        (v) => !!v || "Field required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRule: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 10) || "Password must be greater than 10 characters",
      ],
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
          try {
            this.overlay =true
               await this.$auth.loginWith('local', { data: this.form })
                this.overlay = false
                 this.color="success"
                this.snackbar=true
                this.text="Successfully Logged"
                this.$router.push({path:'/dashboard'})
               
                 
            } catch (err) {
                 this.overlay = false
                 const message = err.response ? err.response.data.message : err.message
                 this.text = message
                 this.snackbar=true
                 this.color="error"
            }
      }
    },
  },
};
</script>

<style>
.login {
  padding-top: 150px;
}
</style>