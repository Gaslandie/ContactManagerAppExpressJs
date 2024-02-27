const express = require('express');
const router = express.Router();
const {getContacts,createContact,updateContact,deleteContact,getContact} = require('../controllers/contactController');
const validateToken = require('../middlewares/validateTokenHandler');

//verify if the token is valid,if so,proceed to the next middleware or route
router.use(validateToken);
router.get('/',getContacts).post('/',createContact);
router.get('/:id',getContact).put('/:id',updateContact).delete('/:id',deleteContact);

module.exports = router;