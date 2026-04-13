# Ticketly — Graduation Project Report

---

## 1. Introduction

### Topic

This project explores the design and development of a full-stack, real-time SaaS (Software as a Service) application called **Ticketly** — a communication and ticket management platform built for freelancers and their clients.

The core idea is a single application where one user account can operate in two distinct modes: **Freelancer Mode** and **Client Mode**. This dual-mode system lets a user manage their professional relationships from both sides of the table without needing two separate accounts or applications.

### Purpose

Freelancers typically manage client communication across a patchwork of tools — email threads, Slack, WhatsApp, and spreadsheets. There is rarely a dedicated, structured space for tracking issues, bugs, and tasks specific to a freelance engagement. I chose this topic because I wanted to solve a real-world problem with a real product, and to do so using technologies I had not yet worked with at meaningful depth: specifically **SvelteKit 5** and **Firebase**.

A secondary goal was architectural: I wanted to build a proper **service layer** — where all data operations are abstracted into dedicated modules — keeping UI components clean and focused solely on presentation logic.

### Definition of Success

Success was defined across three dimensions:

1. **Functional completeness** — The app must support the full lifecycle of a freelancer-client relationship: connecting via invite, creating and tracking tickets, real-time chat, and email notifications.
2. **Technical depth** — The project must involve genuinely new technology, implemented beyond tutorial level. This meant real-time data sync, a transactional email service, and Svelte 5's new reactivity system.
3. **Deployable product** — The application must be deployed and usable by real people, not just a local prototype.

### Results

All three measures of success were met. Ticketly is a fully functional, deployed SaaS platform with:

- Dual-mode user accounts (Freelancer and Client)
- Real-time ticket management and ticket-specific chat
- General real-time chat with file/image/document uploads
- An invite system for connecting freelancers with clients via email
- Transactional email notifications triggered on new tickets and invite events
- A tiered pricing model (Free, Standard, Professional)

---

## 2. Methodology

### Approach & Organisation

Development was broken into five clear phases before any code was written:

1. **Foundation** — Firebase project setup, authentication, SvelteKit routing, environment configuration
2. **Core features** — Freelancer/client relationship model, invite system, client management
3. **Ticket system** — Ticket CRUD, status workflow (Open → In Progress → Resolved → Closed), priority levels
4. **Communication layer** — Real-time general chat, ticket-specific chat (stored as Firestore subcollections)
5. **Notifications & polish** — Resend email integration, ticket and invite email notifications, settings, landing page

Tasks were tracked on a board with columns: **Backlog → In Progress → Done**, with each ticket having a clear definition of done before marking it complete.

### Tech Stack

| Technology | Role | Why |
|---|---|---|
| **SvelteKit 5** | Full-stack framework (frontend + server routes) | New to me; modern reactivity model; SSR and SPA in one framework |
| **Firebase Auth** | Authentication | Email/password and Google OAuth out of the box |
| **Firebase Firestore** | Real-time NoSQL database | Push-based updates without polling; no custom backend needed |
| **Firebase Storage** | File/image uploads | Integrated with Firestore; handles large files |
| **Tailwind CSS v4** | Styling | Utility-first; fast iteration; consistent design system |
| **Resend API** | Transactional email | Developer-friendly; reliable delivery; HTML email templates |
| **Vite** | Build tool | Extremely fast hot-module replacement during development |
| **@sveltejs/adapter-node** | Deployment | Compiles to a Node.js server for self-hosting |

### New Technology: SvelteKit 5 & Svelte Runes

SvelteKit 5 was the most significant piece of new technology in this project. The key difference from frameworks like React or Vue is that **Svelte compiles to vanilla JavaScript at build time** — there is no virtual DOM at runtime. This makes the output leaner and the runtime faster.

Svelte 5 specifically introduced **Runes** — a new reactive primitive system that replaces the older `$:` syntax:

