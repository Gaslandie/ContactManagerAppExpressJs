

getContacts = (req,res) => {
    try {
        res.status(200).json({mess:"there are your contact"});
    } catch (error) {
        res.send((500).json({mess: error.message}));
    } 
}
getContact = (req,res) => {
    try {
        const {id} = req.params;
        res.status(200).json({mess:`there is your contact with id:${id}`});
    } catch (error) {
        res.send((500).json({mess: error.message}));
    } 
}

createContact = (req,res) => {
    try {
        res.status(200).json({mess:"product created"});
    } catch (error) {
        res.send((500).json({mess: error.message}));
    } 
}

updateContact = (req,res) => {
    try {
        const { id } = req.params;
        res.status(200).json({mess:`product updated with id:${id}`});
    } catch (error) {
        res.send((500).json({mess: error.message}));
    } 
}
deleteContact = (req,res) => {
    try {
        const { id } = req.params;
        res.status(200).json({mess:`product with id:${id} deleted`});
    } catch (error) {
        res.send((500).json({mess: error.message}));
    } 
}


module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}