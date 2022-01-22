
export type DepressionQuestions = {
    feelSad: number,
    cantConcentrate: number,
    nothingSeemsPleasure: number,
    feelTried: number,
    thoughtsSuicide: number,
    difficultySleeping: number,
    sleepToMuch: number,
    lostAppetite: number,
    eatingMore: number,
    riskScoringDepression: number,
    likeliHoodDepression: string
}

export type PTSDQuestions = {
    nightmares: number,
    feelStartled: number,
    avoidPlaces: number,
    feelDull: number,
    riskScoringPTSD: number,
    likeliHoodPTSD: string
}

export type AnxietyQuestions = {
    feelTense: number,
    feelWorried: number,
    attacksofAnxiety: number,
    worryDying: number,
    socialSituations: number,
    PTSDQuestions: PTSDQuestions
    cantGetThoughtsOutofMind: number,
    repeatCertainActs: number,
    needToCheckAndRecheck: number,
    riskScoringAnxiety: number,
    likeliHoodAnxiety: string
}

export type BipolarDisorderQustions = {
    moreEnergy: number,
    feltIrritable: number,
    feltExcited: number,
    neededLessSleep: number,
    riskScoringBipolarDisorder: number,
    likeliHoodBipolarDisorder: string
}

export type FunctionalImpairmentQuestions = {
    interferesWithWork: number,
    affectsRelationships: number,
    hasLedToUsingAlcohol: number,
    hasLedToUsingOtherSubstances: number,
    riskScoringFunctionalImpairment: number,
    likeliHoodFunctionalImpairment: string
}

export type MentalHealth = {
    age: string,
    gender: string,
    sexualOrientation: string,
    maritalStatus: string,
    raceIdentity: string,
    employment: string,
    depressionQuestions: DepressionQuestions,
    anxietyQuestions: AnxietyQuestions,
    bipolarDisorderQustions: BipolarDisorderQustions,
    functionalImpairmentQuestions: FunctionalImpairmentQuestions,
    riskScoringMentalHealth: number,
    likeliHoodMentalHealth: string
};