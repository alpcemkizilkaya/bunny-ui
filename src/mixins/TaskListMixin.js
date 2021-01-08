import TaskService from "@/service/TaskService";
import CssForBootstrap4 from '../style/TableStyle.js'
export default {
    name: "TaskList",
    data () {

        return {
            listUrl:TaskService.baseUrl+TaskService.apiRoot+"/list",
            fields:     [
                "id",
                "description",
                "state",
                {
                    name: "update-slot",
                    title: '<i class="grey save icon"></i>Update',
                    titleClass: "center aligned",
                    dataClass: "center aligned",
                    width: "15%",
                },
                {
                    name: "user-slot",
                    title: '<i class="grey forward icon"></i>Go To Users',
                    titleClass: "center aligned",
                    dataClass: "center aligned",
                    width: "15%",
                }
            ],
            css: CssForBootstrap4,
            task:{userId:this.$route.params.id}
        }
    },
    methods: {
        makeQueryParams(sortOrder, currentPage, perPage){
            return {
                user_id:  this.$route.params.id ,
                page: currentPage,
                per_page: perPage
            }
        },
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
        show (modalName,task) {
            this.$modal.show(modalName, { task: task });
        },
        hide (modalName) {
            this.$modal.hide(modalName);
        },
        beforeOpenUpsert (event) {
            if(event.params.task){
                this.task = event.params.task;
            }
            else this.task = {userId:this.$route.params.id};
            console.log(event.params);
        },
        upsertTask(){
            TaskService.upsertTask(this,response => {
                console.log(response);
                this.hide('upsert');
                this.$refs.vuetable.refresh();
            },error => {
                console.log(error);
            },this.task)
        },

        goToUsers(){
            this.$router.push({ name: 'user'});
        }
    }
}