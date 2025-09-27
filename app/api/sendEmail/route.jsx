import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const order = await req.json();
    console.log("Sending email to:", order.customer.email);

    const data = await resend.emails.send({
      from: "your-verified-email@resend.dev", // must match verified email
      to: order.customer.email,
      subject: "✅ Order Confirmation",
      html: `
        <h2>Thank you, ${order.customer.name}!</h2>
        <p>Total: $${order.total.toFixed(2)}</p>
      `,
    });

    console.log("Email sent:", data);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
