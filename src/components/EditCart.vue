<script setup>
import { ref, onMounted,computed,watch} from "vue";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { IconUpload, IconPhotoFilled } from "@tabler/icons-vue";
import CompositionTable from "./CompositionTable.vue";

const props = defineProps({
  id: String,
});

const store = useCartStore();
const { itemsArray,defaultItem } = storeToRefs(store);
const { editedItemSave } = store;
const alert = ref(false);
let retrievedItem;
const cancelEdit = () => {
  defaultItem.value = { ...retrievedItem };
};
const uploadImage = () => {
  editedItemSave();
  if (defaultItem.value.designUrl !== "") alert.value = true;
};
const handleSave = () => {
  alert.value = true;
  editedItemSave();
};

  const finalPrice = computed(() => {
  const totalPrice = Number(defaultItem.value.totalPrice) || 0;
  const  compositionPrice = defaultItem.value.composition.reduce((acc, item) => acc +(Number (item.price )|| 0),0);
  return totalPrice + compositionPrice;
});
onMounted(() => {
  if (props.id) {
    retrievedItem= itemsArray.value.find((item) => {
      return props.id === item.id;
    });
    defaultItem.value = { ...retrievedItem };
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto pa-5" :class="$vuetify.display.xs ? 'text-h5 text-center' : 'text-h3'"
          color="surface-variant"
          max-width="500"
        >
          Total Price : {{finalPrice}}
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="h-100">
          <h1 class="text-h5">Image</h1>
          <v-img
            v-if="defaultItem.designUrl"
             
            cover
            :src="defaultItem.designUrl"
          ></v-img>
          <v-img
            v-else
           
            cover
            height="$vuetify.display.xs ? 200 : 300"
            class="d-flex justify-center align-center bg-grey"
          >
            <IconPhotoFilled class="w-100 h-25" />
          </v-img>
          <v-text-field
            v-model="defaultItem.designUrl"
            label="Enter your image url"
            class="ma-4 outlined"
             :class="$vuetify.display.xs ? 'text-h6' : 'text-h5'"
          >
            <template #append>
              <IconUpload @click="uploadImage" />
            </template>
          </v-text-field>
        </v-card>
      </v-col>

      <v-col cols="12"  sm="8">
        <v-card class="h-100">
          <v-card-title>
            <span :class="$vuetify.display.xs ? 'text-h6' : 'text-h5'">Edit Item</span>
           
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12"  md="4">
                  <v-text-field
                    v-model="defaultItem.name"
                    label="Name of item"
                      :class="$vuetify.display.xs ? 'text-body-small' : 'text-body-medium'"
                      ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    label="Select Category"
                    v-model="defaultItem.category"
                    :items="[
                      'EarRing',
                      'Pendant',
                      'Ring',
                      'Chain',
                      'Necklace',
                      'Bangle',
                      'Bracelet',
                    ]"
                    :class="$vuetify.display.xs ? 'text-body-small' : 'text-body-medium'"
                  ></v-select>
                </v-col>
               
                <v-col cols="12"  md="4">
                  <v-text-field
                    type="Number"
                    v-model="defaultItem.totalPrice"
                    label="TotalPrice"
                    :class="$vuetify.display.xs ? 'text-body-small' : 'text-body-medium'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="defaultItem.description"
                    label="Description"
                    :class="$vuetify.display.xs ? 'text-body-small' : 'text-body-medium'"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-row class="d-flex justify-center mr-4">
                <v-btn variant="elevated" class="text-red" @click="cancelEdit">
                  Cancel
                </v-btn>

                <v-btn class="text-blue" variant="elevated" @click="handleSave">
                  Save
                </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-alert
    v-model="alert"
    border="start"
    color="success"
    close-label="Close Alert"
    variant="tonal"
    title="Alert"
    elevation="2"
    closable
  >
    Success</v-alert
  >
  <CompositionTable :id="props.id" />
</template>
