import { MongoDB } from '../lib/MongoDB'
import { ReviewDocument } from "./messages/ReviewDocument";
import { SocialReview } from './messages/SocialReview';

export class SocialReviewController {
    
    addSocailReview(reviewEntity:SocialReview): Promise<any> {
         let mongoDB =  new MongoDB();

         return new Promise((resolve,reject) =>{
            mongoDB.findOne('Review',reviewEntity.reviewId).then((review: ReviewDocument)=>{
               
               review.socialReviews.push(reviewEntity);

               mongoDB.update(review.id, review,"Review").then((result)=>{
                       resolve();
               });
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }
} 