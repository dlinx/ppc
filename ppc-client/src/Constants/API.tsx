export const SERVER = `http://localhost:3000`;
export const API = {
  LOGIN: `${SERVER}/auth/login`,
  LOGOUT: `${SERVER}/auth/logout`,
  EMPLOYEES: `${SERVER}/employees`,
  DELETE_EMPLOYEES: `${SERVER}/employees/delete`,

  // Reviews
  REVIEWS: `${SERVER}/review`,

  MY_REVIEW_REQUESTS: `${SERVER}/me/review/requests`,
  SUBMIT_REVIEW: `${SERVER}/me/review/submit`,
};
