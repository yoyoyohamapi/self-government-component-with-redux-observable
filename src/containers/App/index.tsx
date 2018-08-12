/**
 * Github demo
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { ConnectedRouter, RouterState } from 'connected-react-router'
import { Layout, Menu } from 'antd'
import createHistory from 'history/createHashHistory'
import User from '@containers/User'
import Repo from '@containers/Repo'

const history = createHistory()

const { Header, Content, Footer } = Layout

interface IProps {
  path: string
}

interface IStateMapper {
  router: RouterState
}

class App extends React.Component<IProps> {
  render() {
    const { path } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[path]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="/users">
                <Link to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item key="/repos">
                <Link to="/repos">Repos</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{padding: '0 50px', marginTop: 20 }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Route exact path="/" render={() => <Redirect to="/users" />} />
                  <Route path="/users" component={User}/>
                  <Route path="/repos" component={Repo}/>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          使用 redux-observable v1 实现组件自治 Demo
          </Footer>
        </Layout>
      </ConnectedRouter>
   )
  }
}

const mapStateToProps = ({router}: IStateMapper) => ({
  path: router.location.pathname
})

export default connect(mapStateToProps)(App)
