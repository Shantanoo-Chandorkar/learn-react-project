import { Resend } from 'resend';
import { SUBJECT_MAX_LENGTH, BODY_MAX_LENGTH } from '../../utils/feedbackLimits';

export const prerender = false;

const GENERIC_FAILURE_MESSAGE = "Couldn't send feedback, try again later.";

const jsonResponse = (responseBody, status) =>
    new Response(JSON.stringify(responseBody), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });

/**
 * Emails a feedback submission via Resend.
 *
 * @param {Request} request
 * @returns {Response} JSON { sent: true } on 200, or { error } on 400/502.
 */
export async function POST({ request }) {
    let payload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({ error: 'Invalid request body' }, 400);
    }

    const { subject, body, honeypot } = payload ?? {};

    // Bots fill every field; a real user never sees this one, so treat a filled value as spam.
    if (honeypot) {
        return jsonResponse({ sent: true }, 200);
    }

    const trimmedSubject = typeof subject === 'string' ? subject.trim() : '';
    const trimmedBody = typeof body === 'string' ? body.trim() : '';

    if (!trimmedSubject || !trimmedBody) {
        return jsonResponse({ error: 'Subject and body are required' }, 400);
    }
    if (trimmedSubject.length > SUBJECT_MAX_LENGTH || trimmedBody.length > BODY_MAX_LENGTH) {
        return jsonResponse({ error: 'Subject or body is too long' }, 400);
    }

    try {
        const resend = new Resend(import.meta.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: import.meta.env.RESEND_FROM_EMAIL,
            to: import.meta.env.FEEDBACK_TO_EMAIL,
            subject: trimmedSubject,
            text: trimmedBody,
        });
        if (error) throw error;
    } catch (error) {
        console.error('feedback: resend send failed', error);
        return jsonResponse({ error: GENERIC_FAILURE_MESSAGE }, 502);
    }

    return jsonResponse({ sent: true }, 200);
}
