import Ably from "ably/promises";
import { currentUser } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export const GET = async (req, res) => {

 // Your application should perform some type of user 
 // authorization to validate that the user is allowed 
 // to receive a token before fulfilling the token request 
 // if (requesting_user.isAuthenticated) {

    //const clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const user = await currentUser();

    const client = new Ably.Rest.Promise(process.env.NEXT_ABLY_API_KEY);
    const tokenRequestData = await client.auth.requestToken({
      clientId: user?.username,
      ttl: 120000
    });
    console.log(`Request: ${JSON.stringify(tokenRequestData)}`);
    return Response.json(tokenRequestData);

  //} else {
 // res.status(401).json({ 'error':'User is not authorized' })
  //}
};