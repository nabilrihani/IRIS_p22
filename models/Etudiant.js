const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    Adresse: { type: String, required: false }
});

module.exports = mongoose.model('Etudiant', etudiantSchema);
