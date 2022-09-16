<template>
  <div>
    <v-btn rounded small depressed color="success" @click="uploadDialog=true">Upload</v-btn>
    <v-dialog v-model="uploadDialog" width="400px">
      <v-form ref="form" lazy-validation>
        <v-card>
    
            <v-card-title>{{`UPLOAD: `+document.name}}<v-spacer/><v-btn icon @click="uploadDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
            <v-card-text>
              <v-row>
            <v-col>
                <label>Attached</label>
                   <v-file-input
                    v-model="file"
                    :rules="rule"
                ></v-file-input>
               
           </v-col>
         </v-row>
            </v-card-text>
             <v-card-actions>
        <v-btn depressed color="error" @click="uploadDialog=false">Cancel</v-btn>
        <v-spacer/>
        <v-btn depressed color="success" :disabled="loading" :loading="loading" @click="addDocument">Submit</v-btn>
    </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <Loader :overlay="loading"/>
  </div>
</template>

<script>
export default {
  props:['document','id'],
  data(){
    return{
        uploadDialog:false,
        file:null,
        rule:[v=>!!v || 'required'],
        loading:false
    }
  },
  methods:{
      async addDocument(){
        if(this.$refs.form.validate()){
       this.loading = true
             const formData = new FormData();
            formData.append('requireddocument',this.document.id)
            formData.append('applicationId',this.id)
            formData.append('file',this.file) 
             let config = { headers: {'content-type': 'multipart/form-data'}}
            await this.$axios({
                method:"POST",
                url:'client-application-documents',
                data:formData,
                config:config
            }).then(async (res)=>{
            this.$swal('success',res.data.message,'success')
            await this.$store.dispatch('documents/getData',this.id)
            this.uploadDialog = false
            this.loading=false
          }).catch(error=>{
             const message = error.response ? error.response.data.message : error.message
             this.loading=false
            this.$swal("error",message,"error")  
          }) 
       
        }
    }
  }
}
</script>

<style>

</style>