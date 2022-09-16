export const state =()=>({
    data:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getDashboard({commit}){
        try {
            await this.$axios.get('client-dashboard').then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    }}