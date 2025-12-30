<script>
    import { fade } from "svelte/transition";
    import logo from "$lib/assets/logo.jpg";

    let email = "";
    let password = "";
    let isLoading = false;

    function handleEmailLogin() {
        if (!email || !password) return;
        isLoading = true;
        // TODO: Implement Firebase email/password login
        console.log("Login with:", email);
    }

    function handleGoogleLogin() {
        isLoading = true;
        // TODO: Implement Firebase Google login
        console.log("Google login");
    }
</script>

<div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 md:flex md:items-center md:justify-center md:p-4"
    in:fade
>
    <div class="w-full max-w-md mx-auto">
        <!-- Card - no bg/border on mobile -->
        <div
            class="min-h-screen md:min-h-0 bg-white md:rounded-3xl md:shadow-xl md:shadow-indigo-100/50 p-6 sm:p-8 md:border md:border-gray-100"
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
                    Welcome back
                </h1>
                <p class="mt-2 text-sm text-gray-500">
                    Sign in to continue to Ticketly
                </p>
            </div>

            <!-- Google Button -->
            <button
                on:click={handleGoogleLogin}
                disabled={isLoading}
                class="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Continue with Google
            </button>

            <!-- Divider -->
            <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="px-4 bg-white text-gray-400"
                        >or continue with email</span
                    >
                </div>
            </div>

            <!-- Email Form -->
            <form on:submit|preventDefault={handleEmailLogin} class="space-y-5">
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

                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label
                            for="password"
                            class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                        >
                            Password
                        </label>
                        <a
                            href="/forgot-password"
                            class="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        placeholder="••••••••"
                        required
                        class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3.5"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    class="w-full px-4 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mt-6"
                >
                    {#if isLoading}
                        <span class="flex items-center justify-center gap-2">
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
                            Signing in...
                        </span>
                    {:else}
                        Sign In
                    {/if}
                </button>
            </form>

            <!-- Footer -->
            <p class="mt-8 text-center text-sm text-gray-500">
                Don't have an account?
                <a
                    href="/register"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    Create one
                </a>
            </p>
        </div>
    </div>
</div>
