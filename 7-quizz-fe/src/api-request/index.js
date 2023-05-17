import { AUTH, HTTP } from "./http-constant"

export async function signUp(data) {
    await AUTH.post("signup", data);
}

export async function login(data) {
    const res = (await AUTH.post("login", data)).data
    localStorage.setItem("userId", res.user._id)
    localStorage.setItem("token", res.jwt)
}

export async function logout() {
    await AUTH.post("logout");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
}

export async function getAllQuiz(){
    return (await HTTP.get('quiz')).data;
}

export async function createQuiz(){
    return (await HTTP.post('create-quiz')).data;
}

export async function getQuizById(quizId){
    return (await HTTP.get(`quiz/${quizId}`)).data;
}

export async function updateQuizById(quizId){
    return (await HTTP.put('update-quiz',quizId)).data;
}

export async function getQuestionsByQuizId(quizId){
    return (await HTTP.get(`quiz/${quizId}/questions`)).data;
}

export async function getAllUsers(){
    return (await HTTP.get('users')).data;
}

export async function getUserByUsername(username){
    return (await HTTP.get('user',username)).data;
}

export async function createUser(username,password){
    return (await HTTP.post('user', { username, password })).data;
}