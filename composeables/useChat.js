export default function () {
    const messages = ref([]);
    const isLoading = ref(false);

    let ws;
    const openWebsocket = () => {
        ws = new WebSocket('ws://localhost:3000/chat');
        ws.onopen = () => {
            console.log('Websocket opened');
        };
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.from === 'server' && message.message === 'generation_started') {
                isLoading.value = true;
                return;
            }
            if (message.from === 'server' && message.message === 'generation_finished') {
                isLoading.value = false;
                return;
            }

            messages.value.push(message)
        };
    }

    const sendMessage = (message) => {
        const obj = {
            from: 'Customer',
            message
        };
        messages.value.push(obj)
        ws.send(JSON.stringify(obj));
    }

    return {
        messages,
        isLoading,
        openWebsocket,
        sendMessage
    }
}