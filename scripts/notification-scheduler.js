#!/usr/bin/env node
/**
 * Simple local scheduler that polls the `/api/notifications/process` endpoint
 * every minute. Useful for demos and local development when you don't have
 * a cloud scheduler set up.
 *
 * Usage: npm run notifications:scheduler
 */

const BASE = process.env.ORIGIN || 'http://localhost:5173';
const INTERVAL_MS = Number(process.env.NOTIF_INTERVAL_MS) || 60 * 1000;

async function processNotifications() {
    try {
        const res = await fetch(`${BASE}/api/notifications/process`, { method: 'POST' });
        if (!res.ok) {
            const txt = await res.text();
            console.error('[scheduler] process failed:', res.status, txt);
            return;
        }
        const data = await res.json();
        console.log('[scheduler] processed:', data.processed, 'details:', data.details || 'none');
    } catch (err) {
        console.error('[scheduler] error calling process endpoint:', err);
    }
}

async function loop() {
    console.log(`[scheduler] starting - polling ${BASE}/api/notifications/process every ${INTERVAL_MS}ms`);
    await processNotifications();
    setInterval(processNotifications, INTERVAL_MS);
}

loop();
