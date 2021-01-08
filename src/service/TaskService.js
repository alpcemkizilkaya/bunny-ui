import ApiService from "@/service/ApiService";

const ROOT_URL = '/task';
const BASE_URL = process.env.VUE_APP_TASK_API_BASE_URL;
const TaskService = new ApiService(BASE_URL,ROOT_URL,{
    upsertTask : function (ctx,onSuccess,onError,data){
        this.apiPost(ctx,'',data,onSuccess,onError);
    }
});

export default TaskService;