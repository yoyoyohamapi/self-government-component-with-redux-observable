import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Select, Input } from 'antd'
import { changeQuery, changeSort, search } from '@actions/user'
import { IState } from '../../types/user'

interface IProps {
  sort: string,
  query: string
}

interface IActionProps {
  changeQuery: typeof changeQuery,
  changeSort: typeof changeSort,
  search: typeof search
}

interface IStateMapper {
  user: IState
}

const Option = Select.Option
const Search = Input.Search

const ORDER_LIST = [{
  text: '按 followers 数目排序',
  value: 'followers',
}, {
  text: '按 repos 数目排序',
  value: 'repositories',
}]

const ActionPanel: React.SFC<IProps & IActionProps> = (props) => {
  const { changeQuery, changeSort, search, sort } = props

  const handleSearch = (query: string) => {
    if (query === props.query) {
      search()
    } else {
      changeQuery(query)
    }
  }

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
            placeholder="search user..."
            onSearch={handleSearch}
            style={{height: 32}}
            enterButton={true}
          />
        </Col>
    </Row>
  )
}

const mapStateToProps = ({user}: IStateMapper): IProps => ({
  sort: user.sort,
  query: user.query
})

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  changeQuery: (query) => dispatch(changeQuery(query)),
  changeSort: (sort) => dispatch(changeSort(sort)),
  search: () => dispatch(search())
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionPanel)
