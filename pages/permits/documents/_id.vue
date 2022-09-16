<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">New Permit</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>New Permit</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        <Stepper :progress="2"/>
      </div>
      <div class="mt-3">
        <v-card>
        <v-card-title>Required Permit Documents</v-card-title>
        <v-card-text>
        <template v-if="documents.length>0">
        <v-alert
      prominent
      text
      type="success"
      class="mt-2"
      v-if="countuploaded == documents.length"
    >
      <v-row align="center">
        <v-col class="grow">
          All Required Documents Successfully Uploaded Please Click Button To Process
        </v-col>
        <v-col class="shrink">
          <v-btn :to="`/permits/invoicing/`+applicationId">Proceed<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-alert>
       
              <v-simple-table>
                                        <thead>
                                            <tr>
                                                <th>Document Name</th>
                                                <th>Upload status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          <tr v-for=" doc in documents" :key="doc.id">                                            
                                            <td>{{doc.name}}</td>
                                            <td>
                                              
                                                <template v-if="doc.applications.length==0">
                                                      <div class="red--text">PENDING</div>
                                                 </template>
                                                <template v-else>
                                                     <div class="green--text">UPLOADED<v-icon color="success">mdi-check-circle</v-icon></div>
                                                </template>
                                            </td>
                                            <td><PermitsDocumentsUpload :id="applicationId" :document="doc"/></td>
                                          </tr>
                                        </tbody>
                                    </v-simple-table>
        
        </template>
        <template v-else>
              <v-alert
      prominent
      text
      type="success"
      class="mt-2"
      v-if="countuploaded == documents.length"
    >
      <v-row align="center">
        <v-col class="grow">
         No Required Documents Found Please Click Button To Process
        </v-col>
        <v-col class="shrink">
          <v-btn :to="`/permits/invoicing/`+applicationId">Proceed<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-alert>
        </template>
        </v-card-text>
       </v-card>
      </div>
      <Loader :overlay="loading"/>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "user",
  async mounted() {
    this.loading=true
    this.applicationId = this.$route.params.id
    await this.$store.dispatch('documents/getData',this.applicationId)
    this.loading=false
  },
  data(){
  return{
    loading:false,
    applicationId:""
  }
  },computed:{
    documents(){
     return this.$store.state.documents.data
       
    },
    countuploaded(){
        const data = this.$store.state.documents.data
        let total = 0
        if(data.length>0)
        {
        data.forEach(dt => {
            if(dt.applications.length>0){
             total++
            }
        });
        }
        return total
    }
  }
};
</script>

<style>
</style>