export type UpdateDeadlineRequest = {
  description: string
  max: string
  min: string
}

export type UpdateDeadlineResponse = {
  order?: {
  currentDeadline?: {
  max?: string
  min?: string
}
  deadlineChanges?: {
  current?: boolean
  description?: string
  handled?: boolean
  max?: string
  min?: string
  oldDates?: {
  max?: string
  min?: string
}
  updatedAt?: string
}[]
  orderId?: string
}
  success?: boolean
}
