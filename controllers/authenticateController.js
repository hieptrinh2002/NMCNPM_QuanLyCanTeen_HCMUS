const authenicate = async(permission) => {
    return (req,res,next) => {
        let _Role = null;
        if(req.sesion.user){
            _Role = req.sesion.user.role;
        }
        if(permission.includes(_Role)){
            next();
        }
        else{
            res.status(401).send('<h1>You don\'t have permission to access this page</h1>');
        }
    };
}

module.exports = {
    authenicate
};