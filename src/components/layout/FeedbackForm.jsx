import React, { useEffect, useState } from 'react';
import Toast from './Toast';
import { SUBJECT_MAX_LENGTH, BODY_MAX_LENGTH } from '../../utils/feedbackLimits';

const GENERIC_FAILURE_MESSAGE = "Couldn't send feedback, try again later.";

const CharCount = ({ length, max }) => {
    const isAtLimit = length >= max;
    return (
        <span className={`feedback-form-char-count${isAtLimit ? ' feedback-form-char-count--limit' : ''}`}>
            {length}/{max}
            {isAtLimit && ' - Max character limit reached.'}
        </span>
    );
};

/**
 * FeedbackForm - subject + message form that POSTs to the server-only /api/feedback route.
 *
 * @returns {JSX.Element} The form, plus its result toast when a submission has been made.
 */
const FeedbackForm = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    useEffect(() => {
        if (!feedbackMessage) return undefined;
        const dismissTimer = setTimeout(() => setFeedbackMessage(null), 4000);
        return () => clearTimeout(dismissTimer);
    }, [feedbackMessage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!subject.trim() || !body.trim()) {
            setFeedbackMessage('Subject and message are both required.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, body, honeypot }),
            });
            const responseBody = await response.json();
            if (!response.ok) {
                setFeedbackMessage(responseBody.error || GENERIC_FAILURE_MESSAGE);
                return;
            }
            setFeedbackMessage('Feedback sent, thank you.');
            setSubject('');
            setBody('');
        } catch {
            setFeedbackMessage(GENERIC_FAILURE_MESSAGE);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form className="feedback-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="company"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    className="feedback-form-honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />

                <label className="feedback-form-field" htmlFor="feedback-subject">
                    <span>Subject</span>
                    <input
                        id="feedback-subject"
                        type="text"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        maxLength={SUBJECT_MAX_LENGTH}
                        required
                    />
                    <CharCount length={subject.length} max={SUBJECT_MAX_LENGTH} />
                </label>

                <label className="feedback-form-field" htmlFor="feedback-body">
                    <span>Message</span>
                    <textarea
                        id="feedback-body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        maxLength={BODY_MAX_LENGTH}
                        rows={8}
                        required
                    />
                    <CharCount length={body.length} max={BODY_MAX_LENGTH} />
                </label>

                <button type="submit" className="editorial-cta-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send feedback'}
                </button>
            </form>
            {feedbackMessage && (
                <Toast message={feedbackMessage} onDismiss={() => setFeedbackMessage(null)} />
            )}
        </>
    );
};

export default FeedbackForm;
