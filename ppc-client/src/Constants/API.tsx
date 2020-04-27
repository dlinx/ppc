export const SERVER =
  process.env.NODE_ENV !== "development" ? "" : `http://localhost:3000`;

export const API = {
  LOGIN: `${SERVER}/auth/login`,
  LOGOUT: `${SERVER}/auth/logout`,
  EMPLOYEES: `${SERVER}/employees`,
  DELETE_EMPLOYEES: `${SERVER}/employees/delete`,

  // Reviews
  REVIEWS: `${SERVER}/review`,
  REVIEWS_TO: `${SERVER}/review/to`,

  MY_REVIEW_REQUESTS: `${SERVER}/me/review/requests`,
  MY_REVIEWS: `${SERVER}/me/review`,

  SUBMIT_REVIEW: `${SERVER}/me/review/submit`,
};
