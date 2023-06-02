import $http from "./index.js"

export const login =(data)=>{
    return $http.get("/123",data)
} 