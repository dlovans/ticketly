# Ticketly - AI Instructions

## Tech Stack

 - Svelte 5 + SvelteKit (v2.x)
- Tailwind CSS 4
- Firebase (Auth, Firestore, Storage)
- **NO TypeScript**
- **NO JSDoc**

---

## Project Description

**Ticketly** is a communication platform for freelancers and their clients. Users can switch between Freelancer Mode and Client Mode under the same account.

### Key Difference: Chat vs Tickets

| | Chat | Tickets |
|--|------|---------|
| Purpose | General communication, file sharing, questions | Bug reports, maintenance, issues to fix |
| Who creates | Both freelancer and client | **ONLY clients** |
| Priority | No | Yes (Low, Medium, High, Emergency) |
| Status | Read/Unread | Open, In Progress, Resolved, Closed |

---

## Freelancer Features

- Add client (email, name/company, phone with country code, website) - EU & USA regions
- Update, remove, and restore deleted clients
- Chat with file/image/document uploads
- View and respond to tickets (cannot create)
- Settings: Email notification timing, show/hide phone number

### Email Notification Settings (Freelancer)

| Priority | Notification Delay |
|----------|-------------------|
| Low | 1 hour |
| Medium | 30 minutes |
| High | Immediate |
| Emergency | Immediate |

---

## Client Features

- Chat with file/image/document uploads
- **Create tickets** (only clients can do this)
- Remove freelancer
- Settings: Show/hide phone number

### Email Reminder

- Unread chat: Email sent after 1 hour

---

## Ticket System

### Priority Levels

| Priority | When to use |
|----------|-------------|
| **Low** | Minor issues, cosmetic changes, non-urgent questions |
| **Medium** | Functionality issues with workarounds, general improvements |
| **High** | Important functionality broken, affecting business operations |
| **Emergency** | Critical system down, security breach, complete service outage |

### Ticket Fields

- Title (required)
- Description (required)
- Priority (required)
- Attachments (optional photos)

### Ticket Statuses

1. Open
2. In Progress
3. Resolved
4. Closed

---

## Pricing Model

| Tier | Clients | Price |
|------|---------|-------|
| Free | Up to 2 | $0 |
| Standard | Up to 10 | TBD |
| Professional | 11+ (unlimited) | TBD |

---

## Landing Page Structure

### Navigation

- Logo (left)
- Features, Pricing, FAQ (center/right)
- Login (outline button), Get Started (primary button)
- Mobile: Hamburger menu

### Hero Section

Suggest headline, subheadline, and two CTA buttons.

### Features Section

Highlight: Real-time Chat, Ticket Management, Client Dashboard, Priority System, File Sharing, Email Notifications

### Pricing Section

Display three tiers with features.

### FAQ Section (above footer)

Include 8-10 relevant questions about the platform.

### Footer

- Logo + tagline
- Navigation links
- Legal links (Privacy, Terms)
- Copyright

---

## File Structure

```
ticketly/
├── src/
│   ├── app.css
│   ├── app.html
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.svelte
│   │   │   │   ├── Footer.svelte
│   │   │   │   ├── MobileMenu.svelte
│   │   │   │   └── UserMenu.svelte
│   │   │   ├── landing/
│   │   │   │   ├── Hero.svelte
│   │   │   │   ├── Features.svelte
│   │   │   │   ├── Pricing.svelte
│   │   │   │   ├── Testimonials.svelte
│   │   │   │   └── FAQ.svelte
│   │   │   ├── dashboard/
│   │   │   │   ├── Sidebar.svelte
│   │   │   │   ├── StatsCard.svelte
│   │   │   │   ├── ClientList.svelte
│   │   │   │   ├── ClientCard.svelte
│   │   │   │   └── ModeSwitch.svelte
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.svelte
│   │   │   │   ├── MessageBubble.svelte
│   │   │   │   ├── MessageInput.svelte
│   │   │   │   ├── ChatList.svelte
│   │   │   │   └── FilePreview.svelte
│   │   │   ├── tickets/
│   │   │   │   ├── TicketList.svelte
│   │   │   │   ├── TicketCard.svelte
│   │   │   │   ├── TicketDetail.svelte
│   │   │   │   ├── CreateTicket.svelte
│   │   │   │   └── PriorityBadge.svelte
│   │   │   ├── clients/
│   │   │   │   ├── AddClientModal.svelte
│   │   │   │   ├── EditClientModal.svelte
│   │   │   │   └── DeletedClients.svelte
│   │   │   └── ui/
│   │   │       ├── Button.svelte
│   │   │       ├── Input.svelte
│   │   │       ├── Modal.svelte
│   │   │       ├── Badge.svelte
│   │   │       ├── Avatar.svelte
│   │   │       ├── Dropdown.svelte
│   │   │       ├── Toast.svelte
│   │   │       ├── Spinner.svelte
│   │   │       └── EmptyState.svelte
│   │   ├── firebase/
│   │   │   ├── config.js
│   │   │   ├── auth.js
│   │   │   ├── storage.js
│   │   │   ├── user.js
│   │   │   ├── clients.js
│   │   │   ├── chat.js
│   │   │   └── tickets.js
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   ├── formatting.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   └── content/
│   │       ├── faq.js
│   │       ├── features.js
│   │       └── pricing.js
│   └── routes/
│       ├── +page.svelte
│       ├── +layout.svelte
│       ├── (auth)/
│       │   ├── login/+page.svelte
│       │   ├── register/+page.svelte
│       │   └── forgot-password/+page.svelte
│       ├── (app)/
│       │   ├── +layout.svelte
│       │   ├── dashboard/+page.svelte
│       │   ├── clients/
│       │   │   ├── +page.svelte
│       │   │   └── [id]/+page.svelte
│       │   ├── chat/
│       │   │   ├── +page.svelte
│       │   │   └── [id]/+page.svelte
│       │   ├── tickets/
│       │   │   ├── +page.svelte
│       │   │   ├── new/+page.svelte
│       │   │   └── [id]/+page.svelte
│       │   └── settings/
│       │       ├── +page.svelte
│       │       ├── profile/+page.svelte
│       │       ├── notifications/+page.svelte
│       │       └── subscription/+page.svelte
│       └── api/
│           ├── webhooks/+server.js
│           └── notifications/+server.js
├── static/
│   ├── favicon.png
│   └── logo.svg
├── package.json
├── svelte.config.js
├── vite.config.js
└── .env.example
```

---

## Firebase

### Collections needed:

- **users** - User profiles, settings, subscription info, notification preferences
- **relationships** - Freelancer-client connections, status (active/removed)
- **chats** - Chat metadata, participants, last message, unread counts
- **messages** (subcollection of chats) - Individual messages with attachments
- **tickets** - Ticket data with priority, status, attachments
- **comments** (subcollection of tickets) - Ticket comments

---

## Svelte 5 Rules

### NEVER use $effect for computations

```javascript
// ❌ WRONG
let total = $state(0);
$effect(() => {
  total = items.length;
});

// ✅ CORRECT
let total = $derived(items.length);

// ✅ CORRECT for complex logic
let filtered = $derived.by(() => {
  return items.filter(i => i.active).sort((a, b) => b.date - a.date);
});
```

### Only use $effect for side effects (subscriptions, logging, DOM)
