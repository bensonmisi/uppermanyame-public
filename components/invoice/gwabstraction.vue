<template>
    <div>
           <v-form v-model="valid" ref="form2" lazy-validation>
        <v-card flat>
             
    <v-card-text>
       
         <v-row>
            <v-col>
                <label>Select Borehole</label>
                <v-select v-model="form.gwapplicationId" :items="boreholes" item-value="id" item-text="bhnumber"  outlined dense :rules="rule"/>
            </v-col>
            <v-col>
                <label>Intended Use</label>
                <v-select v-model="form.purpose" :items="purpose" item-text="name" item-value="id" outlined dense :rules="rule"/>
            </v-col>
            
         </v-row>
          <v-row>
            <v-col>
                <label>Abstraction Rate</label>
                              <v-text-field type="number"  v-model="form.abstractionrate" :readonly="loading" outlined dense :rules="rule" />
            </v-col>
              <v-col>
                <label>UOM</label>
                <v-select v-model="form.uom" :items="uom" item-value="id" item-text="name"  outlined dense :rules="rule"/>
            </v-col>
          </v-row>
         <v-row>
          <v-row v-if="form.purpose=='1'">
            <v-col>
              <v-card>
                <v-card-title>
                  Crops Informtion
                  <v-spacer/>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form"  lazy-validation>
                  
          <v-row>
            <v-col md="5">
              <v-text-field outlined dense v-model="name" label="Name"  :rules="rule"/>
            </v-col>
            <v-col md="5">
              <v-text-field type="number" label="Hectrage" dense min="0" outlined v-model="hectrage"  :rules="rule"/>
            </v-col>
            <v-col md="2" class="text-right">
               <v-btn small depressed rounded class="primary" @click="addCrop">Add Crop</v-btn>
            </v-col>
          </v-row>
        
                  </v-form>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Hectrage</th>
                          <th>

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="crops.length>0">
                        <tr v-for="(crop,index) in crops" :key="crop.id">
                          <td>{{crop.name}}</td>
                          <td>{{crop.hectrage}}</td>
                          <td class="text-right">
                            <v-btn small depressed rounded class="error" @click="deleteCrop(index)">remove</v-btn>
                          </td>
                        </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="3" class="text-center red--text">No crops added as yet</td>
                          </tr>
                        </template>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
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
 props:['application','purpose','boreholes','uom'],
  data(){
    return{
      addDialog:false,
      cropDialog:false,
      valid:false,
      loading:false,
      crops:[],
      form:{
        gwapplicationId:"",
        purpose:"",
        abstractionrate:"",
        application:"",
        code:"",
        uom:"",
        crops:""
      },
      rule:[v=>!!v || 'Required'],
      name:"",
      hectrage:"" 

    }
 },
 methods:{
    async add(){
        if(this.$refs.form2.validate()){
            this.loading = true
            this.form.application = this.application.id
            this.form.code = this.application.permittype.code
            this.form.crops = JSON.stringify(this.crops)
            this.$store.dispatch("invoice/addData",this.form)
            this.loading=false
            this.$refs.form.reset()
        }
     },
     async addCrop(){
      if(this.$refs.form.validate())
      {
        this.crops.push({name:this.name,hectrage:this.hectrage})
        this.$refs.form.reset()
      }
     },
     async deleteCrop(index){
      this.crops.splice(index,1)
     }
 }
}
</script>

<style>

</style>