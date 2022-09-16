<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">New Permit</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>New Permit</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        <Stepper :progress="1"/>
      </div>
      <div class="mt-3">
        <template v-if="application">
          <PermitsDetail :record="application" :settings="settings" :properties="properties"/>
        </template>
        <template v-else>
          <PermitsDetailForm :settings="settings" :properties="properties"/>
        </template>

      </div>
      <Loader :overlay="loading"/>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "user",
  async mounted() {
    this.loading=true
    await this.$store.dispatch("property/getData");
    await this.$store.dispatch("settings/getData");
    await this.$store.dispatch('application/getPending')
    this.loading=false
  },
  data(){
  return{
    loading:false
  }
  },
  computed: {
    properties() {
      return this.$store.state.property.data;
    },
    settings() {
      return this.$store.state.settings.data;
    },
    application(){
      return this.$store.state.application.data
    }
  },
};
</script>

<style>
</style>