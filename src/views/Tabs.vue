<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/food/accueil">
          <ion-icon color="dark" :icon="home" />
          <ion-label color="dark">Accueil</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="booking" href="/food/reservation">
          <ion-icon color="dark" :icon="calendar" />
          <ion-label color="dark">Réserver</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { ellipse, square, triangle, home, calendar } from 'ionicons/icons';



export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
      home,
      calendar
    }
  }
}
</script>