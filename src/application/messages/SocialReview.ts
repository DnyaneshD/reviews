import { User } from "./User";

export class SocialReview{
    id: string = '';
    review: string = '';
    lastUpdated: Date = new Date();
    user: User = new User();
    //Review id 
    reviewId :string   = '';
}