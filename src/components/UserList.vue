<template>
  <div class="ui container">
    <h4>User List</h4>
    <div id="app">

      <vuetable ref="vuetable"
                data-path="content"
                pagination-path="pagination"
                :api-url=listUrl
                :fields=fields
                :api-mode="true"
                :load-on-start="true"
                :transform="transformData"
                :css="css.table"
                :per-page="5"
                @vuetable:pagination-data="onPaginationData"

      >
        <div slot="update-slot" slot-scope="props">
          <button class="ui button" v-on:click="show(props.rowData.id,props.rowData.name,'update')">Update</button>
        </div>
        <div slot="delete-slot" slot-scope="props">
          <button class="ui button" v-on:click="show(props.rowData.id,props.rowData.name,'delete')">Delete</button>
        </div>
        <div slot="task-slot" slot-scope="props">
          <button class="ui button" v-on:click="goToTasks(props.rowData.id)">Go To Tasks</button>
        </div>
      </vuetable>

      <vuetable-pagination-info ref="paginationInfo"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
                           :css="css.pagination"
                           @vuetable-pagination:change-page="onChangePage"

      ></vuetable-pagination>
      <modal name="update" @before-open="beforeOpenUpdate">
        <div class="ui container one column  grid container">
          <h4 class="column">Update User</h4>
        <div class="ui input focus column">
          <input v-model="username" type="text" placeholder="Username">

        </div>
          <button class="ui button column small" v-on:click="updateUser">Update</button>
        </div>
      </modal>
      <modal name="delete" @before-open="beforeOpenDelete">
        <div class="ui container one column  grid container">
          <h4 class="column">Are you sure to delete {{username}}</h4>
          <div class="column">
        <button class="ui button horizontally padded" v-on:click="deleteUser">Ok</button>
        <button class="ui button horizontally padded" v-on:click="hide('delete')">Cancel</button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>

import Vuetable from 'vuetable-2'

import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
import UserListMixin from "@/mixins/UserListMixin";

export default {
  mixins: [UserListMixin],
  components: {
    Vuetable,
    VuetablePaginationInfo,
    VuetablePagination
  },
}
</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.orange.glyphicon {
  color: orange;
}

th.sortable {
  color: #ec971f;
}
</style>