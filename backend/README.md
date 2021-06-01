# express-backed
Express Rest API with mongo db database.

# how to commit code in reprository.

1) Check whether changes is exist. "git status"
2) If changes exist then add the file in staged with the command. "git add ." or if want to one file do "git add filePath"
3) After staged changes you need to commit the code with in whatever branch with command " git commit -m commitdescription"

4) "git push" to send the changes to reprository.

# joi Validation Register API
1). npm install joi 
2). create schema validation object of registration  for  the request body.
3). To create require package of joi
   example: const Joi=require('joi')
4). const Joi = require('joi');

const userObject = (body) => {
    const schema = {
        fName: Joi.string().min(6).required(),
        lName: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().min(10).required(),
        password: Joi.string().max(25).required(),
        address: Joi.string().max(225).required(),
    }
    return Joi.validate(body, schema);
}

module.exports = { userObject };


#Create API Steps:-

1. Create router file in routes folder(ex:post.js)
2. Create model file in models folder(ex:postModel.js)
3. If required validation in your router create validation file in validation folder(ex:postValidation.js)
4. After completing all the above points go to main(app.js)  file inside that with the using 
app.use(initialiseTheFirstPoint  , import the router file u have created above like eg:import postRouter from routes folder )



