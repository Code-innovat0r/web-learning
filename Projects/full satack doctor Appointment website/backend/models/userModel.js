import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    originalpassword:{type:String, required:true},
    phone:{type:String, default:'0000000000'},
    image:{type:String, default:null},
    address:{type:Object, default:{line1:'',line2:''}},
    gender:{type:String, default:'Not Selected'},
    dob:{type:String, default:'Not Selected'},
    gender:{type:String, default:'00'},
},{minimize:false});

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

 export default userModel;

/* 
we are storing the address of the user in the two sub parts

this is a base64 encoded string of the dafault user profile image

data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iOTgiIHZpZXdCb3g9IjAgMCA5OCA5OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDkiIGN5PSI0OSIgcj0iNDkiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTQ5LjEwMDggNDYuMTAwMUM1Mi40NDIyIDQ2LjEwMDEgNTUuMTUwOSA0My4zOTE0IDU1LjE1MDkgNDAuMDUwMUM1NS4xNTA5IDM2LjcwODcgNTIuNDQyMiAzNCA0OS4xMDA4IDM0QzQ1Ljc1OTUgMzQgNDMuMDUwOCAzNi43MDg3IDQzLjA1MDggNDAuMDUwMUM0My4wNTA4IDQzLjM5MTQgNDUuNzU5NSA0Ni4xMDAxIDQ5LjEwMDggNDYuMTAwMVoiIGZpbGw9IiNBQUFBQUEiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNNjEuMjAwMiA1Ny40NDNDNjEuMjAwMiA2MS4yMDIxIDYxLjIwMDIgNjQuMjQ5MyA0OS4xMDAxIDY0LjI0OTNDMzcgNjQuMjQ5MyAzNyA2MS4yMDIxIDM3IDU3LjQ0M0MzNyA1My42ODQgNDIuNDE3NCA1MC42MzY3IDQ5LjEwMDEgNTAuNjM2N0M1NS43ODI4IDUwLjYzNjcgNjEuMjAwMiA1My42ODQgNjEuMjAwMiA1Ny40NDNaIiBmaWxsPSIjQUFBQUFBIi8+Cjwvc3ZnPgo=
*/
