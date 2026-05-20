'use server';

import { getPayload } from 'payload';
import configPromise from '@/payload.config';

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

    try {
      await payload.sendEmail({
        to: 'info@horizon-ss.com',
        subject: `New Horizon Support Ticket: ${ticketId}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #E50914;">New Support Ticket Received</h2>
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Service of Interest:</strong> ${serviceOfInterest}</p>
            <hr style="border-top: 1px solid #eee;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.warn('Failed to send email notification:', emailError);
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
