import {atom} from "recoil"


export const usernameAtom = atom({
    key: "usernameAtom", 
    default: ""
})
export const passwordAtom = atom({
    key: "passwordAtom", 
    default: ""
})
export const messageAtom = atom({
    key: "messageAtom",
    default : ""
})
export const successAtom = atom({
    key: "successAtom",
    default : true
})
export const userAuthenticatedAtom = atom({
    key: "useAuthenticatedAtom",
    default : false,
})
export const adminAuthenticatedAtom = atom({
    key: "adminAuthenticatedAtom",
    default : false,
})

export const projectsAtom = atom({
    key: "projectsAtom",
    default : [],
})

export const sellerDataAtom = atom({
    key: 'sellerDataAtom',
    default: []
})

export const addPropertyAtom = atom({
    key: 'addPropertyAtom',
    default: {
        title: '',
        location: '',
        city: '',
        price : 0,
        bhk: 0,
        image: '',
        date: '',
        sizes: '',
        startDate: ''
        
    }
})