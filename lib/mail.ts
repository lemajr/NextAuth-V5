import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to safely get the environment variable
const getEnvVar = (key: string, defaultValue?: string) => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue;
};

// Base URL for links (use the environment variable or fallback to localhost)
const BASE_URL = getEnvVar('BASE_URL', 'https://next-auth-v5-kappa.vercel.app/');

// Function to send a Two-Factor Authentication email
export const sendTwoFactorMail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Two Factor Authentication',
      html: `<p>Your two-factor authentication code is: <b>${token}</b></p>`,
    });
    console.log(`2FA email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send 2FA email to ${email}:`, error);
  }
};

// Function to send a Password Reset email
export const sendPasswordResetMail = async (email: string, token: string) => {
  const resetLink = `${BASE_URL}/auth/new-password?token=${token}`;
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset',
      html: `<p>You can reset your password by clicking the following link: <a href="${resetLink}">Reset Password</a></p>`,
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send password reset email to ${email}:`, error);
  }
};

// Function to send an Email Verification email
export const sendVerificationMail = async (email: string, token: string) => {
  const confirmationLink = `${BASE_URL}/auth/new-verification?token=${token}`;
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Please verify your email',
      html: `<p>Please verify your email by clicking the following link: <a href="${confirmationLink}">Verify Email</a></p>`,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send verification email to ${email}:`, error);
  }
};
