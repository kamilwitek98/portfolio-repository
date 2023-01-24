import mongoose from "mongoose";
import Games from "../models/games.js";

export const getGames = async (req, res) => {
    try {
        const games = await Games.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createGame = async (req, res) => {
    const game = req.body;
    const newGame = new Games({...game, creator: req.userId});
    
    try {
        await newGame.save()
        res.status(201).json(newGame);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteGame = async (req, res) => {
    const {id: _id } = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No game with that id');

    const game = await Games.findById(_id);

    if(game.creator === req.userId || req.isAdmin){
        await Games.findByIdAndDelete(_id);

        res.json({message: 'Game deleted successfully'});
    } else{
        res.status(401).json({message: 'Permission denied'})
    }
    
}

export const updateGame = async (req, res) => {
    const { id: _id } = req.params;
    const game = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No game with that id');
    
    const oldGame = await Games.findById(_id);

    if(oldGame.creator === req.userId || req.isAdmin){
        const updatedGame = await Games.findByIdAndUpdate(_id, game, { new: true });

        res.json(updatedGame);
    } else{
        res.status(401).json({message: 'Permission denied'})
    }
    
}