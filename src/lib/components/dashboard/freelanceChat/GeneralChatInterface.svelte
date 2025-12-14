<script>
    import { onMount, tick } from "svelte";

    export let messages = [];
    export let onSendMessage;
    export let recipientName = "Client";
    export let onBack = null;

    let newMessage = "";
    let chatContainer;

    async function handleSend() {
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        newMessage = "";
        await tick();
        scrollToBottom();
    }

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    onMount(() => {
        scrollToBottom();
    });

    // Auto-scroll when messages change
    $: if (messages) {
        (async () => {
            await tick();
            scrollToBottom();
        })();
    }
</script>

<div class="flex flex-col h-full bg-white">
    <!-- Chat Header -->
    <div
        class="p-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10"
    >
        <div class="flex items-center gap-3">
            {#if onBack}
                <button
                    on:click={onBack}
                    class="md:hidden -ml-1 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Back to client list"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-5 h-5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </button>
            {/if}
            <div
                class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold"
            >
                {recipientName.charAt(0)}
            </div>
            <div>
                <h3 class="text-sm font-bold text-gray-900">{recipientName}</h3>
                <span
                    class="text-[10px] text-green-500 font-medium flex items-center gap-1"
                >
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Online
                </span>
            </div>
        </div>
        <button
            class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
            aria-label="Chat options"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
            </svg>
        </button>
    </div>

    <!-- Messages Area -->
    <div
        bind:this={chatContainer}
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30"
    >
        {#each messages as msg (msg.id)}
            <div class="flex {msg.isMe ? 'justify-end' : 'justify-start'}">
                <div
                    class="flex flex-col space-y-1 max-w-[70%] {msg.isMe
                        ? 'items-end'
                        : 'items-start'}"
                >
                    <div
                        class="px-4 py-2.5 rounded-2xl text-sm shadow-sm {msg.isMe
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'}"
                    >
                        <p class="leading-relaxed">{msg.text}</p>
                    </div>
                    <span class="text-[10px] text-gray-400 px-1">
                        {msg.timestamp}
                    </span>
                </div>
            </div>
        {/each}

        {#if messages.length === 0}
            <div
                class="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50"
            >
                <div
                    class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                    </svg>
                </div>
                <p class="text-sm font-medium text-gray-500">No messages yet</p>
                <p class="text-xs text-gray-400 max-w-[200px]">
                    Send a hello to engage with your client!
                </p>
            </div>
        {/if}
    </div>

    <!-- Input Area -->
    <div class="p-4 bg-white border-t border-gray-100">
        <form
            on:submit|preventDefault={handleSend}
            class="flex items-end gap-2 bg-gray-50 rounded-2xl p-2 pr-2 border border-gray-200/50 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/30 transition-all"
        >
            <button
                type="button"
                class="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Attach file"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>

            <div class="flex-1 relative py-1">
                <textarea
                    bind:value={newMessage}
                    on:keydown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Type your message..."
                    rows="1"
                    class="block w-full border-none bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm resize-none max-h-32"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={!newMessage.trim()}
                class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
                    />
                </svg>
            </button>
        </form>
    </div>
</div>
