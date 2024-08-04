import {create} from 'zustand';
import {devtools,persist} from 'zustand/middleware';
import {DocumentData} from 'firebase/firestore';
interface DataState {
    products:DocumentData,
    allProducts: (payload:DocumentData) => void
}
const useDataStore = create<DataState>()(
    devtools(persist(
        (set) => ({
        products:[],
        allProducts:(payload:DocumentData) => set((state) => ({
            ...state.products = payload
        }))
    }),{name:"DataStore"}))
)
 export default useDataStore;
