<template>
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
</template>

<script>
import axios from "axios";

export default {
    name: 'CreateQuizzComponent',
    methods: {
        createQuizz() {
            if (this.$refs.createForm.validate()) {
                // submit form to server/API here with axios
                const data = {
                    quizName: this.quizzName,
                    public: this.publique,
                    createdBy: "64620718baa6746205018d44"
                };
                axios.post("https://cb87-81-64-10-126.ngrok-free.app/api/create-quiz", data).then(response => {
                    console.log(response);
                    /*if(response.status === 200){
                        
                    }*/
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
