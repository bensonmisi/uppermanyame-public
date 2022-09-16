<template>
  <div>
        <v-btn small fab color="error"><v-icon  @click="deleteRecord">mdi-delete</v-icon></v-btn>
  </div>
</template>

<script>
export default {
props:['item'],
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
      await this.$store.dispatch('surfacewatermanagement/deleteData',this.item.id) 
  }
})
    }
}
}
</script>

<style>

</style>