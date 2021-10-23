import * as chatDb from "../data/chatDb/chatDb.js";

export async function register(ctx, next) {
    try {
        await chatDb.addUser(ctx.request.body);
        ctx.body = "success added";
    } catch (exception) {
        ctx.status = 500;
        ctx.body = exception.toString();
    }
    
}

export async function getUsers(ctx, next) {
    try {
        console.log(ctx.request.query);
        var users = await chatDb.getUserByPhoneNumber(ctx.request.query.phoneNumber);
        if (!users?.length) {
            ctx.status = 404;
        }
        ctx.body = users;
    } catch (exception) {
        ctx.status = 500;
        ctx.body = exception.toString();
    } 
} 

export function auth(ctx, next) {
    ctx.body = 'auth';
}