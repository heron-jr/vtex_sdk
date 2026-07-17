export type SaveReviewRequest = {
  productId: string
  rating: number
  title: string
  text: string
  reviewerName: string
  approved: boolean
}

export type SaveMultipleReviewsRequest = {
  id?: string
  productId: string
  rating: number
  title: string
  text: string
  reviewerName: string
  approved: boolean
}
