import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

interface CartState {
    carts: CartItem[];
};

interface CartActions {
    getTotalItems: () => number;
    getTotalPrice: () => number;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
};

const initialState: CartState = {
    carts: [],
};

const useCartStore = create<CartState & CartActions>()(
    persist(
        immer(
            (set,get) => ({
                ...initialState,
                getTotalItems: () => {
                    return get().carts.reduce((total, item) => total + item.quantity, 0);
                },
                getTotalPrice: () => {
                    return get().carts.reduce((total, item) => total + (item.price * item.quantity), 0);
                },
                addItem: (item) => set((state) => {
                    console.log("item",item);
                    const existingItem = state.carts.find(cartItem => cartItem.id === item.id);
                    if (existingItem) {
                        existingItem.quantity += item.quantity || 1;
                    } else {
                        state.carts.push({ ...item, quantity: item.quantity || 1 });
                    }
                }),
                removeItem: (id) => set((state) => {
                    state.carts = state.carts.filter(item => item.id !== id);
                }),
                updateQuantity: (id, quantity) => set((state) => {
                    const item = state.carts.find(cartItem => cartItem.id === id);
                    if (item) {
                        item.quantity = quantity;
                    }
                }),
                clearCart: () => set(initialState),
            })
        ),
        {
            name: "cart-storage", // key for local storage
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useCartStore;