<script>
    import { fade } from "svelte/transition";
</script>

<section id="features" class="py-24 bg-slate-50">
    <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Everything you need to manage your work
            </h2>
            <p class="text-lg text-slate-600">
                Ticketly provides all the tools you need to streamline your
                freelance business and keep your clients happy.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
                class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600"
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
                        ><path
                            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                    Real-time Chat
                </h3>
                <p class="text-slate-600">
                    Communicate with clients instantly. Keep all conversations
                    in one place and avoid lost emails.
                </p>
            </div>

            <div
                class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600"
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
                        ><rect width="18" height="18" x="3" y="3" rx="2" /><path
                            d="m9 12 2 2 4-4"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                    Ticket Management
                </h3>
                <p class="text-slate-600">
                    Organize requests into tickets. Track status, assign
                    priorities, and ensure nothing slips through the cracks.
                </p>
            </div>

            <div
                class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600"
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
                        ><rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                        /><line x1="3" x2="21" y1="9" y2="9" /><line
                            x1="9"
                            x2="9"
                            y1="21"
                            y2="9"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                    Client Dashboard
                </h3>
                <p class="text-slate-600">
                    Give clients their own portal to create tickets, view
                    progress, and share files with you.
                </p>
            </div>

            <div
                class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600"
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
                        ><path
                            d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                        /><line x1="4" x2="4" y1="22" y2="15" /></svg
                    >
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                    Priority System
                </h3>
                <p class="text-slate-600">
                    Mark urgent tasks with high priority. Help you and your
                    clients focus on what matters most.
                </p>
            </div>

            <div
                class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600"
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
                        ><path
                            d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                        /><polyline points="14 2 14 8 20 8" /></svg
                    >
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                    File Sharing
                </h3>
                <p class="text-slate-600">
                    Share documents, images, and assets directly within tickets.
                    Keep everything organized and accessible.
                </p>
            </div>

            <div
                class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600"
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
                        ><rect width="20" height="16" x="2" y="4" rx="2" /><path
                            d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                    Email Notifications
                </h3>
                <p class="text-slate-600">
                    Stay updated with automatic email notifications for new
                    tickets, replies, and status changes.
                </p>
            </div>
        </div>
    </div>
</section>
