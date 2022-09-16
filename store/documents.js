export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit},payload){
        try {
            await this.$axios.get('client-application-documents/'+payload).then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },

    async addData({commit},payload){
        try {
            await this.$axios.post('client-application-documents',payload).then(async(res)=>{
                this.$swal("success",res.data.message,"success")
                await this.dispatch('documents/getData',payload.applicationId)              
            })
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")   
        }
         
    }
}