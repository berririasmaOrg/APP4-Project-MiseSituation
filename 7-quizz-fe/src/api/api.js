

  export async function getAllQuiz(){
    return (await http.get('api/quiz')).data;
  }

  export async function createQuiz(){
    return (await http.post('api/create-quiz')).data;
  }

  export async function getQuizById(quizId){
    return (await http.get('api/quiz',quizId)).data;
  }

  export async function updateQuizById(quizId){
    return (await http.put('api/update-quiz',quizId)).data;
  }

  export async function getQuestionsByQuizId(quizId){
    return (await http.get(`api/quiz/${quizId}/questions`)).data;
  }

  export async function getAllUsers(){
    return (await http.get('api/users')).data;
  }

  export async function getUserByUsername(username){
    return (await http.get('api/user',username)).data;
  }

  export async function createUser(username,password){
    return (await http.post('api/user',username,password)).data;
  }