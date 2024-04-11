import { ReactNode } from "react";

interface IRenderConditional {
    isTrue:boolean;
    children:any
}

export default function RenderConditional({ isTrue,children }:IRenderConditional){
    return isTrue ? children : null;
}