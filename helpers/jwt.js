const jwt = require('jsonwebtoken');

const generateJWT = (uid) =>{
   return new Promise((resolve, reject)=>{
    const payload = {uid};
    jwt.sign(payload, process.env.JWT_KEY,{
        expiresIn: '24h'
    }, (error, token)=>  {
        if(error){
            //no se pudo crear el token
            reject('No se pudo generar el JWT')
        }else{
            //TOKEN
            resolve(token);
        }
    });
   });
}

module.exports = {generateJWT}