import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Force Node.js runtime (not Edge runtime)
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // 1. Allow only in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Endpoint only available in development mode (NODE_ENV=development)' },
      { status: 403 }
    );
  }

  // 2. Optional internal secret token check for extra security
  const internalSecret = process.env.INTERNAL_SECRET_TOKEN;
  if (internalSecret) {
    const tokenHeader = req.headers.get('x-secret-token');
    const { searchParams } = new URL(req.url);
    const tokenParam = searchParams.get('token');

    if (tokenHeader !== internalSecret && tokenParam !== internalSecret) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or missing secret token' },
        { status: 401 }
      );
    }
  }

  try {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const secure = process.env.SMTP_SECURE === 'true';
    const from = process.env.EMAIL_FROM || 'info@horizon-ss.com';

    if (!host || !user || !pass) {
      return NextResponse.json(
        { success: false, error: 'SMTP configuration is incomplete in .env' },
        { status: 400 }
      );
    }

    // Verify SMTP connection and credentials
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '10000'),
      greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || '10000'),
      socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || '15000'),
    });

    await transporter.verify();

    // Send the test email
    const info = await transporter.sendMail({
      from: `"Horizon SMTP Verification" <${from}>`,
      to: 'info@horizon-ss.com',
      subject: 'Horizon SMTP Verification Success',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1f2937; line-height: 1.6;">
          <div style="background-color: #10b981; color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 20px;">SMTP Transporter Verified Successfully</h2>
          </div>
          <p>This test email confirms that your SMTP server connection and credentials are valid and working in development mode.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 150px;">SMTP Host:</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${host}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">SMTP Port:</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${port}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Secure Connection:</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${secure ? 'Yes (SSL/TLS)' : 'No (STARTTLS)'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Authenticated User:</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${user}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Timestamp:</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${new Date().toISOString()}</td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated notification from the Horizon Intelligent Technology web portal.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'SMTP Transport verified and test email sent successfully to info@horizon-ss.com!',
      messageId: info.messageId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
