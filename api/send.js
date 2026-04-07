const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, company, sector, size, country, message } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sobber.entreprise@gmail.com',
      reply_to: email,
      subject: `New demo request — ${company}`,
      html: `
        <h2>New demo request from Sobber.io</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Company</td><td style="padding:8px;">${company}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Sector</td><td style="padding:8px;">${sector || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Team size</td><td style="padding:8px;">${size || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Country</td><td style="padding:8px;">${country || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Message</td><td style="padding:8px;">${message || '—'}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};