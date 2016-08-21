
export class LoginController{
    
    login(userName,password){
        
        if(userName == "test" && password === "123"){
          return "You are valid user";   
        }
    }
} 