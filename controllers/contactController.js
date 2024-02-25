// express-async-handler est un middleware pour Express, un framework web pour Node.js, qui simplifie la gestion des erreurs asynchrones
//  dans les routeurs Express. Il est particulièrement utile lorsque tu travailles avec des routes asynchrones qui retournent des promesses.

// Lorsque tu utilises des routes asynchrones avec Express, il peut être fastidieux de gérer manuellement les erreurs avec un bloc try-catch à
//  chaque fois. express-async-handler simplifie ce processus en encapsulant automatiquement les routes asynchrones dans une fonction 
// qui gère les erreurs. Ainsi, tu peux écrire des routes asynchrones de manière plus concise.
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//desc Get contacts
//@route Get /api/contacts
//@access public
getContacts =asyncHandler(async(req,res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});

//desc Get a contact by id
//@route Get /api/contacts/:id
//@access public
getContact = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//desc Create contact
//@route Post /api/contacts
//@access public
createContact = asyncHandler(async(req,res) => {
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({name,email,phone});
    res.status(201).json(contact);
});

//desc Uptdate contact
//@route Put /api/contacts/:id
//@access public
updateContact = asyncHandler(async(req,res) => {
   
        const { id } = req.params;
        const {name,email,phone} = req.body;
        const contact = await Contact.findById(id)
        if(!contact){
            res.status(404);
            throw new Error("contact not found");
        }else{
            contact.name = name || contact.name;
            contact.email = email || contact.email;
            contact.phone = phone || contact.phone;
            await contact.save();
        }
        res.status(200).json({mess:`contact updated with id:${id}`});
});

//desc Delete contact
//@route Delete /api/contacts/:id
//@access public
deleteContact = asyncHandler(async(req,res) => {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if(!contact){
            res.status(404);
            throw new Error("contact not found");
        }else{
            await contact.remove();
        }
        res.status(200).json({mess:`contact with id:${id} deleted`});
})


module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}