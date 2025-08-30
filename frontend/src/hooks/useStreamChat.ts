import { StreamChat } from 'stream-chat';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
    const { user } = useUser();
    const [chatClient, setChatClient] = useState<StreamChat | null>(null);


    const { data: tokenData, isLoading: tokenLoading, error: tokenError } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!user?.id,

    })
    useEffect(() => {
        const initChat = async () => {
            if (!tokenData?.token || !user) return;
            try {
                const client = StreamChat.getInstance(STREAM_API_KEY);
                await client.connectUser(
                    {
                        id: user.id,
                        name: user.fullName ?? user.username ?? user.primaryEmailAddress?.emailAddress ?? user.id,
                        image: user.imageUrl,
                    },
                    tokenData.token
                );
                setChatClient(client);

            } catch (error) {
                console.log("error connecting to the stream", error);
                Sentry.captureException(error, {
                    tags: { component: "userStreamChat" },
                    extra: {
                        context: "stream_chat_connection",
                        userId: user?.id,
                        streamApiKey: STREAM_API_KEY ? "present" : "missing",
                    }
                })


            }

        }
        initChat();
        return () => {
            if (chatClient) chatClient.disconnectUser();
        }

    }, [tokenData, user,]);
    return {chatClient,isLoading:tokenLoading,error:tokenError}
}
