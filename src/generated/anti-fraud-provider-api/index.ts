import type { VtexHttpClient } from '../../core/http.js'
import type { Success, SendAntifraudDataRequest, MiniCart, Buyer, Address, Shipping, Item, ListRegistry, Payment, Details, SendAntifraudData, Responses, UpdateAntifraudTransactionsoptionalRequest, ApproveAntifraudAnalysisResponse, GetAntifraudStatus, GetPaymentMethodsSupported, _1RetrieveTokenRequest, _1RetrieveToken, _3GetCredentials } from './types.js'

class AntiFraudProviderApi_antiFraudFlow {
  constructor(private http: VtexHttpClient) {}

  sendAntifraudPreAnalysisData(params: {
  body: SendAntifraudDataRequest
}): Promise<SendAntifraudData> {
    return this.http.request<SendAntifraudData>({ method: 'POST', path: `/pre-analysis`, body: params.body })
  }

  sendAntifraudData(params: {
  body: SendAntifraudDataRequest
}): Promise<SendAntifraudData> {
    return this.http.request<SendAntifraudData>({ method: 'POST', path: `/transactions`, body: params.body })
  }

  updateAntifraudTransactionsOptional(params: {
  transactionId: string | number
  body: UpdateAntifraudTransactionsoptionalRequest
}): Promise<ApproveAntifraudAnalysisResponse> {
    return this.http.request<ApproveAntifraudAnalysisResponse>({ method: 'PUT', path: `/transactions/${params.transactionId}`, body: params.body })
  }

  manifest(params: Record<string, never>): Promise<Success> {
    return this.http.request<Success>({ method: 'GET', path: `/manifest` })
  }

  getAntifraudStatus(params: {
  'transactions.id': string | number
}): Promise<GetAntifraudStatus> {
    return this.http.request<GetAntifraudStatus>({ method: 'GET', path: `/transactions/${params['transactions.id']}` })
  }

  stopAntifraudAnalysisOptional(params: {
  'transactions.Id': string
}): Promise<GetPaymentMethodsSupported[]> {
    return this.http.request<GetPaymentMethodsSupported[]>({ method: 'DELETE', path: `/transactions/${params['transactions.Id']}` })
  }
}
class AntiFraudProviderApi_oAuthFlow {
  constructor(private http: VtexHttpClient) {}

  _1RetrieveToken(params: {
  body: _1RetrieveTokenRequest
}): Promise<_1RetrieveToken> {
    return this.http.request<_1RetrieveToken>({ method: 'POST', path: `/authorization/token`, body: params.body })
  }

  _2Redirect(params: {
  token: string
  applicationId: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/redirect`, query: { 'token': params.token, 'applicationId': params.applicationId } })
  }

  _3ReturntoVTEX(params: {
  providerAuthorizationCode: string
}): Promise<unknown> {
    return this.http.request<unknown>({ method: 'GET', path: `/authorizationCode`, query: { 'providerAuthorizationCode': params.providerAuthorizationCode } })
  }

  _4GetCredentials(params: {
  authorizationCode: string
  applicationId: string
}): Promise<_3GetCredentials> {
    return this.http.request<_3GetCredentials>({ method: 'GET', path: `/authorization/credentials`, query: { 'authorizationCode': params.authorizationCode, 'applicationId': params.applicationId } })
  }
}

export class AntiFraudProviderApi {
  readonly antiFraudFlow: AntiFraudProviderApi_antiFraudFlow
  readonly oAuthFlow: AntiFraudProviderApi_oAuthFlow
  constructor(http: VtexHttpClient) {
    this.antiFraudFlow = new AntiFraudProviderApi_antiFraudFlow(http)
    this.oAuthFlow = new AntiFraudProviderApi_oAuthFlow(http)
  }
}
