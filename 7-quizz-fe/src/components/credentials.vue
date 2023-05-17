<template>
    <div id="app">
        <v-app>
            <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
                <div>
                    <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                        <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                        <v-tab v-for="(c, i) in tabs" :key="i">
                            <v-icon large>{{ c.icon }}</v-icon>
                            <div class="caption py-1">{{ c.name }}</div>
                        </v-tab>
                        <v-tab-item>
                            <v-card class="px-4">
                                <v-card-text>
                                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginName" label="Pseudo" hint="Au moins 3 caractères" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col class="d-flex" align-end>
                                                <v-btn x-large block :disabled="!valid" color="success" @click="login"> Se connecter </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="px-4">
                                <v-card-text>
                                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="registerName" :rules="[rules.loginNameRule, rules.required, rules.minName]" label="Pseudo" maxlength="20" hint="Au moins 3 caractères" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="registerPassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="Au moins 8 caractères" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmer le mot de passe" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col class="d-flex ml-auto" sm="5">
                                                <v-btn x-large block :disabled="!valid" color="success" @click="register">Enregistrer</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </div>
            </v-dialog>
        </v-app>
    </div>
</template>

<script>
    //import axios from "axios";
    import { signUp, login } from "../api-request"

    export default {
        name: "CredentialsComponent",
        computed: {
            passwordMatch() {
            return () => this.registerPassword === this.verify || "Le mot de passe ne correspond pas";
            }
        },
        methods: {
            async register() {
                if (this.$refs.registerForm.validate()) {
                    // submit form to server/API here with axios
                    const data = {
                        username: this.registerName,
                        password: this.registerPassword
                    };
                    await signUp(data);
                    await login(data);
                    this.dialog = false;
                }
            },
            async login() {
                if (this.$refs.loginForm.validate()) {
                    // submit form to server/API here with axios
                    const data = {
                        username: this.loginName,
                        password: this.loginPassword
                    };
                    await login(data);
                    this.dialog = false;
                    /*axios.post("", data).then(response => {
                        console.log(response);
                        if(response.data.message === "success"){
                            localStorage.setItem("userID", response.data.user._id)
                            localStorage.setItem("token", response.data.jwt)

                        }
                    }).catch(error => {
                        console.log(error);
                    })*/
                    
                }
            },
            reset() {
                this.$refs.registerForm.reset();
                this.$refs.loginForm.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            }
        },
        data: () => ({
            dialog: true,
            tab: 0,
            tabs: [
                {name:"Login", icon:"mdi-account"},
                {name:"Register", icon:"mdi-account-outline"}
            ],
            valid: true,
            
            verify: "",
            loginPassword: "",
            loginName: "",
            registerName: "",
            registerPassword: "",
            show1: false,
            rules: {
            required: value => !!value || "Requis.",
            min: v => (v && v.length >= 8) || "Min 8 caractères",
            minName: v => (v && v.length >= 3) || "Min 3 caractères",
            loginNameRule: v => /[a-zA-Z0-9]+/.test(v) || "Le pseudo ne doit contenir que des lettres et des chiffres"
            }
        })
    };
</script>

<style></style>