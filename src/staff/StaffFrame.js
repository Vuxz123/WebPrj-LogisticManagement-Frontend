import React from 'react';
import {Layout, Menu} from 'antd';
import ActionContentProvider from "./ActionContentProvider";
import {ReactNode} from "react";

const {Header, Sider, Content} = Layout;

class StaffFrame extends React.Component {
    state : {
        role: String,
        selectedAction: String,
    } = {
        role: 'admin', // this is just an example, you should get the current user's role from backend
        selectedAction: '',
    };

    constructor({role, props}) {
        super(props);
        if (role !== undefined) {
            this.state.role = role;
        }
        this.getMenuContent(this.state.role, this.handleMenuClick);
    }

    getMenuContent(role : String, handleMenuClick : Function) : void {
        this.provider = new ActionContentProvider();
        // Render menu items based on role
        let menuContent = this.provider.getMenuContent(role, handleMenuClick);
        if (menuContent !== null) {
            this.menuItems = menuContent.menuItems;
            this.firstkey = menuContent.firstKey;
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.selectedAction = this.firstkey;
            this.renderActionContent();
        }
    }

    handleMenuClick = (e) : void => {
        if(this.state.selectedAction === e.key) return;
        this.setState({selectedAction: e.key});
        this.renderActionContent();
    };

    handleLogout() {

    }

    renderActionContent() : ReactNode {
        const ActionContent = this.provider.renderActionContent(this.state.role, this.state.selectedAction);
        return <ActionContent/>;
    }

    render() : ReactNode {
        const {role} = this.state;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark" mode="horizontal"
                        style={{float: 'right'}}
                    >
                        <div style={{width: 'fit-content'}}>Role: {role}</div>
                        <Menu.Item key="3" onClick={this.handleLogout}>
                            Đăng xuất
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[this.firstkey]}
                            style={{height: '100vh', borderRight: 0}}
                        >
                            {this.menuItems}
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '24px 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 1,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.renderActionContent()}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default StaffFrame;