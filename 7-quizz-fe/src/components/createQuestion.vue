<template>    
    <div>
                    <div>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form v-model="valid" ref="createForm" lazy-validation>
                                    <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="12"
                                        >
                                        <v-text-field
                                            v-model="questionLabel"
                                            :rules="nameRules"
                                            :counter="100"
                                            label="Titre de la question"
                                            required
                                        ></v-text-field>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="5"
                                        >
                                        <v-text-field
                                            v-model="responseA"
                                            :rules="questionRules"
                                            :counter="30"
                                            label="Réponse A"
                                            required
                                        ></v-text-field>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        md="1"
                                        >
                                            <v-checkbox v-model="isCorrectA"></v-checkbox>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="5"
                                        >
                                        <v-text-field
                                            v-model="responseB"
                                            :rules="questionRules"
                                            :counter="30"
                                            label="Réponse B"
                                            required
                                        ></v-text-field>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        md="1"
                                        >
                                            <v-checkbox v-model="isCorrectB"></v-checkbox>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="5"
                                        >
                                        <v-text-field
                                            v-model="responseC"
                                            :rules="questionRules"
                                            :counter="30"
                                            label="Réponse C"
                                            required
                                        ></v-text-field>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        md="1"
                                        >
                                            <v-checkbox v-model="isCorrectC"></v-checkbox>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="5"
                                        >
                                        <v-text-field
                                            v-model="responseD"
                                            :rules="questionRules"
                                            :counter="30"
                                            label="Réponse D"
                                            required
                                        ></v-text-field>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        md="1"
                                        >
                                            <v-checkbox v-model="isCorrectD"></v-checkbox>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="4"
                                        >
                                            <v-btn color="primary" :disabled="!valid" @click="createQuestion">Ajouter</v-btn>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        md="4"
                                        >
                                            <v-btn color="primary" @click="closeWindow()">Annuler</v-btn>
                                        </v-col>
                                    </v-row>
                                    </v-container>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'CreateQuizzComponent',
    
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        quizzID: {
            type: String,
            default: "",
        },
        question: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        createQuestion() {
            if (this.$refs.createForm.validate()) {
                // submit form to server/API here with axios
                const data = {
                    quizId : this.quizzID,
                    question : this.questionLabel,
                    answers : [
                        {
                            answer : this.responseA,
                            correct : this.isCorrectA
                        },
                        {
                            answer : this.responseB,
                            correct : this.isCorrectB
                        },
                        {
                            answer : this.responseC,
                            correct : this.isCorrectC
                        },
                        {
                            answer : this.responseD,
                            correct : this.isCorrectD
                        }
                    ] 
                };
                axios.post("http://localhost:3000/api/question", data).then(response => {
                    console.log(response);
                    if(response.status === 201){
                        this.questionID = response.data._id;
                        this.closeWindow();
                    }
                }).catch(error => {
                    console.log(error);
                })
                
            }
        },
        closeWindow(){
            this.$emit('input', false);
        }
    },
    data: () => ({
    valid: false,
    dialog: true,
    questionLabel: '',
    questionID: '',
    responseA: '',
    responseB: '',
    responseC: '',
    responseD: '',

    isCorrectA: false,
    isCorrectB: false,
    isCorrectC: false,
    isCorrectD: false,

    nameRules: [
        value => {
        if (value) return true

        return 'Le titre est requis.'
        },
        value => {
        if (value?.length <= 100) return true

        return 'Le titre doit contenir 100 caractères maximum.'
        },
    ],
    questionRules: [
        value => {
        if (value) return true

        return 'La réponse est requise.'
        },
        value => {
        if (value?.length <= 20) return true

        return 'Le réponse doit contenir 30 caractères maximum.'
        },
    ]
    }),
}

</script>

<style>

</style>
