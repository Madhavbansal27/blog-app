const {validateToken} = require("../services/authentication")
function checkForAuthenticationCookie(cookieName) {
    return (req,res,next) =>{
        const tokenCookieValue = req.cookies[cookieName]
        
        if(!tokenCookieValue) {
        
           return next()
        };  
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload ;
        } 
        catch (error) {
            // Optionally, handle token validation errors
            console.error("Token validation error:", error);
        }

        return next();
        
    };
}

module.exports = {
    checkForAuthenticationCookie
}