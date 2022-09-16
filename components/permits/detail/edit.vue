<template>
  <div>
    
        <v-btn small rounded color="info" @click="getdata">Edit</v-btn>
        <v-dialog v-model="editDialog" width="900px">
        <v-form ref="form" lazy-validation>
          <v-card>
            <v-card-text>
            
                <div class="red--text"><i>If you cant find your property on list goto to <NuxtLink to="/myproperty"> property manager</NuxtLink></i></div>
              <v-row>
                
                <v-col>
                    
                  <v-select
                    v-model="form.propertyId"
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
                    v-model="form.permittypeId"
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
                    v-model="form.purposeId"
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
                    v-model="form.categoryId"
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
              </v-row>
                
            </v-card-text>
            <v-card-actions>
                <v-btn rounded color="error" depressed to="/dashboard">Cancel</v-btn>
                <v-spacer/>
                <v-btn rounded color="success" depressed @click="submit">Submit</v-btn>
            </v-card-actions>

          </v-card>
        </v-form>
        </v-dialog>
        <Loader :overlay="loading"/>
  </div>
</template>

<script>
export default {
props:['properties','settings','application'],
data() {
    return {
      loading:false,
      editDialog:false,
      form:{
        propertyId:"",
        permittypeId:"",
        name:"",
        categoryId:"",
        purposeId:""
      },
      rule:[v=>!!v || 'Required']
    };
  },
  methods:{
    async getdata(){
     this.form.propertyId = this.application.propertyId
     this.form.permittypeId = this.application.permittypeId
     this.form.name = this.application.name
     this.form.categoryId = this.application.categoryId
     this.form.purposeId = this.application.purposeId
     this.editDialog=true
    },
    async submit(){
       if(this.$refs.form.validate()){
        this.loading=true
         const payload ={id:this.application.id,data:this.form}
           await this.$store.dispatch('application/editData',payload)
           this.editDialog=false
           this.loading=false
       }
    }
  }
}
</script>

<style>

</style>