```javascript
// Svelte 4 — implicit reactivity
let count = 0;
$: doubled = count * 2;

// Svelte 5 — explicit runes
let count = $state(0);
let doubled = $derived(count * 2);
```

The three main runes used throughout Ticketly:

- `$state()` — declares a reactive variable
- `$derived()` — declares a value computed from other state (replaces `$:`)
- `$effect()` — runs side effects when dependencies change (replaces `onMount` + reactive statements)

I learned SvelteKit primarily through the official documentation and the Svelte 5 migration guide.

### New Technology: Firebase Firestore (Real-Time)

While I had used databases before, Firestore's document-collection model and `onSnapshot()` listeners required a fundamentally different approach. Instead of fetching data once and storing it, Firestore **pushes updates to the client** whenever the database changes:

```javascript
// Data arrives continuously, not once
let unsubscribe;

onMount(() => {
  unsubscribe = onSnapshot(ticketsQuery, (snapshot) => {
    tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

onDestroy(() => {
  unsubscribe?.(); // Critical: clean up listener when component is destroyed
});
```

This pattern is used throughout Ticketly for tickets, chat messages, client lists, and invites.

### Potential Issues Identified Early

| Issue | Proposed Solution |
|---|---|
| Real-time listeners causing memory leaks if not cleaned up | Store `unsubscribe` from `onMount`, call it in `onDestroy` |
| Svelte 5 being a very new release with sparse community answers | Rely on official docs first; Svelte Discord as backup |
| Firestore NoSQL — no joins, must denormalise data | Design data shape upfront; store display names on ticket documents |
| Dual-mode routing — keeping freelancer/client views separate | Separate route trees: `/dashboard/freelancer/` and `/dashboard/client/` |
| Email deliverability | Use Resend with a verified sending domain |

---

## 3. Findings

### Outcomes Against Success Measures

All three original success measures were achieved. The full freelancer-client lifecycle works end-to-end:

1. A freelancer adds a client → invite email sent via Resend
2. Client accepts invite → relationship created atomically in Firestore
3. Client creates a ticket with priority level
4. Freelancer receives an email notification about the new ticket (including priority level)
5. Both parties communicate via real-time ticket chat
6. Freelancer updates ticket status with a status message
7. Ticket is marked Closed — chat is disabled to preserve the resolution record

### Key Features & Functionality

#### Dual-Mode System

A single account switches between Freelancer Mode and Client Mode. The mode is persisted in Firestore so it survives sessions. The two modes have completely separate route trees and UIs, but share the same Firebase user account.

```
/dashboard/freelancer/          → tickets, clients, chat, settings, billing
/dashboard/client/              → tickets, freelancers, chat, settings
```

#### Ticket System

Only clients can create tickets — an intentional design constraint reflecting real-world dynamics (the client reports the problem; the freelancer resolves it).

**Priority levels:**

| Priority | Use case |
|---|---|
| Low | Minor issues, cosmetic changes |
| Medium | Functionality issues with a workaround |
| High | Important feature broken, affecting operations |
| Emergency | Critical system down, complete outage |

**Status workflow:** Open → In Progress → Resolved → Closed
Each status update can include a message, creating an audit trail inside the ticket.

#### Real-Time Chat

Both general chat and ticket-specific chat use Firestore `onSnapshot()` listeners. Messages are stored as subcollections:

```
tickets/{ticketId}/messages/{messageId}
relationships/{relationshipId}/messages/{messageId}
```

The UI auto-scrolls to the latest message and shows sender info, timestamps, and file attachments. Chat is **disabled on Closed tickets** to protect the integrity of the resolution record.

#### Invite System

When a freelancer adds a client by email:
1. A `pendingInvites` document is created in Firestore
2. A branded invite email is sent via Resend
3. When the client accepts, a **Firestore batch write** atomically creates the relationship document and updates the invite status — ensuring both writes either succeed or both fail together.

#### Email Notification System

