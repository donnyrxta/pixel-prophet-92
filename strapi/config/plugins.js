module.exports = ({ env }) => ({
  email: {
    // Uses Brevo (Sendinblue) provider for transactional emails from Strapi.
    config: {
      provider: 'sendinblue',
      providerOptions: {
        apiKey: env('BREVO_API_KEY'),
      },
      settings: {
        defaultFrom: env('BREVO_SENDER_EMAIL', 'info@sohoconnect.co.zw'),
        defaultReplyTo: env('BREVO_SENDER_EMAIL', 'info@sohoconnect.co.zw'),
      },
    },
  },
  'audit-log': {
    // Enables audit logging if plugin is installed; captures CRUD for compliance.
    enabled: true,
  },
});
