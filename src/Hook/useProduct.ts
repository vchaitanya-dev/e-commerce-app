import {create} from 'zustand';
import {devtools,persist} from 'zustand/middleware';
import {DocumentData} from "firebase/firestore"

export interface SingleProductState {
    singleProduct:DocumentData,
    setSingleProduct: (singleProduct:[]) => void;
    productId:string,
    setProductId:(productId:string) => void;
}
 const useProductStore = create<SingleProductState>()(
devtools(persist((set) =>({
   singleProduct:[],
   setSingleProduct: (payload:DocumentData) => set((state) => ({
    ...state.singleProduct = payload
})),
   productId:"",
   setProductId:(productId:string) => set({productId:productId})
})    
, {name:"productstore"})
));
export default useProductStore;