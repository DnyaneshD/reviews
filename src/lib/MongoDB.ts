/// <reference path="../../typings/typings.d.ts" />
import * as nconf from "nconf";
import * as db from "mongodb";

export class MongoDB{
    
     mongoClient = db.MongoClient;
     url = nconf.get('dburl');

    create(entity:any, collectionName: string): Promise<any>{
      return new Promise((resolve,reject) => {
        
        this.mongoClient.connect(this.url, (err,db)=>{
        
          db.collection(collectionName).insert(entity,(err,result)=>{
            resolve(result); 
          });

        });
      });
    }

    find(collectionName: string): Promise<any>{
      return new Promise((resolve,reject)=>{

        this.mongoClient.connect(this.url, (err,db)=>{
        
        let loginDetails = db.collection(collectionName);
          db.collection(collectionName).find({}).toArray((err, result) =>{
            resolve(result); 
          });
        });
      });
    }

    findOne(collectionName: string, reviewId: string): Promise<any>{
      return new Promise((resolve,reject)=>{

        this.mongoClient.connect(this.url, (err,db)=>{
        
        let loginDetails = db.collection(collectionName);
          db.collection(collectionName).findOne({id: reviewId}, (err, result) =>{
            resolve(result); 
          });
        });
      });
    }

    update(id: string, entity:any, collectionName: string){

       return new Promise((resolve,reject) => {
        
        this.mongoClient.connect(this.url, (err,db)=>{
        
          db.collection(collectionName).update({id: id},entity,(err,result)=>{
            resolve(result); 
          });
        });
      });
    }

    delete(collectionName: string, reviewId: string): Promise<any>{
         return new Promise((resolve,reject)=>{

        this.mongoClient.connect(this.url, (err,db)=>{
        
        let loginDetails = db.collection(collectionName);
          db.collection(collectionName).deleteOne({id: reviewId}, (err, result) =>{
            resolve(result); 
          });
        });
      });
    }

    //This is exception to the generic library and need to worked on in order to clean up
    addSocialReview(reviewId: string, entity:any, collectionName: string){

       return new Promise((resolve,reject) => {
        
        this.mongoClient.connect(this.url, (err,db)=>{
        
          db.collection(collectionName).updateOne({id: reviewId},{$push: { socialReviews:{ entity } }},(err,result)=>{
            resolve(result); 
          });
        });
      });
    }

    connect(){
        this.mongoClient.connect(this.url, (err,db)=>{
             
        });
    }
}