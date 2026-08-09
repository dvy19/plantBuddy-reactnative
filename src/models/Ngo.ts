
export interface NgoDetailResponse{
    message:string,
    data:NgoDetailsData
}

export interface NgoDetailsData{
    id:number,
    name:string,
    description:string,
    address:string,
    phone_number:string,
    website:string,
    city:string,
    logo:any | null,
    created_at:string,
    updated_at:String,
    user:number
}

export interface AllNgoResponse{
    message:string,
    data:NgoDetailsData[]
}

export interface NgoDetailsForm {
  name: string;
  description: string;
  address: string;
  phone_number: string;
  website: string;
  city: string;
  logo?: {
    uri: string;
    name: string;
    type: string;
  } | null;
}

/*

data class NgoDetailsResponse(

    val message: String,
    val data: NgoDetailsData
)

data class AllNgoResponse(

    var message: String,
    var data:List<NgoDetailsData>
)

data class NgoDetailsData(
    val id: Int,
    val name: String,
    val description: String,
    val address: String,
    val phone_number: String,
    val website: String,
    val city: String,
    val logo: Any?,
    val created_at: String,
    val updated_at: String,
    val user: Int
)
*/