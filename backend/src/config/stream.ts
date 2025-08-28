import { StreamChat } from "stream-chat";
const api_key = process.env.STREAM_API_KEY;
const secret_key = process.env.STREAM_SECRET_KEY;
interface StreamDataUser {
    id: string,
    name: string,
    image: string
}

if (!api_key || !secret_key) {
    throw new Error("Missing Stream API key or secret");
}

const streamClient = StreamChat.getInstance(api_key, secret_key);

export const upsertStreamUser = async (userData: StreamDataUser) => {
    try {
        await streamClient.upsertUser(userData);
        console.log('User added to Stream ', userData.name);
        return userData;
    } catch (error) {
        console.log("User not Added to Stream", error);
    }
}

export const deleteStreamUser = async (userId: string) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("User deleted successfully");
    } catch (error) {
        console.log("User deletion failed", error);
    }

}
export const generateStreamToken = (userId: string) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log('error generating token', error);


    }
}