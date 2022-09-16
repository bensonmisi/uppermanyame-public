<template>
  <div>
    <v-form ref="form" lazy-validation>
    <v-card flat>
        <v-card-text>
              <v-row>
             <v-col>
                <label>Expected Drilling Date</label>
                              <v-text-field type="date" v-model="form.drilldate" :readonly="loading" outlined dense :rules="rule" />
            </v-col>
              <v-col>
                <label>Type of Water Source</label>
                <v-select v-model="form.watersource" :items="['Borehole','Well']"  outlined dense :rules="rule"/>
            </v-col>
         </v-row>
          <v-row>
            <v-col>
                <label>Rate(cubic meters/annum)</label>
                              <v-text-field type="number"  v-model="form.abstractionrate" :readonly="loading" outlined dense :rules="rule" />
            </v-col>
              <v-col>
                <label>UOM</label>
                <v-select v-model="form.uom" :items="uom" item-value="id" item-text="name"  outlined dense :rules="rule"/>
            </v-col>
          </v-row>
           <v-row>
            <v-col>
                <label>Longitude</label>
                              <v-text-field type="number"  v-model="form.longitude" :readonly="loading" outlined dense  />
            </v-col>
             <v-col>
                <label>Latitude</label>
                              <v-text-field type="number"  v-model="form.latitude" :readonly="loading" outlined dense  />
            </v-col>
           </v-row>
        </v-card-text>
          <v-card-actions>
        <v-btn depressed color="error" @click="addDialog=false">Cancel</v-btn>
        <v-spacer/>
        <v-btn depressed color="success" :disabled="loading" :loading="loading" @click="add">Submit</v-btn>
    </v-card-actions>
    </v-card>
    </v-form>
      
  </div>
</template>

<script>
export default {
 props:['application','uom'],
 data(){
  return{
    addDialog:false,
     valid:false,
      loading:false,
      form:{
        drilldate:"",
        abstractionrate:"",
        longitude:"",
        watersource:"",
        application:"",
        latitude:"",
        code:"",
        uom:""
      },
      rule:[v=>!!v || 'Required']
  }
 },
 methods:{
  async add(){
        if(this.$refs.form.validate()){
            this.loading = true
            this.form.application = this.application.id
            this.form.code = this.application.permittype.code
            this.$store.dispatch("invoice/addData",this.form)
            this.loading=false
            this.$refs.form.reset()
        }
     }
 }
}
</script>

<style>

</style>