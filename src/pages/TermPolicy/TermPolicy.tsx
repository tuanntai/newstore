import { PlusOutlined } from '@ant-design/icons'
import { t } from '@lingui/macro'
import { Button, Modal, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListTable from '../../component/ListTable/ListTable'
import { getTerm } from '../../redux/actions/termPolicy/termPolicy'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { termPolicySelector } from '../../redux/reducer/termPolicy/termPolicyReduces'
import './TermPolicy.less'

const TermPolicy: React.FC = () => {
  const dispatch = useAppDispatch()
  const termList = useAppSelector(termPolicySelector.termListSelector)
  const policyList = useAppSelector(termPolicySelector.policyListSelector)
  const [Terms, setTerms] = useState([
    { name: 'title', value: '' },
    { name: 'description', value: '' }
  ])

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
      key: 'title',
    },
    {
      title: t`Description`,
      dataIndex: 'description',
      key: 'description',
    }
  ]

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isTerm, setIsTerm] = useState(false)

  const showModal = (isTerm: boolean) => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    dispatch(setCurrentPage('Term Policy'))
    dispatch(getTerm())
  }, [])


  return (
    <div className="termPolicy-wrapper">
      <div className="heading">
        <Typography className="heading-title">Term</Typography>
        <Link to="create-termPolicy">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(true)}>
            Create Term
          </Button>
        </Link>
      </div>
      <ListTable
        title="List Of Terms"
        dataSource={termList}
        pagination={false}
        columns={column}
        scroll={{ x: 'auto  ' }}
      />
      <br />
      <div className="heading">
        <Typography className="heading-title">Policy</Typography>
        <Link to="create-termPolicy">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(false)}>
          Create Policy
        </Button>
        </Link>
      </div>
      <ListTable
        title="List Of Policy"
        dataSource={policyList}
        pagination={false}
        columns={column}
        scroll={{ x: 'auto' }}
      />
      <Modal
        title={isTerm ? 'Create Term' : 'Create Policy'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography>{isTerm ? 'Term' : 'Policy'}</Typography>
      </Modal>
    </div>
  )
}

export default TermPolicy
