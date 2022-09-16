<template>
  <div>
     <v-form v-model="valid" ref="form2" lazy-validation>
        <v-card>
            <v-card-text>
        <v-row>
            <v-col>
              <label> Select Stream/Dam/River Name</label>
                       <v-text-field v-model="streamname" readonly outlined dense :rules="rule"> 
                      <template v-slot:append>
                        <v-btn small depressed rounded color="primary" @click="streamDialog=true">Search</v-btn>
                      </template>                
                 </v-text-field>
            </v-col>
               <v-col>
                <label>Proposed Abstration Rate</label>
               <v-text-field dense outlined type="number" v-model="form.abstractionrate" :rules="rateRule"/>
              </v-col>
       
          
     
             </v-row>
             <v-row>           
              <v-col>
               <label>UOM</label>
               <v-select dense outlined  v-model="form.uomId" :items="uom" item-text="name" item-value="id" :rules="uomRule"/>
              </v-col>              
              <v-col>
                <label>Primary Purpose</label>
                <v-select outlined dense v-model="form.purposeId" :items="purpose" item-text="name" item-value="id" :rules="purposeRule"/>
              </v-col>
             </v-row>
             <v-row>
              <v-col>
                <label>Abstraction Type</label>
                <v-select outlined dense v-model="form.abstractiontype" :items="abstractiontypelist"  :rules="abstractiontypeRule"/>
           
              </v-col>
               <v-col>
                <label>Works Type</label>
                <v-select outlined dense v-model="form.operatationtype" :items="operatationtypelist" :rules="purposeRule"/>
              </v-col>
             </v-row>
            
                <!-- 
        ====================================================================================
          FARMING CROPS
        ====================================================================================

    -->


             <v-row>
              <v-col>
                   <v-card>
                  <v-card-title>
                    Crops
                    <v-spacer/>
                    <v-btn x-small rounded color="primary" @click="cropDialog=true">Add Crop</v-btn>

                  </v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Hectrage</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="crops.length>0">
                        <tr v-for="(crop,index) in crops" :key="index">
                          <td>{{index+1}}</td>
                          <td>{{crop.name}}</td>
                          <td>{{crop.hectrage}}</td>
                          <td><v-btn x-small color="error" @click="deleteCrop(index)">delete</v-btn></td>
                        </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="4" class="text-center red--text">Please add crops under irrigation</td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                 </v-card>
              </v-col>
             </v-row>



        <!-- 
        ====================================================================================
       LIVESTOCK
        ====================================================================================
        -->
          <v-row>
              <v-col>
                  <v-card>
                  <v-card-title>
                    Livestock
                    <v-spacer/>
                    <v-btn x-small rounded color="primary" @click="livestockDialog=true">Add livestock</v-btn>

                  </v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="livestock.length>0">
                        <tr v-for="(stock,index) in livestock" :key="index">
                          <td>{{index+1}}</td>
                          <td>{{stock.name}}</td>
                          <td>{{stock.animals}}</td>
                          <td><v-btn x-small color="error">delete</v-btn></td>
                        </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="4" class="text-center red--text">Please add crops under irrigation</td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                 </v-card>
              </v-col>
             </v-row>


               <!-- 
        ====================================================================================
      Fishponds
        ====================================================================================
        -->
          <v-row>
              <v-col>
                  <v-card>
                  <v-card-title>
                   Fishponds
                    <v-spacer/>
                    <v-btn x-small rounded color="primary" @click="pondDialog=true">Add Pond</v-btn>

                  </v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Number of Ponds</th>
                            <th>Total Area Coverd</th>
                            <th>Total Capacity</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="ponds.length>0">
                        <tr v-for="(pond,index) in ponds" :key="index">
                          <td>{{index+1}}</td>
                          <td>{{pond.totalponds}}</td>
                          <td>{{pond.totalarea}}</td>
                          <td>{{pond.capacity}}</td>
                          <td><v-btn x-small color="error" @click="deletePond(index)">delete</v-btn></td>
                        </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="5" class="text-center red--text">Please add Fish bonds</td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                 </v-card>
              </v-col>
             </v-row>

                   <!-- 
        ====================================================================================
       Institutions
        ====================================================================================
        -->
          <v-row>
              <v-col>
                  <v-card>
                  <v-card-title>
                   Institutions
                    <v-spacer/>
                    <v-btn x-small rounded color="primary" @click="institutionDialog=true">Add Record</v-btn>

                  </v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Total Raw Water</th>
                            <th>Total Clear Water</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="institutions.length>0">
                        <tr v-for="(inst,index) in institutions" :key="index">
                          <td>{{index+1}}</td>
                          <td>{{inst.total_raw_water+' square litres'}}</td>
                           <td>{{inst.total_clear_water+' square litres'}}</td>
                          <td><v-btn x-small color="error" @click="deleteInstitution(index)">delete</v-btn></td>
                        </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="4" class="text-center red--text">Please institution water usage</td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                 </v-card>
              </v-col>
             </v-row>
                      <!-- 
        ====================================================================================
         Construction
        ====================================================================================
        -->
          <v-row>
              <v-col>
                  <v-card>
                  <v-card-title>
                   Construction details
                    <v-spacer/>
                    <v-btn x-small rounded color="primary" @click="constructionDialog=true">Add Record</v-btn>

                  </v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Usage</th>
                            <th>Volume</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="constructions.length>0">
                        <tr v-for="(con,index) in constructions" :key="index">
                          <td>{{index+1}}</td>
                          <td>{{con.uses}}</td>
                           <td>{{con.volume+' square litres'}}</td>
                          <td><v-btn x-small color="error" @click="deleteConstruction(index)">delete</v-btn></td>
                        </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="4" class="text-center red--text">Please construction water usage</td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                 </v-card>
              </v-col>
             </v-row>
             <v-row>
                    </v-row>
                    </v-card-text>
                    <v-card-actions>
                       <v-btn depressed color="error" @click="addDialog=false">Cancel</v-btn>
        <v-spacer/>
        <v-btn depressed color="success" :disabled="loading" :loading="loading" @click="add">Submit</v-btn>
                    </v-card-actions>