When a client creates a ticket, the assigned freelancer is emailed immediately via a SvelteKit server route (`/api/tickets/notify-email`) that calls the Resend API. The email includes the ticket title, client name, and a colour-coded priority badge so the freelancer can immediately see the urgency:

| Priority | Badge colour |
|---|---|
| Low | Green |
| Medium | Yellow |
| High | Red |
| Emergency | Dark red |

A separate email is sent to clients when they are invited by a freelancer, with a direct call-to-action to sign up or log in.

#### Service Layer Architecture

All Firebase interactions are encapsulated in dedicated service modules under `src/lib/firebase/`. UI components never call Firebase directly — they call service functions:

```
src/lib/firebase/
├── auth.js          (signup, login, Google OAuth, password reset)
├── user.js          (user profile read/write)
├── relationships.js (freelancer-client connections)
├── tickets.js       (ticket CRUD, real-time listeners)
├── ticketChat.js    (ticket message operations)
└── invites.js       (invite creation, acceptance, decline)
```

This separation keeps components focused on UI logic and makes the data layer independently testable.

### Challenges & Solutions

#### Challenge 1: Svelte 5 Migration Mid-Project

Midway through development, I migrated the entire codebase from Svelte 4 syntax to Svelte 5 Runes. The motivation was that the new reactivity model is more explicit — you can see exactly where state is read and written, rather than relying on Svelte's implicit tracking of `$:` statements.

The migration required:
- Replacing `let x = ...` with `let x = $state(...)`
- Replacing `$: computed = ...` with `let computed = $derived(...)`
- Replacing `onMount` + reactive statements with `$effect()`
- Updating event handler syntax (`on:click` → `onclick`)

**Solution:** Migrated file by file, running the app after each file to catch regressions. The official Svelte 5 migration guide was the primary reference.

#### Challenge 2: Real-Time Listener Memory Leaks

Early in development, the app became progressively slower during a session. The root cause was Firestore `onSnapshot()` listeners not being cleaned up when components were destroyed — causing multiple listeners for the same collection to stack up in memory.

**Solution:** Every listener is stored as an `unsubscribe` variable inside `onMount`, and explicitly called inside `onDestroy`:

```javascript
let unsubTickets;

onMount(() => {
  unsubTickets = listenToClientTickets(user.uid, (data) => {
    tickets = data;
  });
});

onDestroy(() => {
  unsubTickets?.();
});
```

This pattern is now consistently applied across every page that uses a real-time Firestore listener.

#### Challenge 3: Denormalised Data in Firestore

Firestore does not support joins. To display a ticket with the client's name and the freelancer's display name, those values must be stored directly on the ticket document at creation time. The challenge was that this creates a consistency problem — if a user later changes their display name, old tickets still show the old name.

**Solution:** For this version, display names are written to the ticket at creation time and treated as immutable. A proper long-term fix would be a Firebase Cloud Function that updates all related documents whenever a user changes their profile — a known trade-off accepted for this stage of the project.

---

## 4. Reflections

### Planning

The phased approach kept scope manageable and made progress visible. The ticket board meant I could always see what was left and avoid the common trap of working on interesting problems while ignoring necessary infrastructure.

If I were to restart the project, I would spend more time designing the **Firestore data model** before writing any code. Choosing Firestore early constrained some query patterns — restructuring a collection mid-project is expensive because there are no migrations in a NoSQL document store.

### Tech Stack

**SvelteKit 5** was the right choice. The compiled output is lean, the developer experience with Vite's HMR is extremely fast, and the Runes system — once the mental model clicked — is more explicit than React's hooks. The main limitation is ecosystem size: React questions have thousands of Stack Overflow answers; Svelte questions often require reading source code or asking in the official Discord.

**Firebase** delivered real-time functionality without a custom backend, which was the right trade-off for a solo project at this scale. The limitations are the vendor lock-in and the NoSQL data modelling constraints. For a team project or a more complex query-heavy app, a relational database with a custom API would likely be more appropriate.

### Limitations

