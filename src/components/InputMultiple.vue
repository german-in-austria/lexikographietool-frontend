<template>
  <div>
    <div
        v-for="(item, i) in items"
        :key="i"
        class="text-fields-row"
    >
      <v-text-field
          solo
          v-if="ipa"
          v-rt-ipa="true"
          flat
          :label="label"
          v-model="item.value"
          @input="$emit('input',items)"

      >
        <template v-slot:append>
          <v-fab-transition group>
          <v-icon key="1" v-if="i == items.length-1 && !!item.value" @click="addLine">mdi-plus</v-icon>
          <v-icon key=2 v-if="!!item.value || i != 0" @click="remove(i)">mdi-delete</v-icon>
          </v-fab-transition>
          <slot name='append'></slot>
        </template>
       <template v-slot:append-outer v-if="i==0"></template>

      </v-text-field>
       <v-text-field
          solo
          v-else
          flat
          :label="label"
          v-model="item.value"
          @input="$emit('input',items)"

      >
        <template v-slot:append>
          <v-fab-transition group>
          <v-icon key="1" v-if="i == items.length-1 && !!item.value" @click="addLine">mdi-plus</v-icon>
          <v-icon key=2 v-if="!!item.value || i != 0" @click="remove(i)">mdi-delete</v-icon>
          </v-fab-transition>
          <slot name='append'></slot>
        </template>
       <template v-slot:append-outer v-if="i==0"></template>

      </v-text-field>

    </div>
  </div>
</template>

<script>


export default {
  name: "InputMultiple",
  props: ['value', 'label','ipa'],
  data: () => ({
    text: null,
    asdf: [''],
    // items: ['']
  }),
  methods: {
    addLine() {
      this.value.push({value:''})
    },
    remove(index) {
      this.items.splice(index, 1)
    },
  },
    watch: {
    value(){
      // this.items = [{value:this.value}]
    }
    },
  computed: {
    items(){
      if (this.value.length=== 0)
        return [{value:''}]
      return this.value
    }

  },
  mounted() {
    // this.value =[{value:''}]
  }

}
</script>

<style scoped>
.text-fields-row {
  display: flex;
}
</style>