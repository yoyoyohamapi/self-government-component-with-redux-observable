/**
 * 操作栏位
 * @author 消珥
 * @ignore created 2018-07-18 19:07:25
 */
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Row, Col, Select, Input } from 'antd'
import { IState } from '../../types/repo'
import { changeQuery, changeSort } from '@actions/repo'

interface IProps extends DispatchProp {
  sort: string
}

interface IActionProps {
  changeQuery: typeof changeQuery,
  changeSort: typeof changeSort
}

interface IStateMapper {
  repo: IState
}

const Option = Select.Option
const Search = Input.Search

const ORDER_LIST = [{
  text: '按 star 数目排序',
  value: 'stars'
}, {
  text: '按 fork 数目排序',
  value: 'forks'
}]

const ActionPanel: React.SFC<IProps & IActionProps> = (props) => {
  const { sort, changeQuery, changeSort } = props

  return (
    <Row
      gutter={20}
      type="flex"
      align="middle"
      justify="end"
      style={{marginBottom: 24}}
    >
        <Col>
          <Select value={sort} onChange={changeSort}>
            {ORDER_LIST.map((option) => {
              return <Option key={option.value} value={option.value}>{option.text}</Option>
            })}
          </Select>
        </Col>
        <Col>
          <Search
            placeholder="search repos..."
            onSearch={changeQuery}
            style={{height: 32}}
            enterButton
          />
        </Col>
    </Row>
  )
}

const mapStateToProps = ({repo}: IStateMapper) => ({
  sort: repo.sort,
})

const mapDispatchToProps = (dispatch): IActionProps => ({
  changeQuery: (query) => dispatch(changeQuery(query)),
  changeSort: (sort) => dispatch(changeSort(sort)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionPanel)
