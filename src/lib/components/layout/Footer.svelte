<script>
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div class="col-span-1 md:col-span-1">
                <a href="/" class="flex items-center gap-2 mb-4">
                    <img
                        src="/logo.jpg"
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

            <div>
                <h4 class="font-semibold text-slate-900 mb-4">Navigation</h4>
                <ul class="space-y-3">
                    <li>
                        <a
                            href="#features"
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >Features</a
                        >
                    </li>
                    <li>
                        <a
                            href="#pricing"
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >Pricing</a
                        >
                    </li>
                    <li>
                        <a
                            href="#faq"
                            class="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                            >FAQ</a
                        >
                    </li>
                </ul>
            </div>

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
            class="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
            <p class="text-slate-500 text-sm">
                &copy; {currentYear} Ticketly. All rights reserved.
            </p>
        </div>
    </div>
</footer>
