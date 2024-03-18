import { Client, Databases } from "appwrite";

export const client = new Client();


client
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('Your Project ID') // Your project ID
;
export const databases = new Databases(client); 