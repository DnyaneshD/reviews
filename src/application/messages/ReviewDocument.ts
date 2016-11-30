
import { User } from "./User";
import { SocialReview } from "./SocialReview";

export class ReviewDocument {
    id: string = '';
    topic: string = '';
    autherReview: string = '';
    votes: number = 0;
    numberOfViews: number = 0;
    lastUpdated: Date = new Date();
    user: User = new User();
    socialReviews: SocialReview[] = [];
}