<template>
    <div>
    <v-card>
        <v-card-title>
            <h3>Création d'un Quizz</h3>
        </v-card-title>
        <v-form v-model="valid" ref="createForm" lazy-validation>
            <v-container>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="quizzName"
                    :rules="nameRules"
                    :counter="20"
                    label="Nom du quizz"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                    <v-checkbox v-model="publique" label="Publique"></v-checkbox>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                    <v-btn color="primary" :disabled="!valid" @click="createQuizz">Créer</v-btn>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
    </v-card>
    <quizz v-for="(q, i) in quizzList" class="ma-4" :key="i" :number="i" :quizz="q"/>
    </div>
</template>

<script>
import axios from "axios";
import Quizz from "../components/Quizz.vue";

export default {
    name: 'CreateQuizzComponent',
    props: {
        value: Number
    },
    created() {
        this.getQuizz();
    },
    components: {
        Quizz
    },
    methods: {
        async getQuizz() {
            axios.get(`http://localhost:3000/api/quiz?createdBy=${localStorage.getItem("userID")}`).then(response => {
                console.log(response);
                this.quizzList = response.data;
            }).catch(error => {
                console.log(error);
            })
            console.log(this.quizzList);
        },
        createQuizz() {
            if (this.$refs.createForm.validate()) {
                // submit form to server/API here with axios
                const data = {
                    quizName: this.quizzName,
                    public: this.publique,
                    createdBy: localStorage.getItem("userID")
                };
                axios.post("http://localhost:3000/api/create-quiz", data).then(response => {
                    console.log(response);
                    if(response.status === 200){
                        this.quizzID = response.data._id;
                        this.$emit('input', this.quizzID);
                        this.getQuizz();
                    }
                }).catch(error => {
                    console.log(error);
                })
                
            }
        },  
    },
    data: () => ({
      valid: false,
      publique: false,
      quizzName: '',
      quizzID: '',
      quizzList: [],
      nameRules: [
        value => {
          if (value) return true

          return 'Le nom est requis.'
        },
        value => {
          if (value?.length <= 20) return true

          return 'Le nom doit contenir 20 caractères maximum.'
        },
      ]
    }),
  }

</script>

<style></style>
