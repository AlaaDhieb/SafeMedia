import React, { useEffect } from "react";
import { createRootStore } from "./stores";
import persist from "mst-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importer AsyncStorage

const StoreContext = React.createContext<
    ReturnType<typeof createRootStore> | undefined
>(undefined);

export const RootStoreProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const root = createRootStore();
    
    useEffect(() => {
        persist("root", root, {
            storage: AsyncStorage, // Utiliser AsyncStorage pour persister les données
        }).then(() => {
            root.setIsRestored(true); // Marquer le store comme restauré
        });
    }, []);

    return (
        <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
    );
};

export const useRootStore = () => {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
};
