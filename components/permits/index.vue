<template>
<div class="mt-20">
    <v-card class="mt-5" outlined>  
        <v-card-title>
            <div class="title">My Permits</div>
            <v-spacer/>
 <v-btn rounded small depressed class="indigo white--text" to="/permits/new">New Permit</v-btn>
            </v-card-title>    
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Address</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Expiry Date</th>
                            <th>Permit Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="permits && permits.length>0">
                        <tr v-for="permit in permits" :key="permit.id">
                            <td><small>{{permit.id}}</small></td>
                            <td><small>{{permit.address}}</small></td>
                            <td><small>{{permit.type}}</small></td>
                            <td :class="permit.status=='ACTIVE' ? `green--text` : permit.status=='PENDING' ? `orange--text` :`red--text`"><small><b>{{permit.status}}</b></small></td>
                            <td><small>{{permit.expiry_date}}</small></td>
                            <td><small>{{permit.permitnumber}}</small></td>
                            <td class="text-right">
                                <v-btn v-if="permit.status=='ACTIVE'" rounded color="success" x-small depressed><v-icon small>mdi-download</v-icon> Download</v-btn>
                                <v-btn v-else-if="permit.status=='EXPIRED'" rounded color="error" x-small depressed><v-icon small>mdi-sync</v-icon> Renew</v-btn>
                                 <v-btn v-else-if="permit.status=='PENDING'" rounded color="warning" x-small depressed to="/permits/new"><v-icon small>mdi-chevron-double-right</v-icon> Continue</v-btn>
                                 <PermitsTrack v-else :id="permit.id"/>
                            </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="6" class="text-center red--text">No permits found</td>
                            </tr>
                        </template>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
export default {
   
 computed:{
    permits(){
        return this.$store.state.dashboard.data.permits
    }
 }
}
</script>

<style>
.mt-20{
    margin-top: 40px;
}
</style>