<template>
  <div>
    
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
                    v-model="form.categoryId"
                    outlined
                    label="Permit Category"
                    :items="settings.categorylist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
                  <v-col>
                    <v-select
                    v-model="form.purposeId"
                    outlined
                    label="Permit Purpose"
                    :items="purposelist"
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
        <Loader :overlay="loading"/>
  </div>
</template>

<script>
export default {
props:['properties','settings'],
data() {
    return {
      loading:false,
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
    async submit(){
       if(this.$refs.form.validate()){
        this.loading=true
           await this.$store.dispatch('application/addData',this.form)
           this.loading=false
       }
    }
  },
  computed:{
    purposelist(){
    let array = []
    if(this.form.categoryId)
     {
      const data = this.settings.categorylist.filter((dt)=>dt.id==this.form.categoryId)
      if(data.length>0){
        array = data[0].purpose
      }
     }
     return array
     }
  }

}
</script>

<style>

</style>