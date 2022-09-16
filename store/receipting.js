
export const actions={
    async InitiateMobilePayment({commit},payload){
        try {
            await this.$axios.post('client-receipting/mobilepayment',payload).then(async(res)=>{
                
                this.$swal(res.data.status,res.data.message,res.data.status)

              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    },

    async checkPayment({commit},payload){
        try {
            await this.$axios.get('client-receipting/mobilepayment/'+payload).then(async(res)=>{
                
                this.$swal(res.data.status,res.data.message,res.data.status)

              })
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            this.$swal("error",message,"error")
        }
       
    }
}