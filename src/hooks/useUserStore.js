import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set, get) => ({
            currentUser:null,
            login:(user)=> {
                set({currentUser: user})
            },
            logout:()=>{
                set({currentUser:null})
            } 
        }),
        {
            name:'user-storage'
        }
    )
)

// const useUserStore = create(set=> ({
//     login: (user) => {
//         set(()=> {
//             localStorage.setItem('currentUser', JSON.stringify(user))
//         })
//     },
//     logout: () => {
//         set(()=> {
//             localStorage.setItem('currentUser',null)
//         })
//     },
//     getUser: () => {
//         if(localStorage.getItem('currentUser') && localStorage.getItem('currentUser') !== 'null' && localStorage.getItem('currentUser') !== null) {
//             console.log('JSON PARSE')
//             console.log(localStorage.getItem('currentUser'))
//             return jsonParse(localStorage.getItem('currentUser'));
//         } 
//         return null;
//     }
// }))

export default useUserStore;