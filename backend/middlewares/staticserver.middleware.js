const fs = require('fs');
const path = require('path');

let env = 'dev';
const staticServerMiddleware = (req,res,next) => {

    if( env == 'prod' ){
        fs.createReadStream(
            path.join(
                __dirname,
                'build',
            )
        ).pipe(
            res
        )
    }

    next();
}

module.exports = {
    staticServerMiddleware,
}