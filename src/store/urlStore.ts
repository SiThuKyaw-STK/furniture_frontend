
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
    url: string | null;
};

const initialState: State = {
    url: null,
};

type Actions = {
    setUrl: (url: string) => void;
    clearUrl: () => void;
};

const useUrlStore = create<State & Actions>()(
    persist(
        immer(
            (set) => ({
                ...initialState,
                setUrl: (url) => set((state) => {
                    state.url = url;
                }),
                clearUrl: () => set(initialState),
            })
        ),
        {
            name: "url-credentials",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export default useUrlStore;