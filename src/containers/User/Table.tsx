/**
 * 用户列表
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { Table as AntTable, message } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { changePagination } from '@actions/user'
import { IUser, IState } from '../../types/user'

interface IProps extends TableProps<IUser> {
  error: any
}

interface IActionProps {
  changePagination: typeof changePagination
}

interface IStateMapper {
  user: IState
}

const columns: Array<ColumnProps<IUser>> = [{
  key: '_rank',
  title: '排名',
  width: 150,
  render: (text: string, record, index: number) => index + 1
}, {
  key: 'username',
  dataIndex: 'login',
  title: '用户',
  render: (text: string, record) => {
    return (
      <a href={record.html_url} target="_blank">{text}</a>
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

const mapStateToProps = ({user}: IStateMapper): IProps => ({
  dataSource: user.list,
  pagination: {
    total: user.pagination.total,
    current: user.pagination.page,
    pageSize: user.pagination.pageSize
  },
  loading: user.isSilentLoading ? false : user.loading.fetch,
  error: user.error.fetch
})

const mapDispatchToProps = (dispatch): IActionProps => ({
  changePagination: (pagination) => {
    return dispatch(changePagination(pagination))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
