<template>
  <div id="container">
      <form @submit.prevent>
        <ion-card>
            <!-- <p class="ion-label">Email</p> -->
            <ion-item>
                <ion-input placeholder="Email" v-model="email" class="ion-input-custom"></ion-input>
            </ion-item>
            <!-- <p class="ion-label">Date</p> -->
            <ion-item>
                <!-- <ion-label>Date</ion-label> -->
                <ion-datetime color="danger" display-format="D MMM YYYY" min="2021" cancel-text="Fermer" done-text="Valider" monthShortNames='Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Sept, Octobre, Novembre, Décembre' v-model="date" placeholder="Date" value="2019-10-01T15:43:40.394Z" display-timezone="utc"></ion-datetime>
            </ion-item>
            <!-- <p class="ion-label">Créneau</p> -->
            <ion-list>
                <ion-radio-group v-model="slot" color="warning">
                <!-- <ion-list-header>
                    <ion-label>
                    Créneau
                    </ion-label>
                </ion-list-header> -->
                <ion-item>
                    <ion-label>10h30 à 11h</ion-label>
                    <ion-radio color="success" value="10h30 à 11h"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>11h à 11h30</ion-label>
                    <ion-radio color="success" value="11h à 11h30"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>11h30 à 12h</ion-label>
                    <ion-radio color="success" value="11h30 à 12h"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>12h à 12h30</ion-label>
                    <ion-radio color="success" value="12h à 12h30"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>12h30 à 13h</ion-label>
                    <ion-radio color="success" value="12h30 à 13h"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>16h à 16h30</ion-label>
                    <ion-radio color="success" value="13h à 13h30"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>16h30 à 17h</ion-label>
                    <ion-radio color="success" value="16h30 à 17h30"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>17h à 17h30</ion-label>
                    <ion-radio color="success" value="17h à 17h30"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>17h30 à 18h</ion-label>
                    <ion-radio color="success" value="17h30 à 18h"></ion-radio>
                </ion-item>
                </ion-radio-group>
            </ion-list>
            <!-- <p class="ion-label"></p> -->
            <ion-item>
                <ion-checkbox color="success" @click.prevent="checkCondtions"></ion-checkbox>
                <ion-label>J'ai lu et j'accepte les conditions générales d'utilisation.</ion-label>
            </ion-item>
            <ion-button style="margin: 20px 0" @click.prevent="bookSlot" color="dark">Réserver</ion-button>
            </ion-card>
        </form>  
        <ion-button id="cancel" disabled="true" color="warning" @click.prevent="cancelBooking">Annuler ma réservation</ion-button>
  </div>
</template>

<script>

import { IonInput, IonItem, IonDatetime, IonLabel, IonRadioGroup, IonCard, IonButton, IonList, IonCheckbox, IonRadio} from '@ionic/vue';
import axios from "axios";

export default {
    components: {  IonInput, IonItem, IonDatetime, IonLabel, IonRadioGroup, IonCard, IonButton, IonList, IonCheckbox, IonRadio },
    data(){
        return{
            email : "",
            date : "",
            slot : "",
            conditions : "",
            token : "",
            checkedConditions : false
        }
    },
    name: 'formBooking',
    props: {
        name: String
    },
    methods: {
        bookSlot(){
            if (this.checkedConditions != true){
                this.displayError("Vous devez accepter les conditions.")
                return;
            }
            if (!this.email || !this.date || !this.slot){
                this.displayError("Vous devez remplir tous les champs.")
                return;
            }
            var bodyFormData = new FormData();
            bodyFormData.append('email', this.email);
            bodyFormData.append('slot', this.slot);
            bodyFormData.append('date', this.date);
            bodyFormData.append('conditions', 1);
            axios({
                method: "post",
                url: "http://food-booking-laravel.herokuapp.com/api/reservation",
                data: bodyFormData,
                headers: {"Accept" : "application/json" },
                })
                .then((response) => {
                    console.log(response);
                    const message = response.data.message;
                    console.log(response.data.token);
                    this.token = response.data.token;
                    this.email = "";
                    this.slot = "";
                    this.date = "";
                    document.querySelector("#cancel").setAttribute("disabled", "false");
                    this.displaySuccess(message);

                })
                .catch((error) => {
                    // console.log(error.response.data);
                    if (error.response.data.errors){
                        error.response.data.errors.email.forEach(element => {
                            this.displayError(element)
                        });
                    }
                    else{
                         this.displayError(error.response.data.message)
                    }
                    
            })
        },
        cancelBooking(){
            axios
                .post(`https://food-booking-laravel.herokuapp.com/api/reservation/annulation/${this.token}`)
                .then((response) =>{
                     document.querySelector("#cancel").setAttribute("disabled", "true");
                     this.displaySuccess(response.data.message);
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        checkCondtions(){
            if (this.checkedConditions){
                this.checkedConditions = false;
            }
            else{
                this.checkedConditions = true;
            }
        },
        displayError(message){
        const toast = document.createElement('ion-toast');
        toast.message = message;
        toast.duration = 2000;
        toast.color = "danger";
        document.body.appendChild(toast);
        return toast.present();
        },
        displaySuccess(message){
        const toast = document.createElement('ion-toast');
        toast.message = message;
        toast.duration = 2000;
        toast.color = "success";
        document.body.appendChild(toast);
        return toast.present();
        },
    
    }
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.ion-label{
    /* margin-top: 10px !important; */
    /* margin-left: 20px !important; */
    text-align: left;
}


</style>