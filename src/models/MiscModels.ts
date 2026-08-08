
export interface FactResponse{
    title:string;
    fact:string;
    category:string
}

export type FactState=  | {status :"Idle"}
    | {status :"Loading" }
    | {status : "Success" , data:FactResponse}
    | {status : "Error" , message:string}

