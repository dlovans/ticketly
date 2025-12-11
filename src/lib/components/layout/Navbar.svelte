<script>
    import { fly } from "svelte/transition";
    let isMobileMenuOpen = $state(false);

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<nav
    class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md"
>
    <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img
                    src="/logo.jpg"
                    alt="Ticketly Logo"
                    class="h-8 w-8 rounded-full"
                />
                <span class="text-xl font-bold text-slate-900">Ticketly</span>
            </a>

            <div class="hidden md:flex md:items-center md:gap-8">
                <a
                    href="#features"
                    class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                    >Features</a
                >
                <a
                    href="#pricing"
                    class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                    >Pricing</a
                >
                <a
                    href="#faq"
                    class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                    >FAQ</a
                >
            </div>

            <div class="hidden md:flex md:items-center md:gap-4">
                <a href="/login" class="btn btn-sm btn-outline">Log in</a>
                <a href="/register" class="btn btn-sm btn-primary"
                    >Get Started</a
                >
            </div>

            <button
                class="btn btn-ghost md:hidden p-2"
                onclick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                {#if isMobileMenuOpen}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-6 w-6"
                        ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
                    >
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-6 w-6"
                        ><line x1="4" x2="20" y1="12" y2="12" /><line
                            x1="4"
                            x2="20"
                            y1="6"
                            y2="6"
                        /><line x1="4" x2="20" y1="18" y2="18" /></svg
                    >
                {/if}
            </button>
        </div>
    </div>

    {#if isMobileMenuOpen}
        <div
            class="fixed inset-0 z-[100] bg-slate-50 md:hidden"
            transition:fly={{ x: "100%", duration: 300, opacity: 1 }}
        >
            <div class="container mx-auto px-4 bg-white">
                <div
                    class="flex h-16 items-center justify-between border-b border-slate-100"
                >
                    <span class="text-xl font-bold text-slate-900">Menu</span>
                    <button
                        class="btn btn-ghost p-2"
                        onclick={toggleMobileMenu}
                        aria-label="Close menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-6 w-6"
                            ><line x1="18" x2="6" y1="6" y2="18" /><line
                                x1="6"
                                x2="18"
                                y1="6"
                                y2="18"
                            /></svg
                        >
                    </button>
                </div>

                <div class="flex flex-col gap-6 py-8">
                    <a
                        href="#features"
                        class="text-xl font-medium text-slate-900 hover:text-primary-600"
                        onclick={() => (isMobileMenuOpen = false)}>Features</a
                    >
                    <a
                        href="#pricing"
                        class="text-xl font-medium text-slate-900 hover:text-primary-600"
                        onclick={() => (isMobileMenuOpen = false)}>Pricing</a
                    >
                    <a
                        href="#faq"
                        class="text-xl font-medium text-slate-900 hover:text-primary-600"
                        onclick={() => (isMobileMenuOpen = false)}>FAQ</a
                    >

                    <div class="h-px bg-slate-100 my-2"></div>

                    <div class="flex flex-col gap-4">
                        <a
                            href="/login"
                            class="btn btn-lg btn-outline w-full justify-center"
                            onclick={() => (isMobileMenuOpen = false)}>Log in</a
                        >
                        <a
                            href="/register"
                            class="btn btn-lg btn-primary w-full justify-center"
                            onclick={() => (isMobileMenuOpen = false)}
                            >Get Started</a
                        >
                    </div>
                </div>
            </div>
        </div>
    {/if}
</nav>
