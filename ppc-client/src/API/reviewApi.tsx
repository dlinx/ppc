import axios from "../utils/api";
import { API } from "../Constants/API";

interface IReview {
  responsibility?: number;
  learningAbility?: number;
  creativity?: number;
  punctuality?: number;
  communication?: number;
  comments?: string;
  from: string;
  to: string;
}

export const getReviewsList = () => axios.get(API.REVIEWS);

export const setReviewers = (reviews: IReview[]) => axios.get(API.REVIEWS);

export const getReview = (uid: string) => axios.get(`${API.REVIEWS}/${uid}`);

export const updateReview = (uid: string, review: IReview) =>
  axios.post(`${API.REVIEWS}/${uid}`);
