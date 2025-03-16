import OpenAI from 'openai';
import useChatSystemInstructions from "~/server/composeables/useChatSystemInstructions.js";

export default defineWebSocketHandler({
    open(peer) {
        peer.send({from: "AI", message: `Welcome! How can I help you today with our products?`});
    },
    async message(peer, message) {
        if (message.text().includes("ping")) {
            peer.send({from: "server", message: "pong"});
        } else {
            peer.send({from: "server", message: "generation_started"});

            const client = new OpenAI({
                apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
            });

            // {"from":"Customer","message":"Hello!"}
            const messageObjectFromFrontend = JSON.parse(message.text());

            const response = await client.responses.create({
                model: 'gpt-4o',
                instructions: useChatSystemInstructions(),
                input: messageObjectFromFrontend.message,
            });

            peer.send({from: "server", message: "generation_finished"});
            peer.send({from: "AI", message: response.output_text});
        }
    },
    close(peer) {
    },
});

