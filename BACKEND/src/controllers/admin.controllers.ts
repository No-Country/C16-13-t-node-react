import { Request, Response } from "express";
import usersModel from "../models/user";
import newsModel from '../models/notices'
import {Roles} from "../models/user";
import { Category } from "../models/notices";
import { comparePassword } from '../middlewares/validate-jwt'

export const adminLogIn = async (req: Request, res: Response) => {
    try {
        const adminEmail = await usersModel.findOne({email: req.body.email})
        
        if(adminEmail){
            const isPasswordMatch = await comparePassword(req.body.pass, adminEmail.pass);
            
            if(isPasswordMatch && Roles.ADMIN === adminEmail.rol){
                return true
            }
            return false
        }
        console.log(`Email ${req.body.email} not found.`);
        res.send(`Email ${req.body.email} not found.`) 
    } catch (error) {
        res.send(error)
    }
};

export const supAdminLogin = async(req: Request, res: Response) => {
    try {
        const adminEmail = await usersModel.findOne({email: req.body.email})
        
        if(adminEmail){
            const isPasswordMatch = await comparePassword(req.body.pass, adminEmail.pass);
            
            if(isPasswordMatch && Roles.SUPADMIN === adminEmail.rol){
                // res.send(`You logged in as ${adminEmail.name}.`)
                return true
            }
            // res.send('Can´t access here.')
            return false
        }else{
            console.log(`Email ${req.body.email} not found.`);
            return false

        }
        // res.send(`Email ${req.body.email} not found.`) 
    } catch (error) {
        res.send(error)
    }
}

// export const changeRole = async(req: Request, res: Response) => {
//     try {
//         const role = req.body.rol
//         if(await supAdminLogin(req, res)){
//             const user = await usersModel.findOne({name: req.body.name})
//             if(user && (role === Roles.SUPADMIN || role === Roles.ADMIN ||role === Roles.USER)){
//                 await usersModel.updateOne({_id: user._id}, { rol: role } )
//                 await user.save()
//                 res.send(`You´ve change the role of ${user.name}. Now he/she is ${role} `)
//             }else if(role !== Roles.SUPADMIN || role !== Roles.ADMIN ||role !== Roles.USER){
//                 res.send(`Error. Invalid role: ${role}`)
//             }
//             else{
//                 res.send('Something went wrong')
//             }
//         }else{
//             res.send(await supAdminLogin(req, res))
//         }
//     } catch (error) {
//         res.send(error)
//     }
// }

export const changeRole = async(req: Request, res: Response) => {
    try {
        const role = req.body.rol
        const user = await usersModel.findOne({name: req.body.name})
        if(await supAdminLogin(req, res)){
            if(user && (role === Roles.SUPADMIN || role === Roles.ADMIN ||role === Roles.USER)){
                await usersModel.updateOne({_id: user._id}, { rol: role } )
                await user.save()
                res.send(`You´ve change the role of ${user.name}. Now he/she is ${role} `)
            }else if(role !== Roles.SUPADMIN || role !== Roles.ADMIN ||role !== Roles.USER){
                res.send(`Error. Invalid role: ${role}`)
            }else{
                res.send('Something went wrong')
            }
        }else{
            res.send(`You don´t have enough permissions.`)
        }
    } catch (error) {
        res.send(error)
    }
}

export const banUnban = async (req: Request, res: Response) => {
    try {
        if(await supAdminLogin(req, res) || await adminLogIn(req, res)){
            const admin = await usersModel.findOne({email: req.body.email})
            const user = await usersModel.findOne({name: req.body.name})
            const action: boolean = req.body.available
            if(admin && user){
                
                if(user.rol < admin.rol){
                    
                    await usersModel.updateOne({_id: user._id}, { available: action } )
                    user.save()
                    if(action === true){
                        res.send(`User ${user.name} got unbanned.`)
                    }else{
                        res.send(`User ${user.name} got banned.`)
                    }
                }else{
                    res.send(`You can´t ban or unban a higher rank user.`)
                }
            }
            if(!user){
                res.send(`User ${req.body.name} not found.`)
            }
        }else{
            res.send(`You can´t access here`)
        }
    } catch (error) {
        res.send(error)
    }
}

export const editOtherInformation = async(req: Request, res: Response) => {
    try {
        if(await supAdminLogin(req, res) || await adminLogIn(req, res)){
            
            const userToModifie = await usersModel.findOne({name: req.params.name})
            const admin = await usersModel.findOne({email: req.body.email})
            
            
            if(userToModifie && admin && userToModifie.rol <= admin.rol){
                console.log("hola");
                const { name, lastName, age, password } = req.body;

                const updateFields= {
                    name,
                    lastName,
                    age,
                    password
                };

                await usersModel.updateOne({_id: userToModifie._id}, updateFields);
                
                userToModifie.save()
                res.send('Modificado')
            }else{
                res.send('Something went wrong')
            }
        }else{
            res.send(`You can´t access here.`)
        }
    } catch (error) {
        
    }
}

export const modifieCategoryOfNew = async (req: Request, res:Response) => {
    try {
        if(await supAdminLogin(req, res) || await adminLogIn(req, res)){
            
            const newId = await newsModel.findOne({_id: req.params.id})
            const newCategory = req.body.newCategory
            if(newId){
                const isCategoryValid = (value: string): boolean => {
                    return Object.values(Category).includes(value as Category);
                }
                
                if(isCategoryValid(newCategory)){
                    await newId.updateOne({category: newCategory})
                    await newId.save()
                    res.send(`Category of the new ${newId.title} has been changed. New category ${newCategory}`)
                }else{
                    res.send(`Category ${newCategory} doens´t exist.`)
                }
            }
            
        }else{
            res.send(`You can´t access here.`)
        }
    } catch (error) {
        res.send(error)
    }
}