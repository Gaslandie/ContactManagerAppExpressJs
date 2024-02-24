
//desc Get contacts
//@route Get /api/contacts
//@access public
getContacts = (req,res) => {
    try {
        res.status(200).json({mess:"there are your contact"});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
}

//desc Get a contact by id
//@route Get /api/contacts/:id
//@access public
getContact = (req,res) => {
    try {
        const {id} = req.params;
        res.status(200).json({mess:`there is your contact with id:${id}`});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
}

//desc Create contact
//@route Post /api/contacts
//@access public
createContact = (req,res) => {

        const {name,email,phone} = req.body;
        if(!name || !email || !phone){
            throw new Error("all fields are mandatory");
        }
        console.log(req.body);
        res.status(201).json({mess:"product created"});
}

//desc Uptdate contact
//@route Put /api/contacts/:id
//@access public
updateContact = (req,res) => {
    try {
        const { id } = req.params;
        res.status(200).json({mess:`product updated with id:${id}`});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
}

//desc Delete contact
//@route Delete /api/contacts/:id
//@access public
deleteContact = (req,res) => {
    try {
        const { id } = req.params;
        res.status(200).json({mess:`product with id:${id} deleted`});
    } catch (error) {
        res.send(500).json({mess: error.message});
    } 
}


module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}