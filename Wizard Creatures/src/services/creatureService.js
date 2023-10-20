const Creature = require('../models/Creature');


exports.create = (creatureData) => Creature.create(creatureData);

exports.getAll = () => Creature.find().populate('owner');

exports.getOne = (creatureId) => Creature.findById(creatureId).populate('owner').populate('votes');

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.edit = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId, creatureData, { runValidators: true });


exports.getByOwner = (userId) => Creature.find({ owner: userId }).populate('owner');
// populate owner, because in  profile.hbs use owner.firstName and owner.lastName for author section



exports.getVote = async (creatureId, userId) =>{

 const creature = await Creature.findById(creatureId);

 const isExists = creature.votes.some((vote) => vote?.toString() === userId);
 
 if(isExists){
    return;
 }
creature.votes.push(userId);
return creature.save();
}

//exports.getVote = (creatureId, userId) => Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } }).populate('owner')