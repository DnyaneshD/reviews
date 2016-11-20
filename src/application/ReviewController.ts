/// <reference path="../../typings/typings.d.ts" />

import { MongoDB } from '../lib/MongoDB'
import { Review } from "./messages/Review";


export class ReviewController {

    //OAuth token will be exchanged and login token will be created 
    save(reviewEntity : Review): any {
         new Promise((resolve,reject) =>{
             new MongoDB().create(reviewEntity,'Review').then((result)=>{
               resolve();
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }
    
    getAll(): Promise<any> {
        return new Promise((resolve,reject) =>{
             new MongoDB().find('Review').then((result)=>{
               resolve(result);
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }

    getOne(reviewId: string): Promise<any> {
        return new Promise((resolve,reject) =>{
             new MongoDB().findOne('Review',reviewId).then((result)=>{
               resolve(result);
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }
    
} 