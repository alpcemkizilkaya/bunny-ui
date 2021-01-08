class ApiService{

    constructor(baseUrl,root,apiExtensions) {
        this.baseUrl = baseUrl;
        this.apiRoot = root
        const extensionProps = Object.keys(apiExtensions);
        for(const api in extensionProps){
            this[extensionProps[api]] = apiExtensions[extensionProps[api]];
        }
    }
    apiPost(context,path,data,handler,errorCallBack) {
        context.$http.post(this.baseUrl + this.apiRoot + path, data).then(response => handler(response.data, {status: response.status}))
            .catch(error => {
                if (errorCallBack) {
                    errorCallBack(error)
                }
            })
    }
        apiDelete(context,path,handler,errorCallBack) {
            context.$http.delete(this.baseUrl + this.apiRoot+path).then(response => handler({status: response.status}))
                .catch(error => {
                    if(errorCallBack){
                        errorCallBack(error)
                    }
                })
}
}

export default ApiService