- **No TypeScript** — The codebase uses plain JavaScript. TypeScript would have caught several data shape mismatches at compile time rather than at runtime in the browser.
- **No automated tests** — There is no test suite. Vitest for unit tests and Playwright for end-to-end tests would make the codebase significantly more maintainable.
- **Firestore security rules not fully tested** — Security rules exist, but a dedicated rules test suite (using the Firebase Emulator) would be required before handling real production user data at scale.
- **No Cloud Functions** — Email sending and display name sync would be more reliable as Firebase Cloud Functions (running server-side on Firebase's infrastructure) rather than SvelteKit server routes.

### Documentation

The official SvelteKit and Svelte 5 documentation is well-structured but sparse on complex real-world patterns — particularly around combining `$effect()` with Firestore listeners, and server-side rendering with client-side Firebase Auth. These required piecing together multiple sources: the official docs, the Svelte Discord, and reading the SvelteKit source code directly.

Firebase's Firestore documentation is comprehensive but its examples are often too simplified for production patterns — particularly around security rules, batch writes, and real-time listener lifecycle management.

---

## 5. The Future

### The Application

**Short-term improvements:**
- TypeScript migration for type safety across the entire codebase
- Automated test suite (Vitest for unit tests, Playwright for end-to-end)
- Stripe integration to activate the Free / Standard / Professional billing tiers
- Firebase Cloud Functions to replace the SvelteKit server email routes (more reliable, background execution)
- Display name sync — update denormalised names across related documents when a user changes their profile

**New features:**
- File attachments directly on tickets (not just in chat)
- Ticket templates for common issue types
- Dashboard analytics — tickets resolved per week, average resolution time, response time by priority
- Progressive Web App (PWA) support for mobile use
- Read receipts on chat messages

**Expansion:**
The dual-mode concept is not limited to freelancers and clients. The same architecture could serve agencies and contractors, support teams and customers, or consultants and stakeholders. The domain is a configuration on top of a general relationship-and-communication model.

### Research

**Planning:** Future projects will start with a data modelling session before any framework or database is chosen. The query patterns should determine the data structure, not the other way around.

**Technology:** Next areas to explore:
- SvelteKit's server-side `load()` functions with Firebase Admin SDK to hydrate data server-side (faster initial load, better SEO)
- Firebase Emulator Suite for local development and security rules testing without touching production data
- Firestore offline persistence for PWA/mobile use cases

---

## 6. Attachments

- **Live Application:** [add deployment URL]
- **GitHub Repository:** [add repo URL]
- **Project Board:** [add board URL]
- **Demo Video:** [add Loom/YouTube link]

---

## Appendix: Data Model

```
Firestore Collections
├── users/{uid}
│   └── displayName, email, phone, mode, notificationSettings, privacySettings
│
├── relationships/{relationshipId}
│   └── freelancerId, clientId, status (active/removed), createdAt
│
├── tickets/{ticketId}
│   ├── title, description, priority, status
│   ├── clientId, freelancerId (denormalised names stored here too)
│   ├── createdAt, resolvedAt
│   └── messages/ (subcollection)
│       └── {messageId}: senderId, text, attachments, createdAt
│
└── pendingInvites/{inviteId}
    └── fromFreelancerId, toClientEmail, status (pending/accepted/declined), createdAt
```

## Appendix: Svelte 5 Runes Reference

```javascript
// State — reactive variable
let tickets = $state([]);

// Derived — computed value, recalculates when dependencies change
let openTickets = $derived(tickets.filter(t => t.status === 'open'));

// Derived.by — for complex logic
let sortedTickets = $derived.by(() => {
  return tickets
    .filter(t => t.status !== 'closed')
    .sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
});

// Lifecycle — onMount starts the listener, onDestroy cleans it up
let unsubscribe;

onMount(() => {
  unsubscribe = onSnapshot(query, (snap) => {
    tickets = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  });
});

onDestroy(() => {
  unsubscribe?.();
});
```
