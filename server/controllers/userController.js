import { Svix, Webhook } from "svix"
import userModel from "../models/userModel.js";

//Api controller fun to manage clerh user from database 

const clerkWebhook = async (req,res)=>{
    try {
        // create a svix instance with clerk  webhook  secret 
        const whook = new Webhook(process.env.CLERK_WEBHOOK-SECRET);

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.header["svix.id"],
            "svix-signature": req.header["svix.signature"],
            "svix-timestamp": req.header["svix.timestamp"]
        })
        const {data , type } = req.body;
        switch (type) {
            case "user.created":{
                const userData = {
                    clerkId: data.id,
                    email: email_addresses[0].email_address,
                    photo:data.image_url,
                    firstName: data.first_name,
                    lastName: data.last_name

                }
                await userModel.create(userData);
                res.JSON({

                })

                break;
            }
            case "user.updated":{
                const userData = {
                    email: email_addresses[0].email_address,
                    photo:data.image_url,
                    firstName: data.first_name,
                    lastName: data.last_name

                }
                await userModel.findOneAndUpdate({clerkId:data.id},userData);
                res.JSON({})
                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId:data.id});
                res.json({})
                break;
            }
                
        
            default:
                break;
        }

    } catch (error) {
        console.log(error.message)
        res.JSON({
            success:false,
            message:error.message,

        })
    }
}

export default clerkWebhook;