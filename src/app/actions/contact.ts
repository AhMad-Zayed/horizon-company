'use server';

import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import nodemailer from 'nodemailer';

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const serviceOfInterest = formData.get('serviceOfInterest') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return { success: false, error: 'Please fill in all required fields (Name, Email, Message).' };
    }

    const payload = await getPayload({ config: configPromise });

    const newMessage = await payload.create({
      collection: 'contact-messages',
      data: {
        name,
        email,
        phone: phone || '',
        company: company || '',
        serviceOfInterest: serviceOfInterest || 'General Inquiry',
        message,
        status: 'new',
      },
    });

    const ticketId = `#HRZ-2026-${String(newMessage.id).toUpperCase()}`;

    // Send email copy to info@horizon-ss.com using SMTP config if available
    try {
      const host = process.env.SMTP_HOST;
      const port = parseInt(process.env.SMTP_PORT || '587');
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const from = process.env.SMTP_FROM || 'noreply@horizon-ss.com';

      if (host && user && pass) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: {
            user,
            pass,
          },
        });

        await transporter.sendMail({
          from: `"Horizon Support" <${from}>`,
          to: 'info@horizon-ss.com',
          subject: `New Horizon Support Ticket: ${ticketId}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1f2937; line-height: 1.6;">
              <div style="background-color: #E50914; color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 20px;">New Support Ticket Received</h2>
              </div>
              <p>A new support inquiry has been submitted through the website. Details are listed below:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 180px;">Ticket ID:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-family: monospace; font-size: 14px;">${ticketId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${phone ? `<a href="tel:${phone}">${phone}</a>` : 'N/A'}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${company || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Service of Interest:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${serviceOfInterest}</td>
                </tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p><strong>Message / Issue Description:</strong></p>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; font-family: inherit; white-space: pre-wrap; margin-bottom: 20px;">${message}</div>
              <p style="font-size: 12px; color: #6b7280; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 10px;">
                This is an automated notification from the Horizon Intelligent Technology web portal.
              </p>
            </div>
          `,
        });
        console.log(`[Horizon Email] Notification successfully sent for ticket ${ticketId}.`);
      } else {
        console.warn(`[Horizon Email] SMTP credentials not fully configured in .env. Logging message payload for ticket ${ticketId}:`, {
          ticketId,
          name,
          email,
          phone,
          company,
          serviceOfInterest,
        });
      }
    } catch (emailError) {
      console.warn('[Horizon Email] Failed to send SMTP email notification:', emailError);
    }

    return {
      success: true,
      message: 'Thank you! Your inquiry has been successfully submitted. Our team will contact you within 1 hour.',
      ticketId,
    };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'An unexpected error occurred while submitting your message. Please try again or contact us directly at info@horizon-ss.com.' };
  }
}
