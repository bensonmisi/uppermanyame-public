<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div class="text-h6">My Properties</div>
        <div class="d-flex pt-3 pb-3">
          <div>
            <v-btn small text to="/dashboard">Dashboard</v-btn>
          </div>
          <div>/</div>
          <div>
            <v-btn small disabled text>My Properties</v-btn>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="mt-3">
        
          <v-card>
            <v-card-title>My Property <v-spacer/> <PropertyAdd/></v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                           <th>PP Number</th>
                            <th>Address</th>
                            <th>Area</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="properties.length>0">
                         <tr v-for="property in properties" :key="property.id">
                          <td>{{property.ppnumber}}</td>
                            <td>{{property.address}}</td>
                            <td>{{property.suburb.name}}</td>
                            <td>{{property.type}}</td>
                            <td class="text-right"><PropertyEdit :property="property"/></td>
                         </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="3" class="text-center red--text">No Properties Found</td>
                            </tr>
                        </template>
                    </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
      
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "user",
  async mounted() {
    await this.$store.dispatch("property/getData")
  },
  methods: {
    async getData() {},
  },
  computed: {
    properties() {
      return this.$store.state.property.data;
    }
  },
};
</script>

<style>
</style>