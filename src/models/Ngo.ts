
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



export interface  AllCampaignResponse {
     message: string,
     data: Campaign[]
}

export interface SingleCampaignResponse{
     message: string,
     data: Campaign
}



export interface CampaignForm{
    title:string,
    description:string,
    location:string,
    required_volunteers: number | string,
    start_date: string,
    end_date: string,
    goal_amount: string,
    is_active: Boolean,

    logo?: {
    uri: string;
    name: string;
    type: string;
    } | null;
}

export interface Campaign{
     id: number,
     title: String,
     description: String,
     location: String,
     current_volunteers: number,
     required_volunteers: number,
     logo: string | null,
     goal_amount: string,
     current_amount: string,
     start_date: string,
     end_date: string,
     is_active: Boolean,
     created_at: string,
     updated_at: string,
     ngo: number
}




/*
response to get own active campaign

matches SingleCampaignResponse
{
    "message": "Campaigns retrieved successfully",
    "data": [
        {
            "id": 5,
            "title": "Faldaar",
            "description": "Planting campaigns all over the kanpur and nearby",
            "location": "Kanpur, shivrajpur, kanpur dehat",
            "current_volunteers": 0,
            "required_volunteers": 50,
            "logo": null,
            "goal_amount": "10000.00",
            "current_amount": "0.00",
            "start_date": "2005-12-12",
            "end_date": "2005-12-23",
            "is_active": true,
            "created_at": "2026-08-12T10:01:53.867040Z",
            "updated_at": "2026-08-12T10:01:53.867049Z",
            "ngo": 20
        }
    ]
}
*/




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