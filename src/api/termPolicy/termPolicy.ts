import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, patchApi, postApi } from '../../utils/apiHelper'
import { TERM_POLICY_API_URL } from '../apiUrls'
import { ITermPolicy, ITermPolicyPost } from './interface'

export const getTermApi = async () => {
  const data = await getApi<ITermPolicy>(TERM_POLICY_API_URL.getTerm)
  return data
}

export const getTermByIdApi = async (id: number) => {
  const data = await getApi<ITermPolicy>(TERM_POLICY_API_URL.getTermById(id))
  return data
}

export const getPolicyByIdApi = async (id: number) => {
  const data = await getApi<ITermPolicy>(TERM_POLICY_API_URL.getPolicyById(id))
  return data
}

export const getPolicyApi = async () => {
  const data = await getApi<ITermPolicy>(TERM_POLICY_API_URL.getPolicy)
  return data
}

export const postTermApi = async ({ id, title, content }: ITermPolicyPost) => {
  const data = await postApi<ITermPolicyPost, ITermPolicy | IDataError>(
    TERM_POLICY_API_URL.getTerm,
    { id, title, content }
  )
  return data
}

export const getTermListApi = async () => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getTermList)
  return data
}

export const getPolicyListApi = async () => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getPolicies)
  return data
}

export const postPolicyApi = async ({ id, title, content }: ITermPolicyPost) => {
  const data = await postApi<ITermPolicyPost, ITermPolicy | IDataError>(
    TERM_POLICY_API_URL.getPolicy,
    { id, title, content }
  )
  return data
}

export const editTermApi = async (id: number, editedData: any) => {
  const data = await patchApi(TERM_POLICY_API_URL.getTermById(id), editedData)
  return data
}

export const editPolicyApi = async (id: number, editedData: any) => {
  const data = await patchApi(TERM_POLICY_API_URL.getPolicyById(id), editedData)
  return data
}

export const deleteTermApi = async (id: number) => {
  const data = await deleteApi<IDataError>(TERM_POLICY_API_URL.getTermById(id))
  return data
}

export const deletePolicyApi = async (id: number) => {
  const data = await deleteApi<IDataError>(TERM_POLICY_API_URL.getPolicyById(id))
  return data
}
