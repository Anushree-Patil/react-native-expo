const twilio =require('twilio')

//two tokens that will allow us to send message or authenticate us with the twilio API
const accountSid=''
const authToken =''


//create twilio client and export it from this file
module.exports=new twilio.Twilio(accountSid,authToken)
