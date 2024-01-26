import axios from "axios";
import Etymology from "@/objects/Etymology";
import Pronunciation from "@/objects/Pronunciation";
import DExample from "@/objects/DExample";
import Category from "@/objects/Category";
import Post from "../objects/Post";


let methods = {
    getCards() {
        return axios.get('cards/')
    },
    postLexeme(lexeme) {
        return axios.post('lexeme/', lexeme)
    },
    postDialect(dialect) {
        return axios.post('dialect/', dialect)
    },
    postEtymologies(etymologies, wordid) {

        etymologies.forEach((item) => {
            const obj = new Etymology(item.value, wordid);
            axios.post('etymology/', obj)
        })
    },
    postPronunciations(pronunciations, wordid) {

        pronunciations.forEach((item) => {
            const obj = new Pronunciation(item.value, wordid);
            axios.post('pronunciation/', obj)
        })
    },
    postExamples(examples, wordid) {
        examples.forEach((item) => {
            const obj = new DExample(item.value, wordid);
            axios.post('example/', obj)
        })
    },
    searchLexemesByWord(word) {
        return axios.get('lexemes_simple/?search=' + word)
    },
    searchDialects(dialect) {
        return axios.get('dialects/?search=' + dialect)
    },
    getFirsLexemeByName(word) {
        return axios.get('lexeme_by_word/' + word + '/')
    },
    searchCategories(category) {
        return axios.get('categories/?search=' + category)
    },
    createDialect(dialect) {
        return axios.post('dialect/', dialect)
    },
    addCategoriesWithLexeme(categories, lexemeId) {
        categories.forEach((item) => {
            const obj = new Category(item.category);
            axios.post('category/' + lexemeId + '/', obj)
        })


    },
    login(login) {
        return axios.post('account/login/', login)
    },
    register(register) {
        return axios.post('account/register/', register)
    },
    createCollection(collection) {
        return axios.post('collection/', collection)
    },
    getCollections() {
        return axios.get('collections/')
    },
    addLexemeToCollection(collectionId, lexemeId) {
        return axios.put('collection/' + collectionId + '/' + lexemeId + '/')
    },
    getCollection(collectionId) {
        return axios.get('collection/' + collectionId + '/')
    },
    getLexeme(lexemeId) {
        return axios.get('lexeme/' + lexemeId + '/')
    },
    createGroup(group) {
        return axios.post('group/', group)
    },
    createGroupSettings(members_createCollection,
                        members_add_remove_lexeme,
                        public_createCollection,
                        public_add_remove_lexemes) {
        return axios.post('group/settings/', {
                'members_createCollection': members_createCollection,
                'members_add_remove_lexeme': members_add_remove_lexeme,
                'public_createCollection': public_createCollection,
                'public_add_remove_lexemes': public_add_remove_lexemes,

            }
        )

    },
    getMyGroups() {
        return axios.get('groups/')
    }
    ,
    getGroup(groupId) {
        return axios.get('group/' + groupId + '/')
    }
    ,
    addMemberToGroup(groupId, userId) {
        return axios.put('group/' + groupId + '/' + userId + '/')
    }
    ,
    addGroupToCollection(collectionId, groupId) {
        return axios.put('collection/group/' + collectionId + '/' + groupId + '/')
    }
    ,
    getUsersByUsername(username) {
        return axios.get('account/users/' + username + '/')
    }
    ,
    getCollectionsByOwner() {
        return axios.get('collections/owner/')
    } ,
    getPublicGroups() {
        return axios.get('groups/public/')
    }
    ,
    getCardsCreated() {
        return axios.get('own_cards/')
    }
    ,
    getPosts() {
        return axios.get('posts/?page_size=50')
    }
    ,
    getOwnPosts() {
        return axios.get('ownposts/')
    }
    ,
    getPostsByLexemeId(lexemeId) {
        return axios.get('posts/lexeme/' + lexemeId + '/')
    }
    ,
    createPost(text, parent, lexeme) {
        const post = new Post(text, parent, lexeme)
        return axios.post('post/', post)
    }
    ,
    getPost(id) {
        return axios.get('post/' + id + '/')
    }
    ,
    getLexemes(page, search) {
        return axios.get('/lexemes/?page=' + page + '&search=' + search)
    }
    ,
    getInvite(groupId) {
        return axios.get('/invite/' + groupId + '/')
    }
    ,
    joinGroup(groupId, hash) {
        return axios.get('/join/' + groupId + '/' + hash + '/')
    }
    ,
    getGroupNameByInvite(groupId, hash) {
        return axios.get('/groupname/' + groupId + '/' + hash + '/')
    }
    ,
    getGroupsWithCollections(lexemeId) {
        return axios.get('/collectionsbygroups/' + lexemeId + '/')
    }
    ,
    getLexemesRandom() {
        return axios.get('/lexemes/random/')
    }
    ,

    createLocation(zipcode, place, state) {
        return axios.post('/location/', {'zipcode': zipcode, 'place': place, 'state': state})

    }
    ,
    addLexemeToFavorite(lexemeId) {
        return axios.put('/favorite/' + lexemeId + '/')
    }
    ,
    removeLexemeFromFavorite(lexemeId) {
        return axios.delete('/favorite/' + lexemeId + '/')
    }
    ,
    getHome() {
        return axios.get('/home/')
    }
    ,
    updateAccount(data) {
        return axios.put('/account/update/', data)
    }
    ,
    updatePassword(param) {
        return axios.put('/account/newpassword/', param)

    }
    ,
    getPostsFiltered(search) {
        return axios.get('/posts/?search=' + search)

    }
}

export default methods