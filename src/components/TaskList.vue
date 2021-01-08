<template>
  <div class="ui container">
    <h4>Task List For User {{ $route.params.id }}</h4>
    <template>
      <div id="app">
        <button class="ui button" v-on:click="show('upsert')">Insert New Task</button>
        <h4>User List</h4>
        <vuetable ref="vuetable"
                  data-path="content"
                  pagination-path="pagination"
                  api-url="http://bunnytaskapi-env.eba-x2dqgurw.us-west-2.elasticbeanstalk.com/task/list"
                  :query-params="makeQueryParams"
                  :fields=fields
                  :api-mode="true"
                  :load-on-start="true"
                  :transform="transformData"
                  :css="css.table"
                  :per-page="10"
                  @vuetable:pagination-data="onPaginationData"

        >
          <div slot="update-slot" slot-scope="props">
            <button class="ui button"
                    v-on:click="show('upsert',{id:props.rowData.id,userId: props.rowData.userId,description:props.rowData.description,state:props.rowData.state})">
              Update
            </button>
          </div>
          <div slot="user-slot">
            <button class="ui button" v-on:click="goToUsers()">Go To Users</button>
          </div>
        </vuetable>

        <vuetable-pagination-info ref="paginationInfo"
        ></vuetable-pagination-info>
        <vuetable-pagination ref="pagination"
                             :css="css.pagination"
                             @vuetable-pagination:change-page="onChangePage"

        ></vuetable-pagination>
        <modal name="upsert" @before-open="beforeOpenUpsert">

          <div class="ui container one column  grid container">
            <h4 class="column" v-if="task.id">Update Task</h4>
            <h4 class="column" v-if="!task.id">Insert Task</h4>
            <div class="ui input focus column">
              <input v-model="task.description" type="text" placeholder="Description">
            </div>
            <div class="ui input focus column">
              <select v-model="task.state">
                <option disabled value="">Please select one</option>
                <option>TO_DO</option>
                <option>DONE</option>
              </select>
              <input type="hidden" v-model="task.userId">
              <input type="hidden" v-model="task.id">

            </div>

            <button class="ui button column small" v-on:click="upsertTask" v-if="task.id">Update</button>
            <button class="ui button column small" v-on:click="upsertTask" v-if="!task.id">Insert</button>
          </div>
        </modal>
      </div>
    </template>
  </div>
</template>

<script>
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
import TaskListMixin from "@/mixins/TaskListMixin";
import Vuetable from "vuetable-2";

export default {
  name: "TaskList",
  mixins: [TaskListMixin],
  components: {
    Vuetable,
    VuetablePaginationInfo,
    VuetablePagination
  },
}
</script>

<style scoped>

</style>