const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Enseignant', enseignantSchema);
