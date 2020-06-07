
const { hostname } = window.location;

function getEnvVars(){
    if( hostname === 'devtrnd.com' ){
        return buildProdEnvVars();
    } else if( hostname === 'test.devtrnd.com' ){
        return buildTestEnvVars();
    } else if( hostname === 'localhost' ){
        return buildLocalEnvVars();
    } else{
        return buildDevEnvVars();
    }
}

function buildProdEnvVars(){
    return{
        ENV : 'prod',
    }
}

function buildTestEnvVars(){
    return{
        ENV:  'test',
    }
}

function buildLocalEnvVars(){
    return{
        ENV: 'local',
    }
}

function buildDevEnvVars(){
    return{
        ENV: 'dev',
    }
}

export {
    getEnvVars,
}
