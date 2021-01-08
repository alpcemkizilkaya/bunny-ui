import UserService from "@/service/UserService";
import CssForBootstrap4 from '../style/TableStyle.js'
export default {
    name: "UserList",
    data () {

        return {
            fields:     [
                //...

                "id",
                "name",
                {
                    name: "update-slot",
                    title: '<i class="grey save icon"></i>Update',
                    titleClass: "center aligned",
                    dataClass: "center aligned",
                    width: "15%",
                },
                {
                    name: "delete-slot",
                    title: '<i class="grey trash icon"></i>Delete',
                    titleClass: "center aligned",
                    dataClass: "center aligned",
                    width: "15%",
                },
                {
                    name: "task-slot",
                    title: '<i class="grey forward icon"></i>Go To Tasks',
                    titleClass: "center aligned",
                    dataClass: "center aligned",
                    width: "15%",
                },

            ],
            css: CssForBootstrap4,
            username : "",
            userid: 0
        }
    },
    methods: {
        onPaginationData (paginationData) {
            console.log(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData);
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
        },

        transformData (data) {
            let transformed = {}
            console.log(data);
            transformed.pagination = {
                total: data.totalElements,
                per_page: data.pageable.pageSize ,
                current_page: data.pageable.pageNumber + 1,
                last_page: data.totalPages,
                // next_page_url: data.next_page_url,
                // prev_page_url: data.prev_page_url,
                from: data.pageable.offset,
                to: data.pageable.pageSize * data.pageable.pageNumber === 0? 1 : data.pageable.pageNumber,
            }
            transformed.content = data.content;
            console.log(transformed);
            return transformed
        },
        show (id,name,modalName) {
            this.$modal.show(modalName, { id: id,name:name});
        },
        hide (modalName) {
            this.$modal.hide(modalName);
        },
        beforeOpenUpdate (event) {
            this.username = event.params.name,
                this.userid = event.params.id,
                console.log(event.params);
        },
        beforeOpenDelete (event) {
            this.userid = event.params.id,
                console.log(event.params);
        },
        updateUser(){
            UserService.updateUser(this,response => {
                console.log(response);
                this.hide('update');
                this.$refs.vuetable.refresh();
            },error => {
                console.log(error);
            },{id:this.userid,name:this.username})
        },
        deleteUser(){
            UserService.deleteUser(this,response => {
                console.log(response);
                this.hide('delete');
                this.$refs.vuetable.refresh();
            },error => {
                console.log(error);
            },this.userid)
        },
        goToTasks(id){
            this.$router.push({ name: 'task', params: { id:id} });
        }
    }
}