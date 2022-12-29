export interface Part {
  id: number,
  concept: string,
  total: number,
  excluded: number[]
}

export interface Participant {
  id: number,
  name: string,
  parts: Part[]
}
