const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('Mailer Utils', () => {
  let mailer;
  let brevoStub;
  let apiInstanceStub;
  let sendSmtpEmailStub;

  beforeEach(() => {
    // Reset all stubs
    sinon.restore();
    
    // Create mock Brevo objects
    sendSmtpEmailStub = {
      subject: '',
      htmlContent: '',
      sender: {},
      to: [],
      headers: {},
      replyTo: {},
      params: {}
    };

    apiInstanceStub = {
      sendTransacEmail: sinon.stub()
    };

    brevoStub = {
      TransactionalEmailsApi: sinon.stub().returns(apiInstanceStub),
      SendSmtpEmail: sinon.stub().returns(sendSmtpEmailStub),
      TransactionalEmailsApiApiKeys: {
        apiKey: 'apiKey'
      }
    };

    // Mock the Brevo module
    sinon.stub(require('@getbrevo/brevo'), 'TransactionalEmailsApi').callsFake(brevoStub.TransactionalEmailsApi);
    sinon.stub(require('@getbrevo/brevo'), 'SendSmtpEmail').callsFake(brevoStub.SendSmtpEmail);
    sinon.stub(require('@getbrevo/brevo'), 'TransactionalEmailsApiApiKeys').value(brevoStub.TransactionalEmailsApiApiKeys);

    mailer = require('../utils/mailer');
  });

  describe('sendVerificationEmail', () => {
    it('should send verification email successfully', async () => {
      const to = 'test@example.com';
      const verificationUrl = 'http://localhost:4000/verify?token=abc123';
      const mockResponse = { messageId: 'msg123' };

      apiInstanceStub.sendTransacEmail.resolves(mockResponse);

      await mailer.sendVerificationEmail(to, verificationUrl);

      expect(apiInstanceStub.sendTransacEmail).to.have.been.calledWith(sendSmtpEmailStub);
      expect(sendSmtpEmailStub.subject).to.equal('Verify your email address');
      expect(sendSmtpEmailStub.htmlContent).to.include(verificationUrl);
      expect(sendSmtpEmailStub.sender).to.deep.equal({
        name: 'TrueGate',
        email: process.env.BREVO_USER
      });
      expect(sendSmtpEmailStub.to).to.deep.equal([{ email: to }]);
    });

    it('should handle array of recipients', async () => {
      const to = ['test1@example.com', 'test2@example.com'];
      const verificationUrl = 'http://localhost:4000/verify?token=abc123';
      const mockResponse = { messageId: 'msg123' };

      apiInstanceStub.sendTransacEmail.resolves(mockResponse);

      await mailer.sendVerificationEmail(to, verificationUrl);

      expect(sendSmtpEmailStub.to).to.deep.equal([
        { email: 'test1@example.com' },
        { email: 'test2@example.com' }
      ]);
    });

    it('should handle email sending errors', async () => {
      const to = 'test@example.com';
      const verificationUrl = 'http://localhost:4000/verify?token=abc123';
      const error = new Error('Email sending failed');

      apiInstanceStub.sendTransacEmail.rejects(error);

      try {
        await mailer.sendVerificationEmail(to, verificationUrl);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err.message).to.equal('Email sending failed');
      }
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should send reset password email successfully', async () => {
      const to = 'test@example.com';
      const resetUrl = 'http://localhost:4000/reset?token=abc123';
      const mockResponse = { messageId: 'msg123' };

      apiInstanceStub.sendTransacEmail.resolves(mockResponse);

      await mailer.sendResetPasswordEmail(to, resetUrl);

      expect(apiInstanceStub.sendTransacEmail).to.have.been.calledWith(sendSmtpEmailStub);
      expect(sendSmtpEmailStub.subject).to.equal('Reset your password');
      expect(sendSmtpEmailStub.htmlContent).to.include(resetUrl);
      expect(sendSmtpEmailStub.sender).to.deep.equal({
        name: 'TrueGate',
        email: process.env.BREVO_USER
      });
      expect(sendSmtpEmailStub.to).to.deep.equal([{ email: to }]);
    });

    it('should handle array of recipients for reset email', async () => {
      const to = ['test1@example.com', 'test2@example.com'];
      const resetUrl = 'http://localhost:4000/reset?token=abc123';
      const mockResponse = { messageId: 'msg123' };

      apiInstanceStub.sendTransacEmail.resolves(mockResponse);

      await mailer.sendResetPasswordEmail(to, resetUrl);

      expect(sendSmtpEmailStub.to).to.deep.equal([
        { email: 'test1@example.com' },
        { email: 'test2@example.com' }
      ]);
    });

    it('should handle reset email sending errors', async () => {
      const to = 'test@example.com';
      const resetUrl = 'http://localhost:4000/reset?token=abc123';
      const error = new Error('Reset email sending failed');

      apiInstanceStub.sendTransacEmail.rejects(error);

      try {
        await mailer.sendResetPasswordEmail(to, resetUrl);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err.message).to.equal('Reset email sending failed');
      }
    });
  });

  describe('Email configuration', () => {
    it('should set correct headers for verification email', async () => {
      const to = 'test@example.com';
      const verificationUrl = 'http://localhost:4000/verify?token=abc123';
      const mockResponse = { messageId: 'msg123' };

      apiInstanceStub.sendTransacEmail.resolves(mockResponse);

      await mailer.sendVerificationEmail(to, verificationUrl);

      expect(sendSmtpEmailStub.headers).to.deep.equal({
        'X-Mailer': 'TrueGate Brevo'
      });
      expect(sendSmtpEmailStub.replyTo).to.deep.equal({
        email: process.env.BREVO_USER,
        name: 'TrueGate'
      });
      expect(sendSmtpEmailStub.params).to.deep.equal({
        verificationUrl
      });
    });

    it('should set correct headers for reset password email', async () => {
      const to = 'test@example.com';
      const resetUrl = 'http://localhost:4000/reset?token=abc123';
      const mockResponse = { messageId: 'msg123' };

      apiInstanceStub.sendTransacEmail.resolves(mockResponse);

      await mailer.sendResetPasswordEmail(to, resetUrl);

      expect(sendSmtpEmailStub.headers).to.deep.equal({
        'X-Mailer': 'TrueGate Brevo'
      });
      expect(sendSmtpEmailStub.replyTo).to.deep.equal({
        email: process.env.BREVO_USER,
        name: 'TrueGate'
      });
      expect(sendSmtpEmailStub.params).to.deep.equal({
        resetUrl
      });
    });
  });
}); 