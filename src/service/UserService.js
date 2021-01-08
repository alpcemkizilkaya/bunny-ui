import ApiService from "@/service/ApiService";

const ROOT_URL = '/user';
const BASE_URL = process.env.VUE_APP_USER_API_BASE_URL;
const UserService = new ApiService(BASE_URL,ROOT_URL,{
    updateUser : function (ctx,onSuccess,onError,data){
        this.apiPost(ctx,'',data,onSuccess,onError);
    },
    deleteUser : function (ctx,onSuccess,onError,id){
        this.apiDelete(ctx,'/?id='+id,onSuccess,onError);
    }
});

export default UserService;