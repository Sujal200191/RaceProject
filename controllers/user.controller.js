const jwt = require('jsonwebtoken');

const { userService } = require('../services');



async function getUser(req, res){
    try{
        const { id } = req.params;
        let response = await userService.getUser(id);
        return res.status(response.statusCode).send(response);
    }catch(error){
        console.log('Error encountered in getUser() in user.controller: ', error)
        return res.status(response.statusCode).send(error);
    }     
}

async function getAllUsers(req, res){
    try{
        let response = await userService.getAllUsers(req.query);
        return res.status(response.statusCode).send(response);
    }catch(error){
        console.log('Error encountered in getAll() in user.controller: ', error);
        return res.status(response.statusCode).send(error);
    }    
}

async function updateUser(req, res) {
    try{
        const { id } = req.params;

        let response = await userService.updateUser(id, req.body);
        return res.status(response.statusCode).send(response);
    }catch(error){
        console.log('Error encountered in updateUser() in user.controller: ', error);
        return res.status(response.statusCode).send(error)
    }   
}

async function deleteUser(req, res) {
    try{
        const { id } = req.params;
        let response = await userService.deleteUser(id);
        return res.status(response.statusCode).send(response);
    }catch(error){
        console.log('Error encountered in delete() in user.controller: ', error);
        return res.status(response.statusCode).send(error);
    }    
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} 
