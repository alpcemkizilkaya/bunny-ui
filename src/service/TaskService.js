import ApiService from "@/service/ApiService";

const ROOT_URL = '/task';
const BASE_URL = 'http://bunnytaskapi-env.eba-x2dqgurw.us-west-2.elasticbeanstalk.com/';
const TaskService = new ApiService(BASE_URL,ROOT_URL,{
    upsertTask : function (ctx,onSuccess,onError,data){
        this.apiPost(ctx,'',data,onSuccess,onError);
    }
});

export default TaskService;