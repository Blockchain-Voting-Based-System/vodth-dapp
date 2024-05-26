import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

export const useSendEmail = (
  email: string,
  event_name: string,
  secret: string,
) => {
  emailjs
    .send(
      import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
      {
        voter: email,
        event: event_name,
        secret: secret,
      },
      {
        publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
      },
    )
    .then((response: EmailJSResponseStatus) => {
      console.log("Email sent successfully: ", response);
    })
    .catch((error) => {
      console.error("Error sending email: ", error);
    });
};
