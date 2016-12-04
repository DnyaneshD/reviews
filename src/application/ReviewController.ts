/// <reference path="../../typings/typings.d.ts" />

import { MongoDB } from '../lib/MongoDB'
import { ReviewDocument } from "./messages/ReviewDocument";
import { SocialReview } from './messages/SocialReview';

export class ReviewController {

    //OAuth token will be exchanged and login token will be created 
    save(reviewEntity : ReviewDocument): any {
         new Promise((resolve,reject) =>{
             new MongoDB().create(reviewEntity,'Review').then((result)=>{
               resolve();
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }

     update(reviewEntity:ReviewDocument): any {
         new Promise((resolve,reject) =>{
             new MongoDB().update(reviewEntity.id,reviewEntity,'Review').then((result)=>{
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


    delete(reviewId: string): Promise<any> {
        return new Promise((resolve,reject) =>{
             new MongoDB().findOne('Review',reviewId).then((result)=>{
               resolve(result);
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }

    addSocailReview(reviewEntity:SocialReview): any {
         new Promise((resolve,reject) =>{
             new MongoDB().update(reviewEntity.id,reviewEntity,'Review').then((result)=>{
               resolve();
             });
         }).catch((err)=>{
             console.log(err);
         });  
    }
} 