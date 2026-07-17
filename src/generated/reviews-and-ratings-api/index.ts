import type { VtexHttpClient } from '../../core/http.js'
import type { SaveReviewRequest, SaveMultipleReviewsRequest } from './types.js'

class ReviewsAndRatingsApi_rating {
  constructor(private http: VtexHttpClient) {}

  getProductRating(params: {
  productId: string
}): Promise<{
  average?: number
  totalCount?: number
  starsFive?: number
  starsFour?: number
  starsThree?: number
  starsTwo?: number
  starsOne?: number
}> {
    return this.http.request<{
  average?: number
  totalCount?: number
  starsFive?: number
  starsFour?: number
  starsThree?: number
  starsTwo?: number
  starsOne?: number
}>({ method: 'GET', path: `/reviews-and-ratings/api/rating/${params.productId}` })
  }
}
class ReviewsAndRatingsApi_review {
  constructor(private http: VtexHttpClient) {}

  getReviewbyReviewId(params: {
  reviewId: string
}): Promise<{
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}> {
    return this.http.request<{
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}>({ method: 'GET', path: `/reviews-and-ratings/api/review/${params.reviewId}` })
  }

  editReview(params: {
  reviewId: string
  body: {
  productId: string
  rating: number
  title: string
  text: string
  reviewerName: string
  shopperId?: string
  verifiedPurchaser?: boolean
  locale?: string
}
}): Promise<{
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}> {
    return this.http.request<{
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}>({ method: 'PATCH', path: `/reviews-and-ratings/api/review/${params.reviewId}`, body: params.body })
  }

  deleteReview(params: {
  reviewId: string
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'DELETE', path: `/reviews-and-ratings/api/review/${params.reviewId}` })
  }

  getalistofReviews(params: {
  search_term?: string
  from?: string
  to?: string
  order_by?: string
  status?: boolean
  product_id?: string
}): Promise<{
  data?: {
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}[]
  range?: {
  total?: number
  from?: number
  to?: number
}
}> {
    return this.http.request<{
  data?: {
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}[]
  range?: {
  total?: number
  from?: number
  to?: number
}
}>({ method: 'GET', path: `/reviews-and-ratings/api/reviews`, query: { 'search_term': params.search_term, 'from': params.from, 'to': params.to, 'order_by': params.order_by, 'status': params.status, 'product_id': params.product_id } })
  }

  saveMultipleReviews(params: {
  body: SaveMultipleReviewsRequest[]
}): Promise<string[]> {
    return this.http.request<string[]>({ method: 'POST', path: `/reviews-and-ratings/api/reviews`, body: params.body })
  }

  deleteMultipleReviews(params: {
  body: string[]
}): Promise<boolean> {
    return this.http.request<boolean>({ method: 'DELETE', path: `/reviews-and-ratings/api/reviews`, body: params.body })
  }

  saveReview(params: {
  body: SaveReviewRequest
}): Promise<{
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}> {
    return this.http.request<{
  id?: string
  productId?: string
  rating?: number
  title?: string
  text?: string
  reviewerName?: string
  shopperId?: string
  reviewDateTime?: string
  searchDate?: string
  verifiedPurchaser?: boolean
  sku?: string
  approved?: boolean
  location?: string
  locale?: string
  pastReviews?: string
}>({ method: 'POST', path: `/reviews-and-ratings/api/review`, body: params.body })
  }
}

export class ReviewsAndRatingsApi {
  readonly rating: ReviewsAndRatingsApi_rating
  readonly review: ReviewsAndRatingsApi_review
  constructor(http: VtexHttpClient) {
    this.rating = new ReviewsAndRatingsApi_rating(http)
    this.review = new ReviewsAndRatingsApi_review(http)
  }
}