</v-card>
             </v-form>
             
      <v-dialog v-model="cropDialog" width="600px">
      <v-form ref="form"  lazy-validation>
      <v-card>
        <v-card-title>Add 
          <v-spacer/>
          <v-btn icon @click="cropDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <label>Name</label>
              <v-text-field outlined dense v-model="name"  :rules="nameRule"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Hectrage</label>
              <v-text-field type="number" dense min="0" outlined v-model="hectrage"  :rules="hectrageRule"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded class="error" small>Cancel</v-btn>
          <v-spacer/>
          <v-btn small rounded class="success" @click="addCrop">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>

     <v-dialog v-model="livestockDialog" width="600px">
      <v-form ref="form"  lazy-validation>
      <v-card>
        <v-card-title>Add 
          <v-spacer/>
          <v-btn icon @click="livestockDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <label>Name</label>
              <v-text-field outlined dense v-model="name"  :rules="nameRule"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Number of Animals</label>
              <v-text-field type="number" dense min="0" outlined v-model="animals"  :rules="animalRule"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded class="error" small>Cancel</v-btn>
          <v-spacer/>
          <v-btn small rounded class="success" @click="addlivestock">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>

    
     <v-dialog v-model="pondDialog" width="600px">
      <v-form ref="form"  lazy-validation>
      <v-card>
        <v-card-title>Add 
          <v-spacer/>
          <v-btn icon @click="pondDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <label>Total Ponds</label>
              <v-text-field type="number" outlined dense v-model="totalponds"  :rules="totalpondRule"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Total Area Covered By Ponds</label>
              <v-text-field  dense min="0" outlined v-model="totalarea"  :rules="totalareaRule"/>
            </v-col>
          </v-row>
           <v-row>
            <v-col>
              <label>Total Ponds Capacity</label>
              <v-text-field  dense min="0" outlined v-model="capacity"  :rules="capacityRule"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded class="error" small>Cancel</v-btn>
          <v-spacer/>
          <v-btn small rounded class="success" @click="addPond">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>


    <v-dialog v-model="institutionDialog" width="600px">
      <v-form ref="form"  lazy-validation>
      <v-card>
        <v-card-title>Add 
          <v-spacer/>
          <v-btn icon @click="institutionDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <label>Total Raw Water</label>
              <v-text-field type="number" outlined dense v-model="total_raw_water"  :rules="rawRule"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Total Clear Water</label>
              <v-text-field  dense min="0" outlined v-model="total_clear_water"  :rules="clearRule"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded class="error" small>Cancel</v-btn>
          <v-spacer/>
          <v-btn small rounded class="success" @click="addInstitution">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>

     <v-dialog v-model="constructionDialog" width="600px">
      <v-form ref="form"  lazy-validation>
      <v-card>
        <v-card-title>Add 
          <v-spacer/>
          <v-btn icon @click="constructionDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <label>Uses</label>
              <v-textarea outlined dense v-model="uses"  :rules="useRule"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Volume</label>
              <v-text-field  dense min="0" outlined v-model="volume"  :rules="volumeRule"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded class="error" small>Cancel</v-btn>
          <v-spacer/>
          <v-btn small rounded class="success" @click="addConstruction">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="streamDialog" width="600px">
      <v-card>
        <v-card-title>
          Select Stream
          <v-spacer/>
          <v-btn icon @click="streamDialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field outlined dense v-model="filter"/>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Area</th>
                  <th>Ownership</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <template v-if="dams.length>0">
                <tr v-for="dam in dams" :key="dam.id">
                  <td>{{dam.name}}</td>
                  <td>{{dam.area}}</td>
                  <td>{{dam.ownership}}</td>
                  <td>
                    <v-btn small rounded color="primary" @click="choose(dam)">Select</v-btn>
                  </td>
                </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4">
                      <div class="text-center red--text">Stream not found, please contact our office to register stream</div>
                     
                    </td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
 props:['application','purpose','uom','dams'],
 data(){
    return{
          addDialog:false,
      cropDialog:false,
      livestockDialog:false,
      constructionDialog:false,
      answerDialog:false,
      pondDialog:false,
      streamDialog:false,
      valid:false,
      loading:false,
      crops:[],
      livestock:[],
      ponds:[],
      operationlist:[],
      ownershiplist:['PRIVATE','PUBLIC'],
      abstractiontypelist:['ABSTRACT','ABSTRACT/STORE'],
      operatationtypelist:['CONSTRUCT/OPERATE','OPERATE'],
      streamname:"",
      filter:"",
      form:{        
        application:"",
        surfacewatermanagerId:"",
        purposeId:"",
        ownership:"",
        abstractionrate:"",
        uomId:"",
        code:"",
        name:"",
        abstractiontype:"",
        operatationtype:"",
        questionnaire:"",
        crops:"",
        livestock:"",
        construction:"",
        fishponds:"",
        institutional:""
      },
      ownershipRule:[v=>!!v || 'Required'],
      animalRule:[v=>!!v || 'Required'],
      nameRule:[v=>!!v || 'Required'],
      purposeRule:[v=>!!v || 'Required'],
      uomRule:[v=>!!v || 'Required'],
      periodRule:[v=>!!v || 'Required'], 
      nameRule:[v=>!!v || 'Required'],
      hectrageRule:[v=>!!v || 'Required'],
      rateRule:[v=>!!v || 'Required'],
      abstractiontypeRule:[v=>!!v || 'Required'],
      operatationtypeRule:[v=>!!v || 'Required'],
      totalpondRule:[v=>!!v || 'Required'],
      totalareaRule:[v=>!!v || 'Required'],
      capacityRule:[v=>!!v || 'Required'],
      rawRule:[v=>!!v || 'Required'],
      clearRule:[v=>!!v || 'Required'],
      useRule:[v=>!!v || 'Required'],
      volumeRule:[v=>!!v || 'Required'],
      rule:[v=>!!v || 'Required'],
      name:"",
      hectrage:"",
      animals:"",
      questionId:"",
      type:'',
      answers:[],
      questionslist:[],
      crops:[],
      answer:"",
      answertype:"",
      qns:"",
      totalponds:"",
      totalarea:"",
      capacity:"",
      institutionDialog:"",
      institutions:[],
      constructions:[],
      total_raw_water:"",
      total_clear_water:"",
      uses:"",
      volume:""
    }
 },
 methods:{
    choose(item){
  this.form.surfacewatermanagerId  = item.id
  this.streamname = item.name
  this.streamDialog = false
  },
    async add(){
         if(this.$refs.form2.validate()){
         /*  if(this.questionslist.length>this.answers){
             this.$swal("error","Please Complete all Questions","error")
             return
          }
          if(this.form.purposeId=="2" && this.livestock.length==0){
                this.$swal("error","Please Animals ","error")
                return
          }
           
           if(this.form.purposeId=="3" || this.form.purposeId=="5" || this.form.purposeId=="6"|| this.form.purposeId=="7" && this.institutions.length==0){
                this.$swal("error","Please Add Usage Data under institutions","error")
          }

          if(this.form.purposeId=="5" || this.form.purposeId=="9"  && this.institutions.length==0){
                this.$swal("error","Please Add Usage Data under Construction","error")
          } */
            this.loading = true
            this.form.application = this.application.id
            this.form.name =  this.privatename ? this.privatename : this.publicname
            this.form.crops = JSON.stringify(this.crops)
            this.form.construction= JSON.stringify(this.constructions)
            this.form.institutional = JSON.stringify(this.institutions)
            this.form.fishponds = JSON.stringify(this.ponds)
            this.form.livestock = JSON.stringify(this.livestock)
            this.form.questionnaire= JSON.stringify(this.answers)
            this.form.code = this.application.permittype.code
            this.$store.dispatch("invoice/addData",this.form)
            this.loading=false
            this.$refs.form2.reset()
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
     },
     async addlivestock(){
      if(this.$refs.form.validate())
      {
        this.livestock.push({name:this.name,animals:this.animals})
        this.$refs.form.reset()
      }
     },
     async deletelivestock(index){
      this.livestock.splice(index,1)
     },
     async addPond(){
      if(this.$refs.form.validate())
      {
        this.ponds.push({totalponds:this.totalponds,totalarea:this.totalarea,capacity:this.capacity})
        this.$refs.form.reset()
      }
     },
     async deletePond(index){
      this.ponds.splice(index,1)
     },
     async addInstitution(){
      if(this.$refs.form.validate())
      {
        this.institutions.push({total_raw_water:this.total_raw_water,total_clear_water:this.total_clear_water})
        this.$refs.form.reset()
      }
     },
     async deleteInstitution(index){
      this.institutions.splice(index,1)
     },
     async addConstruction(){
      if(this.$refs.form.validate())
      {
        this.constructions.push({uses:this.uses,volume:this.volume})
        this.$refs.form.reset()
      }
     },
     async deleteConstruction(index){
      this.constructions.splice(index,1)
     }
 }
}
</script>

<style>

</style>