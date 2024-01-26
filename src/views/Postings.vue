<template>
  <v-container fluid v-scroll='onScroll'>
    <v-row>
      <v-col>
        <p class="text-h3">Fragen</p>
        <p class="text-body-1"> {{ $t("postings.description") }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="12">
            <v-text-field
                dense
                v-model="search"
                :label=' $t("general.search") '
                single-line
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"

            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea outlined class="post-textarea" placeholder="Stell der Community eine Frage!" v-model="newPost"
                        auto-grow

                        rows="6"
                        append-icon="mdi-send"
                        @click:append="createPost"></v-textarea>
          </v-col>
        </v-row>

        <v-scale-transition group class="row">
          <v-col cols="12" sm="6" md="4" v-for="(post,index) in posts" :key="post.id">
            <card-post :post="post" @deleted="removeFromList(index)"></card-post>
          </v-col>
        </v-scale-transition>
      </v-col>


    </v-row>
    <v-row>
      <v-progress-circular
          class="ma-auto"
          v-if="!!loading"
          :size="150"
          indeterminate
      ></v-progress-circular>
      <v-btn v-if="!loading & !!next" class="ma-auto" outlined @click="loadMore">Mehr
        laden
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CardPost from "@/components/CardPost";
import Axios from "axios";
import axios from 'axios';

export default {
  name: "Postings"
  ,
  components: {CardPost},
  data: () => ({
    posts: [],
    myposts: [],
    search: '',
    newPost: '',
    next: null,
    timeout: 0,
    loading: false,
  }),
  async created() {
    this.loading = true
    axios.get('posts/?ordering=-date_created').then((response) => {
      this.posts = response.data.results
      this.next = response.data.links.next
    }).finally(() => this.loading = false)
    //RequestHandler.getOwnPosts().then((response) => (this.myposts = response.data));
  }
  ,
  watch: {
    search: function () {
      clearTimeout(this.timeout);

      let self = this;
      this.timeout = setTimeout(function () {

        this.loading = true
        axios.get('posts/?ordering=-date_created&search=' + self.search).then((response) => {
          self.posts = response.data.results
          self.next = response.data.links.next
        }).finally(() => this.loading = false)
      }, 500);

    }
  }
  ,
  methods: {
    createPost() {
      Axios.post('post/', {text: this.newPost}).then(response => {
        response.data.is_author = true

        this.posts.unshift(response.data)
        this.newPost = ''
      })
    }
    ,
    removeFromList(index) {
      this.posts.splice(index, 1);
    }
    ,
    onScroll(e) {
      if (
          e.target.scrollingElement.scrollTop + 1000 >
          document.body.scrollHeight &&
          !!this.next
      ) {
        const next = this.next
        this.next = null;
        this.loading = true
        Axios.get(next).then((response) => {
          this.posts = this.posts.concat(response.data.results);
          this.next = response.data.links.next
        }).finally(() => this.loading = false);
      }
    },
    loadMore() {
      this.loading=true;
      Axios.get(this.next).then((response) => {
        this.posts = this.posts.concat(response.data.results);
        this.next = response.data.links.next
      }).finally(()=>this.loading=false);
    }
  }
}
</script>

<style>
.post-textarea {
  max-height: 250px;
  overflow-y: auto;
}

p {
  text-align: left !important;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}
</style>