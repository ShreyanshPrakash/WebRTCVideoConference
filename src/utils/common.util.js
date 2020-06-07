

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

function generateUiString( string = "", splitChar, joinChar, capitalCase ){
    if( splitChar ){
        string = string.split( splitChar );
        string = string.map( word => capitalCase ? toCapitalCase( word ) : word );
    }
    if( joinChar ){
        string = string.join( joinChar );
    }
    return string;
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
    generateUiString,
    getQueryParams,
}