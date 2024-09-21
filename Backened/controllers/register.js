const { v4: uuidv4 } = require('uuid');
function handleRegisterUser(req,res){
    const uuid = uuidv4();
    const { firstName , lastName , email, password , role} = req.body;
    const profileImagePath = req.file ? req.file.path : null;
    console.log(req.file)
    console.log(profileImagePath , req.body)

    // console.log(firstName , lastName , email , password , role , uuid , photo)
}


module.exports = handleRegisterUser
