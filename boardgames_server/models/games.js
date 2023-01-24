import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    title: String,
    players: [Number],
    gameTime: [Number],
    difficulty: Number,
    publisher: String,
    description: String,
    selectedFile: String,
    creator: String,
})

var Games = mongoose.model('Games', gameSchema);

export default Games;