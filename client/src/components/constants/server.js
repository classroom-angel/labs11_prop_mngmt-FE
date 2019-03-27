const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://www.classroomangel.us'
  : 'http://localhost:3000';

export default PAYMENT_SERVER_URL;