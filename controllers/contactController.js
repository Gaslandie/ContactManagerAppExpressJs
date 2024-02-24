// express-async-handler est un middleware pour Express, un framework web pour Node.js, qui simplifie la gestion des erreurs asynchrones
//  dans les routeurs Express. Il est particulièrement utile lorsque tu travailles avec des routes asynchrones qui retournent des promesses.

// Lorsque tu utilises des routes asynchrones avec Express, il peut être fastidieux de gérer manuellement les erreurs avec un bloc try-catch à
//  chaque fois. express-async-handler simplifie ce processus en encapsulant automatiquement les routes asynchrones dans une fonction 
// qui gère les erreurs. Ainsi, tu peux écrire des routes asynchrones de manière plus concise.
const asyncHandler = require('express-async-handler');
//desc Get contacts
//@route Get /api/contacts
//@access public
getContacts =asyncHandler(async(req,res) => {
    try {
        res.status(200).json({mess:"there are your contact"});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
});

//desc Get a contact by id
//@route Get /api/contacts/:id
//@access public
getContact = asyncHandlerasync((req,res) => {
    try {
        const {id} = req.params;
        res.status(200).json({mess:`there is your contact with id:${id}`});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
});

//desc Create contact
//@route Post /api/contacts
//@access public
createContact = asyncHandler(async(req,res) => {

        const {name,email,phone} = req.body;
        if(!name || !email || !phone){
            throw new Error("all fields are mandatory");
        }
        console.log(req.body);
        res.status(201).json({mess:"product created"});
});

//desc Uptdate contact
//@route Put /api/contacts/:id
//@access public
updateContact = asyncHandler(async(req,res) => {
    try {
        const { id } = req.params;
        res.status(200).json({mess:`product updated with id:${id}`});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
});

//desc Delete contact
//@route Delete /api/contacts/:id
//@access public
deleteContact = asyncHandler(async(req,res) => {
    try {
        const { id } = req.params;
        res.status(200).json({mess:`product with id:${id} deleted`});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
})


module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}