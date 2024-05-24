import { api } from "./axios";

/**
 * FUnction to check if a specific ID is the current user's id.
 * 
 * @param userId string - User id you are checking.
 * @returns boolean - True if the id you are checking is current user's id.
 */
export async function isUser(userId: string) {
    const res = await api.get('/user/');
    const id = res.data.value._id;
    return userId == id;
}