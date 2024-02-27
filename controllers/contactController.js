// express-async-handler est un middleware pour Express, un framework web pour Node.js, qui simplifie la gestion des erreurs asynchrones
//  dans les routeurs Express. Il est particulièrement utile lorsque tu travailles avec des routes asynchrones qui retournent des promesses.

// Lorsque tu utilises des routes asynchrones avec Express, il peut être fastidieux de gérer manuellement les erreurs avec un bloc try-catch à
//  chaque fois. express-async-handler simplifie ce processus en encapsulant automatiquement les routes asynchrones dans une fonction 
// qui gère les erreurs. Ainsi, tu peux écrire des routes asynchrones de manière plus concise.
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//desc Get contacts
//@route Get /api/contacts
//@access private
const getContacts =asyncHandler(async(req,res) => {
    //get all contacts of the logged in user
    const contacts = await Contact.find({user_id:req.user._id});
    res.status(200).json(contacts);
});

//desc Get a contact by id
//@route Get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
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
//@access private
const createContact = asyncHandler(async(req,res) => {
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({name,email,phone,user_id:req.user._id});
    res.status(201).json(contact);
});

//desc Uptdate contact
//@route Put /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res) => {
   
        const { id } = req.params;
        const {name,email,phone} = req.body;
        const contact = await Contact.findById(id)
        if(!contact){
            res.status(404);
            throw new Error("contact not found");
        }
        if(contact.user_id.toString() !== req.user._id.toString()){
            res.status(401);
            throw new Error("Not authorized to update this contact");
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }   
        )
        res.status(200).json(updatedContact);
});

//desc Delete contact
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req,res) => {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if(!contact){
            res.status(404);
            throw new Error("contact not found");
        }
        if(contact.user_id.toString() !== req.user._id.toString()){
            res.status(401);
            throw new Error("Not authorized to delete this contact");
        }
        await contact.deleteOne({_id:req.params.id});
        res.status(200).json(contact);
})


module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}