import {create} from 'zustand';
import {devtools,persist} from 'zustand/middleware';
import {DocumentData} from 'firebase/firestore';
interface CartState {
    cart:DocumentData,
    setCart: (payload:DocumentData) => void
}
const useCartStore = create<CartState>()(
    devtools(persist(
        (set) => ({
        cart:[],
        setCart:(payload:DocumentData) => set((state) => ({
            ...state.cart = payload
        }))
    }),{name:"cartStore"}))
)
 export default useCartStore;