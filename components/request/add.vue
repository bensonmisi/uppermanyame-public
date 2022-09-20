<template>
  <div>
    <v-btn rounded small depressed color="primary" @click="addRequest=true">New Request</v-btn>
    <v-dialog v-model="addRequest" width="700px">
        <v-form ref="form" lazy-validation>
        <v-card>
            <v-card-title>
                New Request<v-spacer/>
                <v-btn icon @click="addRequest=false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                   <v-row>
                
                <v-col>
                    
                  <v-select
                    v-model="form.property"
                    outlined
                    label="Property"
                    :items="properties"
                    item-value="id"
                    item-text="address"
                    :rules="rule"
                  />
                    
                </v-col>
                <v-col>
                  <v-select
                    v-model="form.permittype"
                    outlined
                    label="Permit Type"
                    :items="settings.typelist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                    <v-select
                    v-model="form.purpose"
                    outlined
                    label="Permit Purpose"
                    :items="settings.purposelist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
                <v-col>
                    <v-select
                    v-model="form.category"
                    outlined
                    label="Permit Category"
                    :items="settings.categorylist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                    <v-text-field outlined label="Appling Permit For / On Behalf Of" v-model="form.name" :rules="rule"/>
                </v-col>
                <v-col>
                    <v-text-field outlined label="Application Year" v-model="form.regyear" :rules="rule"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                    <v-text-field outlined label="Permit Number" v-model="form.permitnumber" :rules="rule"/>
                </v-col>
                <v-col>
                    <v-select outlined label="Permit Type" v-model="form.type" :items="['PROVISIONAL','TEMPORARY','FINAL']" :rules="rule"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                    <v-text-field type="date" outlined label="Expiry date" v-model="form.expire_date" :rules="rule"/>
                </v-col>
              </v-row>
            </v-card-text>
            
        <v-card-actions>
          <v-btn rounded color="error" depressed @click="vdialog=false">Cancel</v-btn>
          <v-spacer/>
             <v-btn  rounded depressed color="success" @click="submit">Submit</v-btn>
        </v-card-actions>
        </v-card>
        </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data() {
    return {
        addRequest:false,
      loading:false,
      form:{
        property:"",
        permittype:"",
        name:"",
        category:"",
        purpose:"",
        regyear:""
      },
      rule:[v=>!!v || 'Required']
    };
  },
  methods:{
    async submit(){
       if(this.$refs.form.validate()){
        this.loading=true
           await this.$store.dispatch('manualpermits/addData',this.form)
           this.loading=false
       }
    }
  },
computed: {
    properties() {
      return this.$store.state.property.data;
    },
    settings() {
      return this.$store.state.settings.data;
    },
    application(){
      return this.$store.state.application.data
    }
  },
}
</script>

<style>

</style>