import { apiEndpoints } from 'src/config/api.config';

let ENV_VARS;

function setEnvVars( env ){
    ENV_VARS = env;
}

function getEnvVars(){
    return ENV_VARS;
}

function getAPIEnpoints( endpointName = "" ){
    const ENV = getEnvVars()["ENV"];
    const apis = apiEndpoints[ ENV ];
    if( endpointName )
        return apis[ endpointName ];
    return apis;
}       


function getDataFromSessionStorage( key, jsonParse = true ){
    let data = sessionStorage.getItem( key );
    if( jsonParse )
        data = JSON.parse( data );
    return data;
}

function setDataToSessionStorage( key, payload, jsonStringify = true ){
    if( jsonStringify )
        payload = JSON.stringify( payload );
    sessionStorage.setItem( key, payload )
}

function removeDataFromSessionStorage( keys, removeAll = false ){

    if( removeAll ){
        sessionStorage.clear();
        return;
    }

    if( typeof keys === 'array' )
        keys.forEach( key => sessionStorage.removeItem( key ) );
    else
        sessionStorage.removeItem( keys );

}

function getQueryParams( url ){
    let queryParams = {};
    url = url.replace( '?', '' ).split( '&' )
    for( let i = 0; i < url.length; i++ ){
        let query = url[ i ].split("=");
        queryParams[ query[0] ] = query[1];
    }
    return queryParams;
}



export{
    setEnvVars,
    getEnvVars,
    getAPIEnpoints,
    getDataFromSessionStorage,
    setDataToSessionStorage,
    removeDataFromSessionStorage,
    getQueryParams,
}