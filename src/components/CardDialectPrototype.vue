<template>
  <div>
    <v-fade-transition>
      <v-card
        v-click-outside="clickoutside"
        outlined
        style="z-index: 3"
        :class="isActive ? 'elevation-5 transition-swing' : ''"
        max-width="21rem"
      >
        <v-card-text>
          <v-text-field
            @focus="isActive = true"
            solo
            dense
            flat
            class="display-1 text--primary"
            placeholder="Tschutta!"
            v-model="dialectWord"
            required
            hint="Füge hier das Stichwort / spannende Wort, das du angeben möchtest ein."
          ></v-text-field>
          <span>Beschreibung:</span>
          <span style="height: 1rem;display: inline-block;" class="text-body-2">
            

            <v-text-field
              @focus="isActive = true"
              style="max-width:200px"
              solo
              flat
              dense
              ref="standarddeutsche Entsprechung"
              placeholder="Fußball spielen"
              v-model="word"
            ></v-text-field>
          </span>
          <p>
            Varietät:
            <v-text-field
              @focus="isActive = true"
              solo
              flat
              dense
              style="display: inline-block"
              placeholder="vorarlbergerisch"
              v-model="dialect"
            ></v-text-field>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-icon>mdi-thumb-up-outline</v-icon>

          <v-spacer></v-spacer>
          <v-icon>mdi-heart-outline</v-icon>

          <v-fab-transition>
            <v-btn
              v-if="isActive && !!this.dialectWord && !!this.word"
              color="primary"
              dark
              absolute
              bottom
              right
              fab
              @click="save"
            >
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-actions>
        <v-snackbar
          v-model="snackbarSuccessful"
          :timeout="2000"
          color="success"
          top
        >
          Wort hinzugefügt!
        </v-snackbar>
      </v-card>
    </v-fade-transition>
    <v-overlay :value="isActive" :z-index="2"></v-overlay>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    word: "",
    dialectWord: "",
    dialect: "",
    snackbarSuccessful: false,
    dialectWordActive: false,
    wordActive: false,
    variatyActive: false,
    isActive: false,
  }),
  methods: {
    checklength(object) {
      if (object.value.length == 0) {
        object.value = "Text einfügen";
      }
    },
    clickoutside() {
      this.isActive = false;
    },
    save() {
      axios
        .post("lexeme/", {
          dialectWord: this.dialectWord,
          word: this.word,
        })
        .then((response) => {
          this.$router.push("/lexeme/" + response.data.lexeme);
          this.snackbarSuccessful = true;
        });
    },
  },
  // computed:{
  //   isActive(){
  //     return this.dialectWordActive || this.descriptionActive ||this.variatyActive

  //     }
  // },
};
</script>
