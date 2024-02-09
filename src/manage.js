import { databases } from "./appwrite";

export const promise = databases.listDocuments('6579b41be6483d8bf4a3', '6579b439b3b7bd027224');
promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
// export response;
