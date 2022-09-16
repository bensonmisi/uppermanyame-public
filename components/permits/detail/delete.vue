<template>
  <div>
    <v-btn small rounded color="error"  @click="deleteRecord">Delete</v-btn>
  </div>
</template>

<script>
export default {
props:['application'],
methods:{
    async deleteRecord(){
        this.$swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async(result) => {
  if (result.isConfirmed) {
      await this.$store.dispatch('application/deleteData',this.application.id) 
  }
})
    }
}
}
</script>

<style>

</style>