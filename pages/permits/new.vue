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
        <v-form ref="form" lazy-validation>
          <v-card>
            <v-card-text>
            
                <div class="red--text"><i>If you cant find your property on list goto to <NuxtLink to="/myproperty"> property manager</NuxtLink></i></div>
              <v-row>
                
                <v-col>
                    
                  <v-select
                    v-model="form.propertyId"
                    outlined
                    label="Property"
                    :items="properties"
                    item-value="id"
                    item-text="address"
                    :rules="rule"
                  />
                    
                </v-col>
                <v-col>
                  <v-select
                    v-model="form.permittypeId"
                    outlined
                    label="Permit Type"
                    :items="settings.typelist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                    <v-select
                    v-model="form.purposeId"
                    outlined
                    label="Permit Purpose"
                    :items="settings.purposelist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
                <v-col>
                    <v-select
                    v-model="form.categoryId"
                    outlined
                    label="Permit Category"
                    :items="settings.categorylist"
                    item-text="name"
                    item-value="id"
                    :rules="rule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                    <v-text-field outlined label="Appling Permit For / On Behalf Of" v-model="form.name" :rules="rule"/>
                </v-col>
              </v-row>
                
            </v-card-text>
            <v-card-actions>
                <v-btn rounded color="error" depressed to="/dashboard">Cancel</v-btn>
                <v-spacer/>
                <v-btn rounded color="success" depressed @click="submit">Submit</v-btn>
            </v-card-actions>

          </v-card>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "user",
  data() {
    return {
      form:{
        propertyId:"",
        permittypeId:"",
        name:"",
        categoryId:"",
        purposeId:""
      },
      rule:[v=>!!v || 'Required']
    };
  },
  async mounted() {
    await this.$store.dispatch("property/getData");
    await this.$store.dispatch("settings/getData");
  },
  methods: {
    async getData() {},
  },
  computed: {
    properties() {
      return this.$store.state.property.data;
    },
    settings() {
      return this.$store.state.settings.data;
    },
  },
};
</script>

<style>
</style>