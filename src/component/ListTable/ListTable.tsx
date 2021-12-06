import React from 'react'
import { Typography, Table } from 'antd'
import { IListTable } from './interface'

const ListTable: React.FC<IListTable> = (props) => {
  return (
    <div className="list-container">
      <Typography className="heading-title">{props.title}</Typography>
      <Table
        bordered
        scroll={props.scroll}
        dataSource={props.dataSource}
        columns={props.columns}
        className="list"
        pagination={props.pagination}
      />
    </div>
  )
}

export default ListTable
