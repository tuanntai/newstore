import { PlusOutlined } from '@ant-design/icons'
import { t } from '@lingui/macro'
import { Button, Modal, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListTable from '../../component/ListTable/ListTable'
import { getPolicy, getTerm } from '../../redux/actions/termPolicy/termPolicy'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { termPolicySelector } from '../../redux/reducer/termPolicy/termPolicyReduces'
import './TermPolicy.less'

const TermPolicy: React.FC = () => {
  const dispatch = useAppDispatch()
  const termList = useAppSelector(termPolicySelector.termListSelector)
  const policyList = useAppSelector(termPolicySelector.policyListSelector)
  console.log(policyList);
  
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
      title: t`Content`,
      dataIndex: 'content',
      key: 'content',
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
          <Button type="primary" icon={<PlusOutlined />} >
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
        <Button type="primary" icon={<PlusOutlined />} >
          Create Policy
        </Button>
        </Link>
      </div>
      <ListTable
        title="List Of Policy"
        dataSource={[policyList]}
        pagination={false}
        columns={column}
        scroll={{ x: 'auto' }}
      />
    </div>
  )
}

export default TermPolicy
