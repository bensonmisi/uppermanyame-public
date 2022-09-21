<template>
  <div>
      <v-btn color="success" depressed rounded  @click="getdata"><v-icon>mdi-plus</v-icon>New Property</v-btn>
    <v-dialog v-model="addDialog" width="900px">
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
               <v-system-bar
               class="info"
                 window
                 dark
                 >
      <span>Add Property</span>
      <v-spacer></v-spacer>
      <v-icon @click="addDialog=false">mdi-close</v-icon>
    </v-system-bar>
    <v-card-text>
      <v-row>
            <v-col>
                <label>Ownership</label>
                <v-select :items="['OWNER','LEASE']" v-model="form.owner" :readonly="loading" outlined dense :rules="rule"/>
            </v-col>
            <v-col>
                <label>Property Type</label>
                <v-select :items="['FARM','RESIDENTIAL','COOPERATE','INSTITUTION','INDUSTRY','MINE','OTHER']" v-model="form.type" :readonly="loading" outlined dense :rules="rule"/>
            </v-col>
         </v-row>
         <v-card>
          <v-card-title>Address</v-card-title>
          <v-card-text>
        <!--     <v-row>
              <v-col>
                 <v-text-field prepend-inner-icon="mdi-office-building-marker" type="text"  id="address" outlined  v-model="address" :rules="rule"/>
                 
              </v-col>

            </v-row> -->
         <v-row>
            <v-col>
                <label>House Number</label>
                <v-text-field v-model="form.streetnumber" outlined dense :rules="rule"/>
            </v-col>
            <v-col>
                <label>Street Name</label>
                 <v-text-field v-model="form.streetname" outlined dense :rules="rule">                 
                 </v-text-field>
               
            </v-col>
                <v-col>
                <label>Area</label>
                 <v-text-field v-model="suburbname" readonly outlined dense :rules="rule"> 
                      <template v-slot:append>
                        <v-btn small depressed rounded color="primary" @click="suburbDialog=true">Search</v-btn>
                      </template>                
                 </v-text-field>
               
            </v-col>
         </v-row>
          </v-card-text>
         </v-card>
      
         <v-row class="mt-3">
          <v-col>
             <label>Land Size(Hacters)</label>
                <v-text-field type="number"  v-model="form.size" :readonly="loading" outlined dense :rules="rule"/>
          
          </v-col>
            <v-col>
                <label>Attached {{form.owner=='OWNER' ?' TITLE DEEDS':'LEASE DOCUMENT'}}</label>
                   <v-file-input
                   outlined
                   dense
                    v-model="file"
                    :rules="rule"
                ></v-file-input>
               
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

      <v-dialog v-model="suburbDialog" width="500px">
      <v-card>
        <v-card-title>
          Search Suburb
          <v-spacer/>
          <v-btn icon @click="suburbDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
              <v-text-field label="filter" outlined v-model="filtersuburb"/>          
        
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="suburbs.length>0">
                    <tr v-for="suburb in suburbs" :key="suburb.id">
                      <td>
                        {{suburb.name}}
                      </td>
                      <td>
                        <v-btn x-small rounded color="primary" @click="selectsuburb(suburb)">select</v-btn>
                      </td>
                    </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="2" class="text-center">
                          <div class="red--text"> No Suburb found in our database with the name:{{filtersuburb}} Please click button below to add suburb</div>
                          <v-btn rounded color="primary" small @click="addsuburbDialog=true">Add Suburb</v-btn>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </v-simple-table>
           
        </v-card-text>
      </v-card>
    </v-dialog>


 

    <v-dialog v-model="addsuburbDialog" width="300px">
      <v-form ref="addsuburbform" lazy-validation>
      <v-card>
        <v-card-title>
          New Suburb
          <v-spacer/>
          <v-btn icon @click="addsuburbDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
            <v-text-field outlined label="Suburb Name" v-model="suburb.name" :rules="rule"/>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded small color="error" @click="addsuburbDialog=false">close</v-btn>
          <v-spacer/>
          <v-btn rounded small color="submit" @click="addsuburb">Save</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>

  




  </div>
</template>

<script>
export default {
  props:['user'],
 data(){
    return{
      address:"",
      addDialog:false,
      suburbDialog:false,
      addsuburbDialog:false,
      valid:false,
      loading:false,
      file:null,
      showaddress:false,  
      filtersuburb:"",
      suburbname:"", 
      suburb:{
        name:""
      },  
      form:{
        streetnumber:"",
        streetname:"",
        area:"",
        owner:'',
        type:'',
        size:"",
      },
      rule:[v=>!!v || 'Required']
    }
 } ,methods:{
   async getdata(){
  /* if (typeof google === 'undefined') {
      const script = document.createElement('script')
      script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBI7wlhY5fJnZ4apca3ItU492a2vg5XIRo&libraries=places`
      document.head.appendChild(script)
    } else {
      this.onScriptLoaded()
    
    } */
      await this.$store.dispatch('surburb/getData')
     this.addDialog = true
     
   },
   /* onScriptLoaded(event = null) {
    var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-17.854437, 30.962787));
    var input = document.getElementById('address');
    var options = {
    bounds: defaultBounds,
    types: ['address'],
    fields:["address_components"]
    };
  const autocomplete = new google.maps.places.Autocomplete(
    input,  options
  );
  autocomplete.addListener("place_changed",()=>{
  autocomplete.getPlace().address_components.forEach((component)=>{
    this.showaddress = true
    if(component.types[0]=="street_number"){
      this.form.streetnumber = component.long_name
    }
     if(component.types[0]=="route"){
      this.form.streetname = component.long_name
    }
  })
  })

 }, */
 async addsuburb(){
     if(this.$refs.addsuburbform.validate())
       {
        await this.$store.dispatch('surburb/addData',this.suburb)
        this.addsuburbDialog = false
       }
   },
   
     async add(){
       if(this.$refs.form.validate())
       {
          this.valid = true
           const formData = new FormData();
           this.address = this.form.streetnumber+" "+this.form.streetname+" "+this.suburbname
          formData.append('streetnumber',this.form.streetnumber)
          formData.append('suburbId',this.form.area)
          formData.append('streetname',this.form.streetname)
          formData.append('address',this.address)
          formData.append('owner',this.form.owner)
          formData.append('type',this.form.type)
          formData.append('file',this.file)   
          formData.append('size',this.form.size)      
          let config = { headers: {'content-type': 'multipart/form-data'}}
 
        try {
            await this.$axios({
                method:"POST",
                url:'client-property',
                data:formData,
                config:config
            }).then(async (res)=>{
            this.$swal('success',res.data.message,'success')
            await this.$store.dispatch('property/getData')
            this.addDialog  = false
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          }) 
        } catch (error) {
            this.$swal("error",error,"error") 
        }
       }
     },
    async selectsuburb(suburb){
     this.suburbname = suburb.name
     this.form.area = suburb.id
     this.suburbDialog=false

   }
 },
  computed:{
  suburbs(){
  let data =  this.$store.state.surburb.data
  if(this.filtersuburb){
     return data.filter((dt)=>!dt.name.toUpperCase().indexOf(this.filtersuburb.toUpperCase()))
  }else{
    return data
  }
  }
 }
 
}
</script>

<style>

</style>