

interface IUser {
        id:number,
        name: string,     
        address: string,
        phone: string,
        country?: string | undefined,
        city?: string | undefined,
        credentialID:number
}

export default IUser