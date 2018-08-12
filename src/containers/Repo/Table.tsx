/**
 * repo 列表
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { Table as AntTable, message } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { changePagination } from '@actions/repo'
import { IRepo, IState } from '../../types/repo'

interface IProps extends TableProps<IRepo> {
  error: any
}

interface IActionProps {
  changePagination: typeof changePagination
}

interface IStateMapper {
  repo: IState
}

const columns: Array<ColumnProps<IRepo>> = [{
  key: '_rank',
  title: '排名',
  width: 150,
  render: (text: string, record: IRepo, index: number) => index + 1
}, {
  key: 'name',
  title: 'Repo',
  dataIndex: 'name',
  render: (text: string, record: IRepo) => {
    return (
      <a href={record.homepage || record.html_url} target="_blank">{text}</a>
    )
  }
}]
const Table: React.SFC<IProps & IActionProps> = (props) => {
  const { dataSource, pagination, loading, changePagination, error } = props

  if (error) {
    message.error(error)
  }

  const handleTableChange = (pagination: PaginationProps) => {
    changePagination({
      page: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  return (
    <AntTable
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
      size="small"
      rowKey="id"
      bordered
    />
  )
}

const mapStateToProps = ({repo}: IStateMapper): IProps => ({
  dataSource: repo.list,
  pagination: {
    total: repo.pagination.total,
    current: repo.pagination.page,
    pageSize: repo.pagination.pageSize
  },
  loading: repo.isSilentLoading ? false : repo.loading.fetch,
  error: repo.error.fetch
})

const mapDispatchToProps = (dispatch): IActionProps => ({
  changePagination: (pagination) => {
    return dispatch(changePagination(pagination))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
