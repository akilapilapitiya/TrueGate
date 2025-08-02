

const brevo = require('@getbrevo/brevo');


const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

async function sendVerificationEmail(to, verificationUrl) {
  const senderEmail = process.env.BREVO_USER;
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = 'Verify your email address';
  sendSmtpEmail.htmlContent = `<p>Thank you for registering. Please verify your email by clicking the link below:</p>
    <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    <p>If you did not request this, please ignore this email.</p>`;
  sendSmtpEmail.sender = { name: 'TrueGate', email: senderEmail };
  sendSmtpEmail.to = Array.isArray(to) ? to.map(e => ({ email: e })) : [{ email: to }];
  sendSmtpEmail.headers = { 'X-Mailer': 'TrueGate Brevo' };
  sendSmtpEmail.replyTo = { email: senderEmail, name: 'TrueGate' };
  sendSmtpEmail.params = { verificationUrl };
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('[Brevo] Email sent:');
  } catch (error) {
    console.error('[Brevo] Email send error:', error);
    throw error;
  }
}

async function sendResetPasswordEmail(to, resetUrl) {
  const senderEmail = process.env.BREVO_USER;
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = 'Reset your password';
  sendSmtpEmail.htmlContent = `<p>You requested a password reset. Click the link below to set a new password:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>If you did not request this, please ignore this email.</p>`;
  sendSmtpEmail.sender = { name: 'TrueGate', email: senderEmail };
  sendSmtpEmail.to = Array.isArray(to) ? to.map(e => ({ email: e })) : [{ email: to }];
  sendSmtpEmail.headers = { 'X-Mailer': 'TrueGate Brevo' };
  sendSmtpEmail.replyTo = { email: senderEmail, name: 'TrueGate' };
  sendSmtpEmail.params = { resetUrl };
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('[Brevo] Password reset email sent:');
  } catch (error) {
    console.error('[Brevo] Password reset email send error:', error);
    throw error;
  }
}

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
