/**
 * 用户模块
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { polling, stopPolling } from '@actions/user'
import Table from './Table'
import ActionPanel from './ActionPanel'

interface IActionProps {
  polling: typeof polling,
  stopPolling: typeof stopPolling
}

class User extends React.Component<IActionProps> {
  componentDidMount() {
    this.props.polling()
 }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  render() {
    return (
      <>
        <ActionPanel />
        <Table />
      </>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  polling: () => dispatch(polling()),
  stopPolling: () => dispatch(stopPolling())
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
