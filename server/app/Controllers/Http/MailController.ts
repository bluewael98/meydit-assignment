 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Mail from '@ioc:Adonis/Addons/Mail'

export default class MailController {
  public async sendEmail({ request }: HttpContextContract) {
  const data = request.all();

  // Sending email to the consumer
  await Mail.send((message) => {
    message
      .from('your_email@example.com')
      .to(data.consumer.email) // Accessing the consumer's email from the consumer object
      .subject('Quote submitted successfully')
      .html(`
      <h1>Quote submitted successfully</h1>
      <p>Your quote has been submitted successfully!</p>
      <p>Here are the details of your quote:</p>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
        <li>Phone Number: ${data.phone_number}</li>
        <li>Price: ${data.price}</li>
        <li>Comments: ${data.comments}</li>
      </ul>
    `);
  });

  // Sending email to the maker
  await Mail.send((message) => {
    message
      .from('your_email@example.com')
      .to(data.email) // Accessing the maker's email directly from the data object
      .subject('New quote received')
      .html(`
        <h1>You have received a new quote</h1>
        <p>Here are the details of the new quote:</p>
        <ul>
          <li>Name: ${data.name}</li>
          <li>Email: ${data.email}</li>
          <li>Phone Number: ${data.phone_number}</li>
          <li>Price: ${data.price}</li>
          <li>Comments: ${data.comments}</li>
        </ul>
      `);
  });
}}
