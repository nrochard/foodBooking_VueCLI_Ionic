<template>
  <ion-page >
    <ion-header>
      <ion-toolbar color="success">
        <ion-title style="font-size:20px; text-transform:uppercase">{{ infos.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
       <ion-card>
        <ion-img :src="'./assets/img/bg2.jpg'" class="img_header"></ion-img>
        <ion-card-header>
          <ion-card-subtitle>BIENVENUE !
          </ion-card-subtitle>
          <ion-card-title>Click & Collect</ion-card-title>
        </ion-card-header>
        <ion-card-content>         
          Venez chercher un repas tout prêt dans votre restaurant !
          <ion-button color="medium" expand="block" fill="outline" style="margin-top:16px">J'ai faim</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>LE CONCEPT
          </ion-card-subtitle>
          <ion-card-title color="warning">Comment ça marche ? </ion-card-title>
        </ion-card-header>
        <ion-card-content>         
          Nous vous proposons de venir chercher un repas équilibré dans notre restaurant. Nous cuisinons tous les midi et tous les soirs environ 40 repas (du lundi au vendredi). Pour cela, il suffit de choisir un créneau et venir directement chercher au restaurant le repas. le restaurant vous accueille dans le respect du protocole sanitaire.
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>HORAIRES
          </ion-card-subtitle>
          <ion-card-title color="success">À quelle heure ?</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p> {{ infos.date }}</p>  
          <p> {{ infos.slot }}</p>  
          <p> Nous ne proposons pas de repas à emporter le week-end (samedi et dimanche).</p>  
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>INFORMATIONS PRATIQUES</ion-card-subtitle>
          <ion-card-title color="danger" >Comment nous joindre ?</ion-card-title>
        </ion-card-header>
        
        <ion-card-content>         
          <p><ion-icon color="dark" :icon="call" /> {{ infos.phone }}</p>
          <p><ion-icon color="dark" :icon="mail" /> {{ infos.mail }}</p>
        </ion-card-content>

        <ion-card-header> 
          <ion-card-title color="danger">Où nous trouver ?</ion-card-title>
        </ion-card-header>

        <ion-card-content>         
          <div class="map-responsive">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10499.388539404134!2d2.3562227!3d48.8611253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x165cc8f5142afd8c!2sLe%20Reflet!5e0!3m2!1sfr!2sfr!4v1612877216580!5m2!1sfr!2sfr" width="500" height="350" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </ion-card-content>

        <ion-card-header> 
         <ion-card-title color="danger">Comment venir ?</ion-card-title>        
        </ion-card-header>

        <ion-card-content>         
          Métro : Halles (4/RER A, B et D), Rambuteau (11), Hôtel de Ville (1/11)
        </ion-card-content>

      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonImg } from '@ionic/vue';
import { call, mail} from 'ionicons/icons';
import axios from "axios";

export default  {
  data(){
    return{
      infos : ""
    }
  },
  name: 'Home',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonImg },
    setup() {
    return {
      call,
      mail
    }
  },
    mounted(){
        axios
        .get("https://food-booking-laravel.herokuapp.com/api/infos")
        .then((response) =>{
            console.log(response.data);
            this.infos = response.data;
        })
        .catch((error) => {
          console.log(error);

        })
    }
}
</script>