"use server"

interface IEventParams {
    title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
}

export const createNewEvent = async(eventData:IEventParams)=>{
    console.log(eventData);
    
}