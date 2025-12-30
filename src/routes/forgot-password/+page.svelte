<script>
    import { fade } from "svelte/transition";
    import logo from "$lib/assets/logo.jpg";

    let email = "";
    let isLoading = false;
    let emailSent = false;

    function handleResetPassword() {
        if (!email) return;
        isLoading = true;
        // TODO: Implement Firebase password reset
        console.log("Reset password for:", email);

        // Simulate success
        setTimeout(() => {
            isLoading = false;
            emailSent = true;
        }, 1000);
    }
</script>

<div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 md:flex md:items-center md:justify-center md:p-4"
    in:fade
>
    <div class="w-full max-w-md mx-auto">
        <!-- Card - no bg/border on mobile -->
        <div
            class="min-h-screen md:min-h-0 bg-white md:rounded-3xl md:shadow-xl md:shadow-indigo-100/50 p-6 sm:p-8 md:border md:border-gray-100 flex flex-col justify-center"
        >
            <!-- Logo inside card -->
            <div class="text-center mb-8">
                <a href="/" class="inline-block">
                    <img
                        src={logo}
                        alt="Ticketly"
                        class="h-12 w-auto mx-auto rounded-xl"
                    />
                </a>
                <h1 class="mt-6 text-2xl font-bold text-gray-900">
                    Reset your password
                </h1>
                <p class="mt-2 text-sm text-gray-500">
                    Enter your email and we'll send you a reset link
                </p>
            </div>

            {#if emailSent}
                <!-- Success State -->
                <div class="text-center py-4" in:fade>
                    <div
                        class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="w-8 h-8 text-green-600"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">
                        Check your email
                    </h3>
                    <p class="text-sm text-gray-500 mb-8">
                        We've sent a password reset link to<br />
                        <span class="font-semibold text-gray-700">{email}</span>
                    </p>
                    <button
                        on:click={() => {
                            emailSent = false;
                            email = "";
                        }}
                        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Try a different email
                    </button>
                </div>
            {:else}
                <!-- Form State -->
                <form
                    on:submit|preventDefault={handleResetPassword}
                    class="space-y-5"
                >
                    <div>
                        <label
                            for="email"
                            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="you@example.com"
                            required
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3.5"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !email}
                        class="w-full px-4 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mt-6"
                    >
                        {#if isLoading}
                            <span
                                class="flex items-center justify-center gap-2"
                            >
                                <svg
                                    class="animate-spin h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Sending...
                            </span>
                        {:else}
                            Send Reset Link
                        {/if}
                    </button>
                </form>
            {/if}

            <!-- Footer -->
            <p class="mt-8 text-center text-sm text-gray-500">
                Remember your password?
                <a
                    href="/login"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    Back to sign in
                </a>
            </p>
        </div>
    </div>
</div>
