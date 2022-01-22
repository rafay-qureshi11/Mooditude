// user for firestore
export type User = {
    activatedRemindersAtStartup: boolean,
    comittedToSelfhelp: boolean
    customerType: string
    freshChatRestoreID: string
    goingToTherapy: boolean
    knowCbt: boolean
    memberSince: Date
    name: string
    stats: stats
    topChallenges: string[]
    topGoal: string,
    photo:string
}

export type stats = {
    checksCount: number
    crownsCount: number
    starCount: number
}

//user for real time database
export type user = {
    activatedRemindersAtStartup: boolean
    customerType: string
    email: string
    expiryDate: Date
    goingToTherapy: boolean
    grantAwardee: boolean
    knowCbt: boolean
    name: string
    paymentStatus: string
    paymentType: string
    topGoal: string
}