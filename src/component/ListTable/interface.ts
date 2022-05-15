import { TablePaginationConfig } from 'antd'

export interface IListTable {
  title: string
  dataSource: any[]
  columns: any[]
  scroll?: any
  pagination: false | TablePaginationConfig | undefined
}
