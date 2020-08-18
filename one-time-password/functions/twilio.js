const twilio =require('twilio')

//two tokens that will allow us to send message or authenticate us with the twilio API
const accountSid='AC5d862bb40f2aad0d843f331d0eb20602'
const authToken ='ace9385875edb4f155be34f5f5f7538c'


//create twilio client and export it from this file
module.exports=new twilio.Twilio(accountSid,authToken)