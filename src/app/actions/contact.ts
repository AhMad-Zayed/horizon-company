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

    await payload.create({
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

    return { success: true, message: 'Thank you! Your inquiry has been successfully submitted. Our team will contact you within 1 hour.' };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'An unexpected error occurred while submitting your message. Please try again or contact us directly at info@horizon-ss.com.' };
  }
}
