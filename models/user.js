const { Schema, model } = require("mongoose");

const UserScheme = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

UserScheme.method('toJSON', function(){
    //regresamos el objeto con todas las propiedades no mencionadas aquí
    const{__v,_id,password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserScheme);