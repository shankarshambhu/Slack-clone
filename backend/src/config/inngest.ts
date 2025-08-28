import { Inngest } from "inngest";
import { connectDb } from "./db";
import { User } from "../models/user.model";
import { deleteStreamUser, upsertStreamUser } from "./stream";

export const inngest = new Inngest({ id: 'slack-clone' });

const createUser = inngest.createFunction(
    { id: 'user creation' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        await connectDb();
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url
        }
        await User.create(newUser);
        
        await upsertStreamUser({
            id: newUser.clerkId,
            name: newUser.name,
            image: newUser.image
        })
    }

)

const deleteUser = inngest.createFunction(
    { id: 'user deletion' },
    { event: 'clerk/user.deleted' },

    async ({ event }) => {
        await connectDb();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });

        await deleteStreamUser(id.toString());
    }
)


export const functions = [createUser, deleteUser];