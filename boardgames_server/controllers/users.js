import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import GameUser from '../models/users.js';


export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const existingUser = await GameUser.findOne({ email });

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials.'})
    
        const token = jwt.sign({email: existingUser.email, id: existingUser._id, isAdmin: existingUser.isAdmin}, 'test', { expiresIn: '1h'});

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try{
        const existingUser = await GameUser.findOne({ email });

        if(existingUser) return res.status(404).json({message: "User already exist."})

        if(password !== confirmPassword) return res.status(404).json({message: "Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await GameUser.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})
    
        const token = jwt.sign({ email: result.email, id: result._id, isAdmin: result.isAdmin}, 'test', { expiresIn: '1h'});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

export const getUsers = async (req, res) => {
    try{

        if(req.isAdmin){
            const users = await GameUser.find();

            res.status(200).json(users);
            
        } else{
            res.status(401).json({message: 'Permission denied'})
        }
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');
    
    if(req.isAdmin){
        const user = await GameUser.findById(_id);
    
        await GameUser.findByIdAndUpdate(_id, {isAdmin: !user?.isAdmin})

        res.status(200).json({message: "User updated"});
        
    } else{
        res.status(401).json({message: 'Permission denied'})
    }
}