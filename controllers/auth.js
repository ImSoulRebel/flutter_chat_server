const {response} = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response)=>{

    // extreamos campos
    const {email, password} = req.body;
    try{
        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya está registrado'
            });
        }
        const user = new User(req.body);
        //Encriptamos contraseña, generamos salt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        //grabamos en la base de datos
        await user.save();
        //Genear JsonWebToken
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
            // msg: 'Crear usuario!'
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable cone el administrador'
        });
    }
    }
    const login = async(req, res = response)=> {
        const {email, password} = req.body;
        try{
            //Validar Email
            const userDB = await User.findOne({email});
            if(!userDB){
                return  res.status(404).json({
                    ok:false,
                    msg: 'Email no encontrado'
                });
            }
            //Validar password
            const validatePassword = bcrypt.compareSync(password, userDB.password);
            if(!validatePassword){
                return  res.status(400).json({
                    ok:false,
                    msg: 'Password no coincide'
                });
            }
            //Generar JWT
            const token = await generateJWT(userDB.id);
            return res.json({
                ok: true,
                user: userDB,
                token
            });
        }
        catch(error){
            consoleç.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    }

    const renewToken = async(req, res = response) => {
        try{
            const userUid = req.uid;
            const userBD = await User.findById(userUid);
            const token = await generateJWT(userUid);
    
            res.json({
                ok: true,
                user: userBD,
                token
            })
        }catch(error){
            return res.status(500).json({
                ok: false,
                msg: 'Contacte con el administrador'
            })
        }
       
    }
module.exports = {
    crearUsuario, 
    login, 
    renewToken}

