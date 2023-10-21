const Animal = require('../models/Animal');


exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find().populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);


exports.getByOwner = (userId) => Animal.find({ owner: userId }).populate('owner');
// populate owner, because in  profile.hbs use owner.firstName and owner.lastName for author section

exports.getVote = async (animalId, userId) => {

   const animal = await Animal.findById(animalId);

   const isExists = animal.donations.some((vote) => vote?.toString() === userId);

   if (isExists) {
      return;
   }
   animal.donations.push(userId);
   return animal.save();
}

exports.getLastThreeCreatedAnimals = () => {
   return Animal.find().sort({ _id: -1 }).limit(3).lean();
}

exports.search = async (search) => {
   let animals= await this.getAll().lean();

   if (search) {
      animals = animals.filter(x => x.location.toLowerCase() == search.toLowerCase());
console.log('succsess search:' , animals)
   }
  
   return animals;
}

//exports.getVote = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } }).populate('owner')