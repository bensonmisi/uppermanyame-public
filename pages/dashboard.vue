<template>
 <v-container>
    <h2>Dashboard</h2>
    <Summary/>
    <Request/>
    <Permits/>
 </v-container>
</template>

<script>

export default {

auth:true,
layout:"user",
async mounted(){
  await this.$store.dispatch('dashboard/getDashboard')
}

}
</script>

<style>

</style>