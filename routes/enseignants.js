const express = require('express');
const router = express.Router();
const Enseignant = require('../models/Enseignant');

// Page pour ajouter un enseignant
router.get('/ajouter', (req, res) => {
    res.render('enseignants/ajouter');
});

// Enregistrer enseignant depuis le formulaire
router.post('/ajouter', async (req, res) => {
    const enseignant = new Enseignant({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        age: req.body.age,
        phone: req.body.phone
    });

    try {
        await enseignant .save();
        res.redirect('/enseignants/liste');
    } catch (err) {
        res.status(400).send('Erreur : ' + err.message);
    }
});

// Page liste des enseignants
router.get('/liste', async (req, res) => {
    try {
        const enseignants = await Enseignant.find();
        res.render('enseignants/liste', { enseignants });
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

// Page pour modifier un étudiant
router.get('/modifier/:id', async (req, res) => {
    try {
        const enseignant = await Enseignant.findById(req.params.id);
        if (!enseignant) return res.status(404).send('Enseignant non trouvé');
        res.render('enseignants/modifier', { enseignant });
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

// Mettre à jour l'étudiant
router.post('/modifier/:id', async (req, res) => {
    try {
        await Enseignant.findByIdAndUpdate(req.params.id, {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone
        });
        res.redirect('/enseignants/liste');
    } catch (err) {
        res.status(400).send('Erreur : ' + err.message);
    }
});

// Supprimer un étudiant
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Enseignant.findByIdAndDelete(req.params.id);
        res.redirect('/enseignants/liste');
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

module.exports = router;
