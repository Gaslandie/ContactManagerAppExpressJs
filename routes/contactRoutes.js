const express = require('express');
const router = express.Router();
const {getContacts,createContact,updateContact,deleteContact,getContact} = require('../controllers/contactController');

router.get('/',getContacts).post('/',createContact);
router.get('/:id',getContact).put('/:id',updateContact).delete('/:id',deleteContact);

module.exports = router;