<script>
    export let settings = {
        showPhoneNumber: false,
        notificationDelay: "1h", // '1h', '30m', 'immediate'
    };
</script>

<div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900">Privacy & Notifications</h2>
        <p class="text-sm text-gray-500 mt-1">
            Control what clients see and how you get notified.
        </p>
    </div>

    <div class="space-y-8 max-w-2xl">
        <!-- Privacy Section -->
        <div class="flex items-center justify-between group">
            <div class="flex-1 pr-8">
                <h3 class="text-sm font-bold text-gray-900">
                    Client Visibility
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    Allow clients to see your phone number on their dashboard.
                </p>
            </div>
            <button
                class="relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 {settings.showPhoneNumber
                    ? 'bg-indigo-600'
                    : 'bg-gray-200'}"
                on:click={() =>
                    (settings.showPhoneNumber = !settings.showPhoneNumber)}
                role="switch"
                aria-checked={settings.showPhoneNumber}
                aria-label="Toggle Phone Number Visibility"
            >
                <span
                    aria-hidden="true"
                    class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {settings.showPhoneNumber
                        ? 'translate-x-5'
                        : 'translate-x-0'}"
                ></span>
            </button>
        </div>

        <hr class="border-gray-100" />

        <!-- Notification Timing -->
        <div>
            <h3 class="text-sm font-bold text-gray-900 mb-4">
                Email Notification Timing
            </h3>
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div class="space-y-6">
                    <!-- Low Priority -->
                    <div
                        class="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                    >
                        <div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20"
                                ></span>
                                <span class="text-sm font-bold text-gray-900"
                                    >Low Priority</span
                                >
                            </div>
                            <p class="text-xs text-gray-500 mt-1 ml-4.5">
                                Minor questions & cosmetic tasks
                            </p>
                        </div>
                        <select
                            bind:value={settings.notificationDelay}
                            class="block w-40 rounded-lg border-gray-200 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 py-2 px-3 focus:bg-white transition-colors cursor-pointer"
                        >
                            <option value="1h">1 hour delay</option>
                            <option value="30m">30 min delay</option>
                            <option value="immediate">Immediate</option>
                        </select>
                    </div>

                    <!-- Medium Priority -->
                    <div
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-80"
                    >
                        <div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="w-2.5 h-2.5 rounded-full bg-yellow-500 ring-4 ring-yellow-500/20"
                                ></span>
                                <span class="text-sm font-bold text-gray-700"
                                    >Medium Priority</span
                                >
                            </div>
                            <p class="text-xs text-gray-500 mt-1 ml-4.5">
                                Feature requests & improvements
                            </p>
                        </div>
                        <div
                            class="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-3.5 h-3.5"
                                ><path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                                    clip-rule="evenodd"
                                /></svg
                            >
                            30m Delay
                        </div>
                    </div>

                    <!-- High/Emergency -->
                    <div
                        class="flex items-center justify-between p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50"
                    >
                        <div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-500/20"
                                ></span>
                                <span class="text-sm font-bold text-gray-900"
                                    >High / Emergency</span
                                >
                            </div>
                            <p class="text-xs text-gray-500 mt-1 ml-4.5">
                                Critical blockers & outage
                            </p>
                        </div>
                        <div
                            class="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-3.5 h-3.5"
                                ><path
                                    fill-rule="evenodd"
                                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                    clip-rule="evenodd"
                                /></svg
                            >
                            Immediate
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200/50 px-2">
                    <p
                        class="text-xs text-gray-500 italic flex items-center gap-1.5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-4 h-4 text-gray-400"
                            ><path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                clip-rule="evenodd"
                            /></svg
                        >
                        High priority alerts bypass batching.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
