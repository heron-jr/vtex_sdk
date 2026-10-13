import type { VtexHttpClient } from '../../core/http.js'
import type { CallOptions } from '../../core/types.js'
import { encodePathParam, withCall } from '../../core/call.js'
import type { SaveReviewRequest, SaveMultipleReviewsRequest } from './types.js'

class ReviewsAndRatingsApi_rating {
  constructor(private http: VtexHttpClient) {}

  async getProductRating(params: {
  productId: string
}, opts?: CallOptions): Promise<{
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
}>(withCall({ method: 'GET', path: `/reviews-and-ratings/api/rating/${encodePathParam(params.productId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }
}
class ReviewsAndRatingsApi_review {
  constructor(private http: VtexHttpClient) {}

  async getReviewbyReviewId(params: {
  reviewId: string
}, opts?: CallOptions): Promise<{
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
}>(withCall({ method: 'GET', path: `/reviews-and-ratings/api/review/${encodePathParam(params.reviewId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async editReview(params: {
  reviewId: string
  body: {
  productId: string
  rating: number
  title: string
  text: string
  reviewerName: string
  shopperId?: string
  verifiedPurchaser?: boolean
  locale?: string | null
}
}, opts?: CallOptions): Promise<{
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
}>(withCall({ method: 'PATCH', path: `/reviews-and-ratings/api/review/${encodePathParam(params.reviewId)}`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteReview(params: {
  reviewId: string
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'DELETE', path: `/reviews-and-ratings/api/review/${encodePathParam(params.reviewId)}`, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async getalistofReviews(params: {
  search_term?: string
  from?: string
  to?: string
  order_by?: string
  status?: boolean
  product_id?: string
} = {}, opts?: CallOptions): Promise<{
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
}[]
  range?: {
  total?: number
  from?: number
  to?: number
}
}>(withCall({ method: 'GET', path: `/reviews-and-ratings/api/reviews`, query: { 'search_term': params.search_term, 'from': params.from, 'to': params.to, 'order_by': params.order_by, 'status': params.status, 'product_id': params.product_id }, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async saveMultipleReviews(params: {
  body: SaveMultipleReviewsRequest[]
}, opts?: CallOptions): Promise<string[]> {
    return this.http.request<string[]>(withCall({ method: 'POST', path: `/reviews-and-ratings/api/reviews`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async deleteMultipleReviews(params: {
  body: string[]
}, opts?: CallOptions): Promise<boolean> {
    return this.http.request<boolean>(withCall({ method: 'DELETE', path: `/reviews-and-ratings/api/reviews`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
  }

  async saveReview(params: {
  body: SaveReviewRequest
}, opts?: CallOptions): Promise<{
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
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
  sku?: string | null
  approved?: boolean
  location?: string | null
  locale?: string | null
  pastReviews?: string | null
}>(withCall({ method: 'POST', path: `/reviews-and-ratings/api/review`, body: params.body, server: 'https://{accountName}.myvtex.com' }, opts))
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
