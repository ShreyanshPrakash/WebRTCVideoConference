import axios from 'axios';

import{
    getAPIEnpoints,
} from 'src/utils';

// Global vars
let axiosInstance;
let ENV_VARS;
let apiEndpoints;


// Axios default instance
function createAxiosInstance( ){

    const Authorization = getAuthorization();
    const baseURL = getBaseUrl();

    const defaultOptions = {
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization,
            // 'Access-Control-Allow-Origin': "*",
        }
    };

    axiosInstance = axios.create(defaultOptions);
    axios.interceptors.request.use( handleRequestInterceptor );
    axios.interceptors.response.use( handleResponseInterceptor );

}

function setEnvVarsForHttpClient( envVars ){
    ENV_VARS = envVars;
}

function setEnvEndpoints( apis ){
    apiEndpoints = apis[ ENV_VARS[ "ENV" ] ];
}


function getAuthorization(){
    let authToken = sessionStorage.getItem('authToken');
    return authToken ? authToken : "";
}


function getBaseUrl( url ){
    return getAPIEnpoints().baseUrl;
}

function handleRequestInterceptor( request ){
    console.log( request );
    return request;
}
  
function handleResponseInterceptor( response ){
    console.log( response );
    return response;
}








// Api Methods
function getData( url, headers ){
    return axiosInstance.get( 
        url,
        {
            headers: headers,
        }
    );
}

function postData( url, body, headers ){
    return axiosInstance.post( 
        url, 
        body,
        {
            headers: headers,
        }
    );
}

function putData( url, body, headers ){
    return axiosInstance.put( 
        url, 
        body,
        {
            headers: headers,
        }
    );
}

function deleteData( url, headers ){
    return axiosInstance.delete( 
        url,
        {
            headers: headers,
        }
    );
}




export {
    getData,
    postData,
    putData,
    deleteData,
    createAxiosInstance,
    setEnvVarsForHttpClient,
    setEnvEndpoints,
}