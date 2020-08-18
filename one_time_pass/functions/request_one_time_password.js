const admin =require('firebase-admin')
const twilio =require('twilio')

module.exports =function(req,res){
    //validation step
    if(!req.body.phone) {
        return res.status(422).send({error :'You must provide a phone number'})
    }

    //sanitize nummber
    const phone= String(req.body.phone).replace(/[^\d]/g,"")

    //find the user in firebase db using phone
    //async request
    admin.auth().getUser(phone)
        .then(userRecord => {
            //generate the code
            const code =Math.floor((Math.random() * 8999 +1000))

            //text the user
            twilio.messages.create({
                body:'Your code is' + code,
                to:phone,
                from :'+14253187489'
            },// when code is not sent successfully
            (err) => {
                if(err) {return res.status(422).send(err)}
                //when code is sent successfully
                admin.database().ref('users/' + phone)
                //callback
                .update({code:code,codeValid:true},()=> {
                    res.send({success :true})
                })
            })

        })
        .catch((err)=> {
            res.status(422).send({error :err})

        })

}
