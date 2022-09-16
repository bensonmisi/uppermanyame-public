<template>
  <div>
    <v-alert
      prominent
      text
      type="success"
      class="mt-2"
    >
      <v-row align="center">
        <v-col class="grow">
          Application Details Successfully Save Please Click Button To Process
        </v-col>
        <v-col class="shrink">
          <v-btn :to="`/permits/documents/`+record.id">Proceed<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-card class="mt-2">
      <v-card-title>
        Application Details
        <v-spacer/>
          <PermitsDetailEdit :application="record" :settings="settings" :properties="properties"/>
        <PermitsDetailDelete :application="record"/>
      </v-card-title>
      <v-card-text>
    <v-simple-table>
        <template v-slot:default>
            <tbody>
                <tr><th>Address</th><td>{{record.property ? record.property.address :""}}</td></tr>
                <tr><th>Permit Type</th><td>{{record.permittype ? record.permittype.name :""}}</td></tr>
                <tr><th>Fee Type</th><td>{{record.feetype ? record.feetype.name :""}}</td></tr>
                 <tr><th>Category</th><td>{{record.category ? record.category.name :""}}</td></tr>
                 <tr><th>Purpose</th><td>{{record.purpose ? record.purpose.name :""}}</td></tr>
                 <tr><th>Status</th><td class="orange--text">{{record.status}}</td></tr>
            </tbody>
        </template>
       </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
 props:['record','settings','properties']
}
</script>

<style>

</style>