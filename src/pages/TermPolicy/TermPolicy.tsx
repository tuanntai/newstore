import { PlusOutlined } from '@ant-design/icons'
import { t } from '@lingui/macro'
import { Button, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ETermPolicyStatus, ITermPolicy } from '../../api/termPolicy/interface'
import ListTable from '../../component/ListTable/ListTable'
import {
  deletePolicy,
  deleteTerm,
  getPolicy,
  getTerm
} from '../../redux/actions/termPolicy/termPolicy'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import {
  setEditInfo,
  setTermPolicyId,
  termPolicySelector
} from '../../redux/reducer/termPolicy/termPolicyReduces'
import './TermPolicy.less'

const TermPolicy: React.FC = () => {
  let navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const dispatch = useAppDispatch()
  const termList = useAppSelector(termPolicySelector.termListSelector)
  const policyList = useAppSelector(termPolicySelector.policyListSelector)
  const termPolicyId = useAppSelector(termPolicySelector.termPolicyIdSelector)
  const [type, setType] = useState('')

  const handleDelete = (id: number, type: string) => {
    dispatch(setTermPolicyId(id))
    setType(type)
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const deleteItem = (id: number) => {
    if (type === 'Term') {
      dispatch(deleteTerm(id))
      dispatch(getTerm())
    } else if (type === 'Policy') {
      dispatch(deletePolicy(id))
      dispatch(getPolicy())
    }
    setShowModal(!showModal)
  }

  const handleEdit = (record: ITermPolicy, type: string) => {
    dispatch(setTermPolicyId(record.id))
    dispatch(
      setEditInfo({
        id: record.id,
        title: record.title,
        content: record.content,
        type: type
      })
    )
    navigate(`edit-term-policy/${record.id}`)
  }
  const column = [
    {
      title: t`ID`,
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: string) => <div key={text}>{text}</div>
    },
    {
      title: t`Title`,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '150px',
      render: (text: string, record: ITermPolicy) => (
        <div className="button-box">
          <Button
            className="edit-button"
            type="primary"
            onClick={() => handleEdit(record, ETermPolicyStatus.TERM)}
          >
            Edit
          </Button>
          <Button className="delete-button" onClick={() => handleDelete(record.id, 'Term')}>
            Delete
          </Button>
        </div>
      )
    }
  ]

  const policyColumn = [
    {
      title: t`ID`,
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: string) => <div key={text}>{text}</div>
    },
    {
      title: t`Title`,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '150px',
      render: (text: string, record: ITermPolicy) => (
        <div className="button-box">
          <Button
            className="edit-button"
            type="primary"
            onClick={() => handleEdit(record, ETermPolicyStatus.POLICY)}
          >
            Edit
          </Button>
          <Button className="delete-button" onClick={() => handleDelete(record.id, 'Policy')}>
            Delete
          </Button>
        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(setCurrentPage('Term Policy'))
    dispatch(getTerm())
    dispatch(getPolicy())
  }, [])

  return (
    <div className="termPolicy-wrapper">
      <div className="heading">
        <Typography className="heading-title">Term</Typography>
        <Link to="create-termPolicy">
          <Button type="primary" icon={<PlusOutlined />}>
            Create Term
          </Button>
        </Link>
      </div>
      <ListTable
        title="List Of Terms"
        dataSource={[termList]}
        pagination={false}
        columns={column}
        scroll={{ x: 'auto' }}
      />
      <br />
      <div className="heading">
        <Typography className="heading-title">Policy</Typography>
        <Link to="create-termPolicy">
          <Button type="primary" icon={<PlusOutlined />}>
            Create Policy
          </Button>
        </Link>
      </div>
      <ListTable
        title="List Of Policy"
        dataSource={[policyList]}
        pagination={false}
        columns={policyColumn}
        scroll={{ x: 'auto' }}
      />
      {/* Delete Modal */}
      <Modal
        title={`Delete`}
        visible={showModal}
        onOk={() => deleteItem(termPolicyId)}
        onCancel={handleCancel}
      
        cancelText="Cancel"
        okText="Delete"
      >
        Are you sure ?
      </Modal>
      {/* Edit Modal */}
    </div>
  )
}

export default TermPolicy
