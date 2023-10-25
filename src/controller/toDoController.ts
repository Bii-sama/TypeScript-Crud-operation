import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model/toDoModel";
import { updateNoteSchema,options } from "../utils/utils";

export const CreateTodo = async (req:Request | any, res: Response)=>{
  try{ 
    const verified = req.user;
    console.log(verified)
    const id = uuidv4()
    const {task, details, status, userID}= req.body

    const toDoRecord = await TodoInstance.create({
      id,
      task,
      details,
      status,
      userID: verified.id
    })
return res.status(201).json({
  msg: "New Task Added",
  toDoRecord
})
}catch(err){
 console.log(err)
  }
}



export const getNote = async(req:Request, res: Response)=>{

 
  try {

    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const getAllNotes = await TodoInstance.findAndCountAll({
      limit: limit,
      offset: offset
    })

  return res.status(200).json({
    msg: "All notes retrieved",
    count: getAllNotes.count,
    notes: getAllNotes.rows
  })
  } catch (error) {
    console.log(error)
  }

}


export const updateNote = async(req:Request, res: Response)=>{
  try {
    
    const { id } = req.params
    const {details} = req.body;
    const validateResult =  updateNoteSchema.validate(req.body, options);

// console.log(validateResult)

if(validateResult.error){
  return res.status(400).json({Error:validateResult.error.details[0].message})
}

const updateNote = await TodoInstance.findOne({where:{id}})

if(!updateNote){
  return res.status(400).json({
    error: "Note not found",
  
  })
}

const updatedNote = await updateNote.update({
  details
})

res.status(200).json({
  msg: "Successfully updated",
 updatedNote
})
    
  } catch (error) {
    console.log(error)
  }
}



export const deleteNote = async(req:Request, res: Response)=>{
  try {
    
    const { id } = req.params
    const validateResult =  updateNoteSchema.validate(req.body, options);

// console.log(validateResult)

if(validateResult.error){
  return res.status(400).json({Error:validateResult.error.details[0].message})
}

const deleteNote = await TodoInstance.findOne({where:{id}})

if(!deleteNote){
  return res.status(400).json({
    error: "Note not found",
  
  })
}

const deletedNote = await deleteNote.destroy()

res.status(200).json({
  msg: "Successfully deleted",
 deletedNote
})
    
  } catch (error) {
    console.log(error)
  }
}

