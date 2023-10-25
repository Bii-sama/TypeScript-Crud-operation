import Joi from "joi";

export const UserRegisterSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    firstName: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/).required(),
    confirm_password: Joi.any().equal(Joi.ref("password")).required().label("Confirm Password")
    .messages({'any.only':'{{#label}} does not match'})
})


export const options = {
  abortEarly : false,
  errors:{
    wrap:{
        label: ""
    }
    
  }
}


export const UserLoginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/).required(),
})


export const updateNoteSchema = Joi.object().keys({
  details: Joi.string().lowercase(),
  
})