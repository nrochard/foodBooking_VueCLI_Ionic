<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title style="font-size:20px; text-transform:uppercase">FOOD BOOKING</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <formBooking/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import formBooking from '@/components/formBooking.vue';

export default  {
  name: 'Booking',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, formBooking }
}
</script>