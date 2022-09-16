export const state =()=>({
    data:[],
    balance:0
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setBalance(state,payload){
        state.balance = payload
    }
}

export const actions={
    async getData({commit},payload){
        try {
            await this.$axios.get('suspense/'+payload).then((res)=>{
                commit('setData',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },
    async getBalance({commit},payload){
        try {
            await this.$axios.get('suspense/report/balance?id='+payload.id+"&id="+payload.currencyId).then((res)=>{
                commit('setBalance',res.data)
              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },

}