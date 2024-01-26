<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="" >
        <v-row no-gutters class="mb-n2">
          <v-col cols="12" class="text-body-2">{{ $t("searchbar.search") }}</v-col>

          <v-col class="ma-0 pa-0" >
            <v-text-field
                v-if="field.value!=='content__kind__icontains'"
                dense
                v-model="search"
                label="Suche"
                :disabled="field.disabled"
                flat
                solo-inverted

            ></v-text-field>
            <v-select


                dense
                label="Wortart"
                flat
                solo-inverted
                :items="searchSelectItems"
                item-value="value"
                item-text="name"
                v-model="search"
                hide-details
                v-else></v-select>
          </v-col>
          <v-col >
            <v-select


                style="max-width: 150px"
                dense
                label="Suche nach"
                :items="selectItems"
                v-model="field"
                :return-object="true"
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
            ></v-select>
          </v-col>
          <v-col class="hidden-xs-only">
            <v-btn

                @click="addToFilter"
                :disabled="field.disabled || !search"
                color="primary"
                height="37px"

            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col
          cols="12" sm=""


      >
        <v-row no-gutters>
          <v-col cols="12" class="text-body-2 pa-0 ma-0 ">{{ $t("searchbar.orderby") }}</v-col>

          <v-col>
            <v-select

                dense
                label="Sortieren nach"
                :items="orderItems"
                v-model="orderBy"
                :return-object="true"
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-sort-variant"
                style="max-width: 10rem;"
            ></v-select>
          </v-col>
          <v-col>
            <v-btn-toggle color="primary"
                          dense v-model="sortDesc" mandatory>
              <v-tooltip bottom max-width="20vh">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-on="on" v-bind="attrs" depressed :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                </template>
                {{ $t("searchbar.ascending") }}
              </v-tooltip>
              <v-tooltip bottom max-width="20vh">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-on="on" v-bind="attrs" depressed :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </template>
                {{ $t("searchbar.descending") }}
              </v-tooltip>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-col
      >
      <v-col cols="12">
      <v-row no-gutters >
        <v-chip
            v-for="(filter, index) in filters"
            :key="index"

            close
            small
            label
            @click:close="removeFromFilters(index)"
        >
          {{ filter.field.text }} : {{ filter.value }}
        </v-chip>
      </v-row>
      </v-col>
    </v-row>

  </div>
</template>
<script>
export default {
  name: "SearchBar",
  data: function () {
    return {
      show: false,
      selectItems: [
        {text: "alle Kategorien", value: "search", disabled: false},
        {text: this.$t("card.lemma"), value:  "content__dialectWord__icontains", disabled: false},
        {text: this.$t("card.lexeme"), value:  "content__word__icontains", disabled: false},
        {text: this.$t("card.meaning"), value: "content__description__icontains", disabled: false},
        {text: this.$t("card.category"), value: "content__categories__category__icontains", disabled: false},
        {text: this.$t("card.variety"), value: "content__variety__icontains", disabled: false},
        {text: this.$t("card.kind"), value: "content__kind__icontains", disabled: false},

        // { text: this.$t("card.kind"), value: "kind", disabled: false },
      ],
      orderItems: [
        {text: this.$t("card.lemma"), value: "content__dialectWord"},
        {text: this.$t("card.lexeme"), value: "content__word"},
        {text: this.$t("searchbar.created_at"), value: "date_created"},
      ],
      filters: [],
      field: {text: "alle Kategorien", value: "search", disabled: false},
      search: "",
      sortDesc: true,
      orderBy: {text: this.$t("searchbar.created_at"), value: "date_created"},

      kindItems: [
        {
          id: 1,
          name: this.$t("createWord.noun"),
          value: "N",
          tooltip: this.$t("createWord.noun"),
        },
        {
          id: 2,
          name: this.$t("createWord.verb"),
          value: "V",
          tooltip: this.$t("createWord.verbTooltip"),

        },
        {
          id: 3,
          name: this.$t("createWord.adjective"),
          value: "Aj",
          tooltip: this.$t("createWord.adjectiveTooltip"),

        },
        {
          id: 4,
          name: this.$t("createWord.adverb"),
          value: "Av",
          tooltip: this.$t("createWord.adverbTooltip"),

        },
        {
          id: 5,
          name: this.$t("createWord.interjection"),
          value: 'I',
          tooltip: this.$t("createWord.interjectionTooltip"),

        },
        {
          id: 6,
          name: this.$t("createWord.phrase"),
          value: "P",
          tooltip: this.$t("createWord.phraseTooltip"),
        },
      ],

    }
  },
  mounted() {
    //check if params are passed
    if (this.$route.params.search) {
      this.search = this.$route.params.search
    }
    this.$emit("searchBarHeight",this.searchBarHeight+"px")

  },
  methods: {
    addToFilter() {
      const index = this.selectItems.findIndex(
          (x) => x.value === this.field.value
      );
      this.selectItems[index].disabled = true;
      this.field.disabled = true;
      this.filters.push({field: this.field, value: this.search});
    },
    removeFromFilters(index) {
      const ind = this.selectItems.findIndex(
          (x) => x.value === this.filters[index].field.value
      );
      this.selectItems[ind].disabled = false;
      this.field.disabled = false;

      this.filters.splice(index, 1);
    },
  },
  watch: {
    requestString() {
      this.$emit("input", this.requestString);
    },
    searchBarHeight(){
      this.$emit("searchBarHeight",this.searchBarHeight+"px")

    }

  },
  computed: {
    orderingString() {
      if (this.sortDesc) return "ordering=-" + this.orderBy.value;
      return "ordering=" + this.orderBy.value;
    },
    requestString() {
      var requestString = "";
      //Add all saved filters to string
      if (this.filters.length !== 0)
        this.filters.forEach((item) => {
          requestString +=
             item.field.value + "=" + item.value + "&";
        });
      //add current search to filters
      if (!this.field.disabled)
        requestString =
            requestString +
            this.field.value +
            "=" +
            this.search +
            "&";

      //add ordering
      requestString += this.orderingString;
      return requestString;
    },
    searchSelectItems() {
      return this.kindItems
    },
    searchBarHeight(){
      var height = 0
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          height =180;
          break;

        case "sm":
          height =110;
          break;


        case "md":
          height =100;
          break;

        default:
          height =80
          break;

      }
      if (this.filters.length >= 1)
        height +=20;
      return height
    }
  },
};
</script>

<style>

</style>