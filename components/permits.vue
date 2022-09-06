<template>
<div class="mt-20">
    <div class="d-flex justify-space-between">
     <div class="title">My Permits</div>
      <v-btn rounded small depressed color="primary">New Permit</v-btn>
    </div>
    <v-card class="mt-5">      
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Expiry Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
export default {

}
</script>

<style>
.mt-20{
    margin-top: 40px;
}
</style>