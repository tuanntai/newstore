import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, patchApi, postApi } from '../../utils/apiHelper'
import { TERM_POLICY_API_URL } from '../apiUrls'
import { ITermPolicy, ITermPolicyPost } from './interface'

export const getTermApi = async () => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getTerm)
  return data
}

export const getTermByIdApi = async (id: number) => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getTermById(id))
  return data
}

export const getPolicyByIdApi = async (id: number) => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getPolicyById(id))
  return data
}

export const postTermApi = async ({ id, title, description }: ITermPolicyPost) => {
  const data = await postApi<ITermPolicyPost, ITermPolicy | IDataError>(
    TERM_POLICY_API_URL.postTerm,
    { id, title, description }
  )
  return data
}

export const postPolicyApi = async ({ id, title, description }: ITermPolicyPost) => {
  const data = await postApi<ITermPolicyPost, ITermPolicy | IDataError>(
    TERM_POLICY_API_URL.postPolicy,
    { id, title, description }
  )
  return data
}

export const editTermApi = async ({ id, title, description }: ITermPolicy) => {
  const data = await patchApi<ITermPolicy, number | IDataError>(
    TERM_POLICY_API_URL.getTermById(id),
    { id, title, description }
  )
  return data
}

export const editPolicyApi = async ({ id, title, description }: ITermPolicy) => {
  const data = await patchApi<ITermPolicy, number | IDataError>(
    TERM_POLICY_API_URL.getPolicyById(id),
    { id, title, description }
  )
  return data
}

export const deleteTermApi = async (id: number) => {
  const data = await deleteApi<number>(TERM_POLICY_API_URL.getTermById(id))
  return data
}

export const deletePolicyApi = async (id: number) => {
  const data = await deleteApi<number>(TERM_POLICY_API_URL.getTermById(id))
  return data
}
