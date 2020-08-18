const admin =require('firebase-admin')

module.exports =function(req,res) {      
    if(!req.body.phone  || ! req.body.code) {
        return res.status(422).send({error : 'Phone and code must be provided'})

    }

    //sanitize nummber
    const phone= String(req.body.phone).replace(/[^\d]/g,"")
    //we a get a number not a string
    const code = parseInt(req.body.bodycode)
    //fetch the user and code associated with them ,compare them user should be authenticated or not
    admin.auth().getUser(phone)
        .then(()=> {
            const ref =admin.database().ref('users/' + phone)
            ref.on('value',snapshot => {
                //after getting value one time , stop listening
              const user =snapshot.val()

              //code doesnt match or code is now invalid
              if(user.code !== code || !user.codeValid) {
                  return res.status(422).send({error:'Code not valid'})
              }

              //mark the exisiting code invalid
              ref.update ({codeValid: false})

              //generate JWT and send it to the user
              admin.auth().createCustomToken(phone)
                .then(token => res.send({token:token}))

          })  

        })
        .catch((err) => res.status(422).send({error :err}))

}