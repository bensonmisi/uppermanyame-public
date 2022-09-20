export const state =()=>({
    data:{},
    application:{},
    applications:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setApplication(state,payload){
        state.application = payload
    },
    setApplications(state,payload){
        state.applications = payload
    }
}

export const actions={
    async getAll({commit}){
        try {
            await this.$axios.get('client-application').then((res)=>{
                commit('setApplications',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },
    async getPending({commit}){
        try {
            await this.$axios.get('client-application/pending').then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },
    async getById({commit},payload){
        try {
            await this.$axios.get('client-application/application/'+payload).then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },
    async trackApplication({commit},payload){
        try {
            await this.$axios.get('client-application/application/track/'+payload).then((res)=>{
                commit('setApplication',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },

    async addData({commit},payload){
        try {
            await this.$axios.post('client-application',payload).then(async(res)=>{
                this.$swal("success",res.data.message,"success")
                await this.dispatch('application/getPending')              
            })
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")   
        }
         
    },
    async editData({commit},payload){
        try
        {
        await this.$axios.patch('client-application/'+payload.id,payload.data).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
            await this.dispatch('application/getPending')              
        })
    } catch (error) {
        this.$swal("error",error.response.data.message,"error")   
    }
     
  },
  async deleteData({commit},payload){
    await this.$axios.delete('client-application/'+payload).then(async(res)=>{
        this.$swal("success",res.data.message,"success")
        await this.dispatch('application/getPending')              
    }).catch(error=>{
        this.$swal("error",error.response.data.message,"error")
    })
}}