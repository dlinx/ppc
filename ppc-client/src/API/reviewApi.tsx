import axios from "../utils/api";
import { API } from "../Constants/API";

interface IReview {
  responsibility?: number;
  learningAbility?: number;
  creativity?: number;
  punctuality?: number;
  communication?: number;
  comments?: string;
  from?: string;
  to?: string;
}

export const getReviewsList = () => axios.get(API.REVIEWS);

export const setReviewers = (reviews: IReview[]) =>
  axios.post(API.REVIEWS, { reviews });

export const getReview = (uid: string) => axios.get(`${API.REVIEWS}/${uid}`);

export const updateReview = (uid: string, review: IReview) =>
  axios.post(`${API.REVIEWS}/${uid}`);

export const getMyReviewRequests = () => axios.get(`${API.MY_REVIEW_REQUESTS}`);

export const getMyReviews = () => axios.get(`${API.MY_REVIEWS}`);

export const submitReview = (rid: string, review: IReview) =>
  axios.post(`${API.SUBMIT_REVIEW}/${rid}`, review);

export const getReviewsFor = (uid: string) =>
  axios.get(`${API.REVIEWS_TO}/${uid}`);
