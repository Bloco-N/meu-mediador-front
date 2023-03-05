import { createContext } from "react";
import {UserContextType} from "../types/UserContextType";

const UserContext = createContext<UserContextType | null>(null)

export default UserContext