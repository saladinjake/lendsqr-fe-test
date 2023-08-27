import dotenv from "dotenv"
dotenv.config()
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ?  "http://localhost:8000/api/v1"  
    : "https://somewhere-in-aws.com"


  export const MICROSERVICE_FRONT_ENROLLMENT=""
  export const MICROSERVICE_FRONT_AUTHORING=""
  export const MICROSERVICE_FRONT_ADMIN=""
  export const BASE_URL_ENROLLMENT ="http://localhost:8000/api/v1"
  export const PRIVATE_KEY_ENCRYPTER_1="";
  export const PRIVATE_KEY_ENCRYPTER_2=""