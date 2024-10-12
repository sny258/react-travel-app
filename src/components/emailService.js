import axios from 'axios';
import config from '../config'; 

// Set the default config for axios
axios.defaults.withCredentials = true;
// Send email function
const sendEmail = async (to, subject, text) => {
  console.log('Sending email...');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Text:', text);
  try {
    const response = await axios.post(config.API_BASE_URL + '/send-email', {to, subject, text}, {
      validateStatus: function (status) {
        // Consider any status code less than 500 as a success status.
        return status < 500;
      }
    });
    console.log('Response:', response);
      if (response.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.log('Failed to send email');
      }
    } catch (error) {
      console.log('Error:', error);
    }
}

export default sendEmail;
