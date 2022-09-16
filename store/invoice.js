export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getAll({commit}){
        try {
            await this.$axios.get('client-invoicing').then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },
    async getById({commit},payload){
        try {
            await this.$axios.get('client-invoicing/'+payload).then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },

    async addData({commit},payload){
        try {
            await this.$axios.post('client-invoicing',payload).then(async(res)=>{
                this.$swal("success",res.data.message,"success")
                await this.dispatch('invoice/getById',payload.application)              
            })
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")   
        }
         
    },
    async editData({commit},payload){
        try
        {
        await this.$axios.patch('client-invoicing/'+payload.id,payload.data).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
            await this.dispatch('invoice/getById',payload.data.application)               
        })
    } catch (error) {
        this.$swal("error",error.response.data.message,"error")   
    }
     
  },
  async changecurrency({commit},payload){
    try
    {
    await this.$axios.post('client-invoicing/change',payload).then(async(res)=>{
        this.$swal("success",res.data.message,"success")
        await this.dispatch('invoice/getById',payload.applicationId)               
    })
} catch (error) {
    this.$swal("error",error.response.data.message,"error")   
}
 
},
  async deleteData({commit},payload){
    await this.$axios.delete('client-invoicing/'+payload.id).then(async(res)=>{
        this.$swal("success",res.data.message,"success")
        await this.dispatch('invoice/getById',payload.application)             
    }).catch(error=>{
        this.$swal("error",error.response.data.message,"error")
    })
}}