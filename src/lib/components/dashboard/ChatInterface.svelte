<script>
    import { onMount, tick } from "svelte";

    let { messages = [], onSendMessage, disabled = false } = $props();

    let newMessage = $state("");
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

    $effect(() => {
        messages;
        tick().then(scrollToBottom);
    });
</script>

<div
    class="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
>
    <!-- Messages Area -->
    <div
        bind:this={chatContainer}
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
    >
        {#each messages as msg (msg.id)}
            <div class="flex {msg.isMe ? 'justify-end' : 'justify-start'}">
                <div
                    class="flex flex-col space-y-1 max-w-[80%] {msg.isMe
                        ? 'items-end'
                        : 'items-start'}"
                >
                    <div
                        class="px-4 py-2 rounded-2xl text-sm shadow-sm {msg.isMe
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-white text-gray-900 border border-gray-100 rounded-bl-none'}"
                    >
                        <p>{msg.text}</p>
                    </div>
                    <span class="text-[10px] text-gray-400 px-1">
                        {msg.sender} • {msg.timestamp}
                    </span>
                </div>
            </div>
        {/each}

        {#if messages.length === 0}
            <div
                class="flex h-full items-center justify-center text-gray-400 text-sm"
            >
                No messages yet. Start the conversation!
            </div>
        {/if}
    </div>

    <!-- Input Area -->
    <div class="p-4 bg-white border-t border-gray-100">
        {#if disabled}
            <div class="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p class="text-sm text-gray-500">
                    This ticket is closed. Chat is disabled.
                </p>
            </div>
        {:else}
            <form
                onsubmit={(e) => { e.preventDefault(); handleSend(); }}
                class="flex items-end gap-2"
            >
                <div class="flex-1 relative">
                    <textarea
                        bind:value={newMessage}
                        onkeydown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Type your message..."
                        rows="1"
                        class="block w-full rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none bg-gray-50 focus:bg-white transition-colors"
                    ></textarea>
                    <div
                        class="absolute right-2 bottom-2 text-[10px] text-gray-400 hidden sm:block"
                    >
                        Press Enter to send
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    class="inline-flex items-center justify-center rounded-xl bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                    >
                        <path
                            d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
                        />
                    </svg>
                </button>
            </form>
        {/if}
    </div>
</div>
