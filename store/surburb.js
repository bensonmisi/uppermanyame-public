export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit}){
        try {
            await this.$axios.get('suburb').then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },

    async addData({commit},payload){
        try {
            await this.$axios.post('suburb',payload).then(async(res)=>{
                this.$swal("success",res.data.message,"success")
                await this.dispatch('surburb/getData')              
            })
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")   
        }
         
    },
    async editData({commit},payload){
        try
        {
        await this.$axios.patch('suburb/'+payload.id,payload.data).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
            await this.dispatch('surburb/getData')              
        })
    } catch (error) {
        this.$swal("error",error.response.data.message,"error")   
    }
     
  },
  async deleteData({commit},payload){
    await this.$axios.delete('suburb/'+payload).then(async(res)=>{
        this.$swal("success",res.data.message,"success")
        await this.dispatch('surburb/getData')              
    }).catch(error=>{
        this.$swal("error",error.response.data.message,"error")
    })
}}