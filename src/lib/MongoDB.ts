/// <reference path="../../typings/typings.d.ts" />
import * as nconf from "nconf";
import * as db from "mongodb";

export class MongoDB{
    
     mongoClient = db.MongoClient;
     url = nconf.get('dburl');

    create(entity): Promise<any>{
      return new Promise((resolve,reject) => {
        
        this.mongoClient.connect(this.url, (err,db)=>{
        
        let loginDetails = db.collection('LoginDetails');
          loginDetails.insert(entity,(err,result)=>{
            resolve(result); 
          });
        });
      });
    }

    update(){

    }

    delete(){
        
    }

    connect(){
        this.mongoClient.connect(this.url, (err,db)=>{
             
        });
    }
}