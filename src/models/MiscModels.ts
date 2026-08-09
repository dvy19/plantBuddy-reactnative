
export interface FactResponse{
    title:string;
    fact:string;
    category:string
}

export type FactState=  | {status :"Idle"}
    | {status :"Loading" }
    | {status : "Success" , data:FactResponse}
    | {status : "Error" , message:string}

export interface FaqRequest{
    question_id:number,
    plant_id:number
}

export interface FaqResponse{
    cache:boolean,
    data:FaqData
}

export interface FaqData{
    plant_name:string,
    quesiton_title:string,
    answer:string,
    updated_at:string

}


/*

data class FaqData(
    var plant_name:String,
    var question_title:String,
    var answer:String,
    var updated_at:String
)
*/