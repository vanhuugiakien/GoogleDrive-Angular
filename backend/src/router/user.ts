
import express = require('express');

const router = express.Router();
import admin = require('firebase-admin');
const auth = admin.auth()

router.post('/', async (res, reps) =>{
const input = res.body;
    try{
        if(input.firstName == "" || input.lastName == "" || input.phoneNumber == ""){
            reps.send({
                message: "Please fill in all the information",
            })
        }else if(input.password == "" || input.password.length < 7 || input.retypePassword == "" || input.password != input.retypePassword){
            reps.send({
                message: "Incorrect",
            })
        }else{

            let doc = await admin.firestore().collection('User').doc(input.email);
            if((await (doc.get())).exists){
                reps.send({
                    message: input.email + " is already existed.",
                })
            }else{
                let fireBaseUser = await auth.createUser({
                    email:input.email,
                    password:input.password,
                    displayName:input.firstName + input.lastName
                })
                await doc.set({
                    username:fireBaseUser.displayName,
                    uuid:fireBaseUser.uid
                })
                reps.send({
                    message: input.email + " is created."
                })
            }
        }
    }catch(e){
        reps.send({
            message: input.email + " is created."
        });
    }
})
export = router;