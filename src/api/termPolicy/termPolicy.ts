import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, patchApi, postApi } from '../../utils/apiHelper'
import { TERM_POLICY_API_URL } from '../apiUrls'
import { ITermPolicy, ITermPolicyPost } from './interface'

export const getTermApi = async () => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getTerm)
  return data
}

export const getPolicyApi = async () => {
  const data = await getApi<ITermPolicy[]>(TERM_POLICY_API_URL.getPolicy)
  return data
}

export const postTermApi = async ({ id, title, content }: ITermPolicyPost) => {
  const data = await postApi<ITermPolicyPost, ITermPolicy | IDataError>(
    TERM_POLICY_API_URL.createTerm,
    { id, title, content }
  )
  return data
}

export const postPolicyApi = async ({ id, title, content }: ITermPolicyPost) => {
  const data = await postApi<ITermPolicyPost, ITermPolicy | IDataError>(
    TERM_POLICY_API_URL.createPolicy,
    { id, title, content }
  )
  return data
}

export const editTermApi = async (id: number, editedData: any) => {
  const data = await patchApi(TERM_POLICY_API_URL.updateTerm(id), editedData)
  return data
}


export const editPolicyApi = async (id: number, editedData: any) => {
  const data = await patchApi(TERM_POLICY_API_URL.updatePolicy(id), editedData)
  return data
}

export const deleteTermApi = async (id: number) => {
  const data = await deleteApi<IDataError>(TERM_POLICY_API_URL.removeTerm(id))
  return data
}

export const deletePolicyApi = async (id: number) => {
  const data = await deleteApi<IDataError>(TERM_POLICY_API_URL.removePolicy(id))
  return data
}
