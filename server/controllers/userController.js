import { Svix, Webhook } from "svix";
import userModel from "../models/userModel.js";

const clerkWebhook = async (req, res) => {
  try {
    console.log("Received webhook:", req.body);
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body),{
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;
    console.log("Webhook Type:", type);

    switch (type) {
      case "user.created":{
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        console.log("Creating user:", userData);
        await userModel.create(userData);
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({ success: true });
        break;
      }

      default:
        res.json({ success: false, message: "Unhandled event type" });
        break;
    }
  } catch (error) {
    console.log("Webhook error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { clerkWebhook } ;
