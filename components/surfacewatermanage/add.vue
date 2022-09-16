<template>
  <div>
    <v-btn fab class="success" @click="showForm"><v-icon>mdi-plus</v-icon></v-btn>
    <v-dialog v-model="addDialog" width="800px">
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
               <v-system-bar
               class="primary"
                 window
                 dark
                 >
      <span>Add</span>
      <v-spacer></v-spacer>
      <v-icon @click="addDialog=false">mdi-close</v-icon>
    </v-system-bar>
    <v-card-text>
         <v-row>
            <v-col>
                <label>Name</label>
                <v-text-field v-model="form.name" :readonly="loading" outlined dense :rules="nameRule"/>
            </v-col>
              <v-col>
                <label>Area</label>
                <v-text-field v-model="form.area" :readonly="loading" outlined dense :rules="areaRule"/>
            </v-col>
         </v-row>
          <v-row>
            <v-col>
                <label>longitude</label>
                <v-text-field v-model="form.longitude" :readonly="loading" outlined dense :rules="longitudeRule"/>
            </v-col>
              <v-col>
                <label>Latitude</label>
                <v-text-field v-model="form.latitude" :readonly="loading" outlined dense :rules="latitudeRule"/>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
                <label>X Coordinates</label>
                <v-text-field v-model="form.xcoordinate" :readonly="loading" outlined dense :rules="xcoordinateRule"/>
            </v-col>
              <v-col>
                <label>Y Coordinate</label>
                <v-text-field v-model="form.ycoordinate" :readonly="loading" outlined dense :rules="ycoordinateRule"/>
            </v-col>
         </v-row>
           <v-row>
            <v-col>
                <label>Type</label>
                <v-select v-model="form.surfacewatertypeId" :items="types" item-value="id" item-text="name" :readonly="loading" outlined dense :rules="typeRule"/>
            </v-col>
              <v-col>
                <label>Ownership type</label>
                <v-select v-model="form.ownership" :readonly="loading" :items="['PUBLIC','PRIVATE']" outlined dense :rules="ownershipRule"/>
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
    </v-dialog>
  </div>
</template>

<script>
export default {
 data(){
    return{
      addDialog:false,
      valid:false,
      loading:false,
      form:{
        name:"",
        area:"",
        latitude:"",
        longitude:"",
        xcoordinate:"",
        ycoordinate:"",
        surfacewatertypeId:"",
        ownership:""
      },
      nameRule:[v=>!!v || 'Required'],
      areaRule:[v=>!!v || 'Required'],
      latitudeRule:[v=>!!v || 'Required'],
      longitudeRule:[v=>!!v || 'Required'],
      xcoordinateRule:[v=>!!v || 'Required'],
      ycoordinateRule:[v=>!!v || 'Required'],
      typeRule:[v=>!!v || 'Required'],
      ownershipRule:[v=>!!v || 'Required']
    }
 },methods:{
  async showForm(){
   await this.$store.dispatch('surfacewatertypes/getData')
   this.addDialog=true
  },
     async add(){
        if(this.$refs.form.validate()){
            this.loading = true         
            this.$store.dispatch("surfacewatermanagement/addData",this.form)
            this.loading=false
            this.$refs.form.reset()
        }
     }

 },
 computed:{
  types(){
    return this.$store.state.surfacewatertypes.data
  }
 }
}
</script>

<style>

</style>