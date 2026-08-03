'use strict';

const nodemailer = require('nodemailer');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getBody(request) {
    if (typeof request.body === 'string') {
        try {
            return JSON.parse(request.body);
        } catch (_) {
            return {};
        }
    }

    return request.body || {};
}

module.exports = async function contact(request, response) {
    response.setHeader('Cache-Control', 'no-store');

    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ message: 'Diese Anfrage wird nicht unterstützt.' });
    }

    const body = getBody(request);
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const company = clean(body.company);
    const message = clean(body.message);
    const website = clean(body.website);

    // Bots commonly fill this field, while it remains invisible to visitors.
    if (website) {
        return response.status(200).json({ message: 'Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.' });
    }

    if (name.length < 2 || name.length > 100) {
        return response.status(400).json({ message: 'Bitte geben Sie einen gültigen Namen ein.' });
    }

    if (email.length > 160 || !EMAIL_PATTERN.test(email)) {
        return response.status(400).json({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' });
    }

    if (company.length > 120) {
        return response.status(400).json({ message: 'Der Unternehmensname ist zu lang.' });
    }

    if (message.length < 10 || message.length > 5000) {
        return response.status(400).json({ message: 'Die Nachricht muss zwischen 10 und 5.000 Zeichen lang sein.' });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtp.ionos.de';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const recipient = process.env.CONTACT_TO || 'norman@sdxsolutions.de';

    if (!smtpUser || !smtpPassword) {
        console.error('Contact form SMTP credentials are not configured.');
        return response.status(503).json({ message: 'Das Formular ist noch nicht vollständig eingerichtet. Bitte schreiben Sie direkt an norman@sdxsolutions.de.' });
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPassword
        }
    });

    const safeName = name.replace(/[\r\n]+/g, ' ');
    const companyLine = company ? company : 'Nicht angegeben / Privatperson';
    const text = [
        'Neue Projektanfrage über sdxsolutions.de',
        '',
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Unternehmen: ${companyLine}`,
        '',
        'Nachricht:',
        message
    ].join('\n');

    const html = `
        <h2>Neue Projektanfrage über sdxsolutions.de</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}<br>
        <strong>E-Mail:</strong> ${escapeHtml(email)}<br>
        <strong>Unternehmen:</strong> ${escapeHtml(companyLine)}</p>
        <p><strong>Nachricht:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    try {
        await transporter.sendMail({
            from: `"SDX Website" <${smtpUser}>`,
            to: recipient,
            replyTo: { name: safeName, address: email },
            subject: `Neue Projektanfrage von ${safeName}`,
            text,
            html
        });

        return response.status(200).json({ message: 'Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.' });
    } catch (error) {
        console.error('Contact form delivery failed:', error && error.message ? error.message : error);
        return response.status(502).json({ message: 'Die Anfrage konnte gerade nicht gesendet werden. Bitte schreiben Sie direkt an norman@sdxsolutions.de.' });
    }
};
