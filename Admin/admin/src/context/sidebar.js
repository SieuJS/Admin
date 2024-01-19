import { createContext } from "react";

export const SideBarContext = createContext (
    {
        isShow : true,
        toggle : () => (this.isShow = !this.isShow)
    }
)