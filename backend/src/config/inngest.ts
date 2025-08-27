import { Inngest } from "inngest";
import { connectDb } from "./db";
import { User } from "../models/user.model";

export const inngest = new Inngest({ id: 'slack-clone' });

const createUser = inngest.createFunction(
    { id: 'user creation' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        await connectDb();
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        console.log(event.data);

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url
        }
        await User.create(newUser);

    }
)

const deleteUser = inngest.createFunction(
    { id: 'user deletion' },
    { event: 'clerk/user.deleted' },

    async ({ event }) => {
        await connectDb();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id })
    }
)

export const functions = [createUser];