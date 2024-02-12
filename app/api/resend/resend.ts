import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POSTS() {
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['metralciro.dev@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
      text: "Hello world",
    });
    console.log(data);

    if (error) {
      console.error(error);
      return;
    }
    return NextResponse.json({message:'send email'}, {status: 200});
}
