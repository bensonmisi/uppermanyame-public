export const actions={
    async updateprofile({commit},payload){
        await this.$axios.post('profile',payload).then((res)=>{
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async changepassword({commit},payload){
        await this.$axios.post('profile/changepassword',payload).then((res)=>{
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
} 