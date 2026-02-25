<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import logo from "$lib/assets/logo.jpg";

    const currentYear = new Date().getFullYear();

    const handleScroll = async (id) => {
        if ($page.url.pathname === '/') {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            goto(`/${id}`);
        }
    }
</script>

<footer class="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div class="col-span-1 md:col-span-1">
                <a href="/" class="flex items-center gap-2 mb-4">
                    <img
                        src={logo}
                        alt="Ticketly Logo"
                        class="h-8 w-8 rounded-full"
                    />
                    <span class="text-xl font-bold text-slate-900"
                        >Ticketly</span
                    >
                </a>
                <p class="text-slate-600 text-sm leading-relaxed">
                    The all-in-one communication platform for freelancers and
                    clients. Chat, manage tickets, and stay organized.
                </p>
            </div>

            {#if $page.url.pathname === '/'}
            <div>
                <h4 class="font-semibold text-slate-900 mb-4">Navigation</h4>
                <ul class="space-y-3">
                    <li>
                        <button
                            onclick={() => handleScroll('features')}
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >Features</button
                        >
                    </li>
                    <li>
                        <button
                            onclick={() => handleScroll('pricing')}
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >Pricing</button
                        >
                    </li>
                    <li>
                        <button
                            onclick={() => handleScroll('faq')}
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >FAQ</button
                        >
                    </li>
                </ul>
            </div>
            {/if}

            <div>
                <h4 class="font-semibold text-slate-900 mb-4">Legal</h4>
                <ul class="space-y-3">
                    <li>
                        <a
                            href="/privacy"
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >Privacy Policy</a
                        >
                    </li>
                    <li>
                        <a
                            href="/terms"
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >Terms of Service</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div
            class="border-t border-slate-200 pt-8 text-center"
        >
            <p class="text-slate-500 text-sm">
                &copy; {currentYear} Ticketly. All rights reserved.
            </p>
        </div>
    </div>
</footer>
