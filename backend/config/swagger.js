const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrueGate API Documentation',
      version: '1.0.0',
      description: 'API documentation for TrueGate authentication and security system',
      contact: {
        name: 'TrueGate Team',
        email: 'support@truegate.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://localhost',
        description: 'Local development server (HTTPS)'
      },
      {
        url: 'https://truegate.live',
        description: 'Production server (HTTPS)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        csrfToken: {
          type: 'apiKey',
          in: 'header',
          name: 'X-CSRF-Token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            birthDate: {
              type: 'string',
              description: 'User birth date'
            },
            gender: {
              type: 'string',
              description: 'User gender'
            },
            contactNumber: {
              type: 'string',
              description: 'User contact number'
            },
            role: {
              type: 'string',
              description: 'User role (user/admin)',
              enum: ['user', 'admin']
            },
            verified: {
              type: 'boolean',
              description: 'Email verification status'
            },
            lastLogin: {
              type: 'string',
              format: 'date-time',
              description: 'Last login timestamp'
            },
            loginAttempts: {
              type: 'integer',
              description: 'Number of failed login attempts'
            },
            locked: {
              type: 'boolean',
              description: 'Account lock status'
            },
            allowedIps: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of allowed IP addresses'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              description: 'User password'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password', 'firstName', 'lastName', 'birthDate', 'gender', 'contactNumber'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (minimum 6 characters)'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            birthDate: {
              type: 'string',
              description: 'User birth date'
            },
            gender: {
              type: 'string',
              description: 'User gender'
            },
            contactNumber: {
              type: 'string',
              description: 'User contact number'
            },
            role: {
              type: 'string',
              description: 'User role (optional, defaults to user)',
              enum: ['user', 'admin']
            }
          }
        },
        ChangePasswordRequest: {
          type: 'object',
          required: ['oldPassword', 'newPassword'],
          properties: {
            oldPassword: {
              type: 'string',
              description: 'Current password'
            },
            newPassword: {
              type: 'string',
              minLength: 6,
              description: 'New password (minimum 6 characters)'
            }
          }
        },
        ResetPasswordRequest: {
          type: 'object',
          required: ['email', 'token', 'newPassword'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address for password reset'
            },
            token: {
              type: 'string',
              description: 'Reset token from email'
            },
            newPassword: {
              type: 'string',
              minLength: 6,
              description: 'New password (minimum 6 characters)'
            }
          }
        },
        SecurityLog: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
              format: 'date-time'
            },
            level: {
              type: 'string',
              enum: ['INFO', 'WARN', 'ERROR', 'SECURITY', 'AUDIT']
            },
            eventType: {
              type: 'string',
              description: 'Type of security event'
            },
            ip: {
              type: 'string',
              description: 'Client IP address'
            },
            userAgent: {
              type: 'string',
              description: 'Client user agent'
            },
            details: {
              type: 'object',
              description: 'Additional event details'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
      {
        csrfToken: []
      }
    ]
  },
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './middleware/*.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;
