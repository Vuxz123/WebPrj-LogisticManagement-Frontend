import React from 'react';
import {Layout, Menu} from 'antd';

const { Header, Sider, Content } = Layout;

//import the staff_features.json file
const staffFeatures = require('./staff_feature.json');

class StaffFrame extends React.Component {
    state = {
        role: 'admin', // this is just an example, you should get the current user's role from backend
        selectedAction: '',
    };

    constructor({role, props}) {
        super(props);
        if(role !== undefined) {
            this.state.role = role;
        }
        this.getMenuContent(this.state.role, this.handleMenuClick);

    }

    getMenuContent(role, handleMenuClick) {
        // Render menu items based on role
        if(staffFeatures[role] !== undefined) {
            let features = staffFeatures[role];
            let menuItems = features.map((feature) => {
                return (
                    <Menu.Item key={feature.key} onClick={handleMenuClick}>
                        {feature.name}
                    </Menu.Item>
                );
            });
            this.menuItems = menuItems;
            this.firstkey = features[0].key;
            this.state.selectedAction = this.firstkey;
        }
    }

    handleMenuClick = (e) => {
        this.setState({ selectedAction: e.key });
    };
    handleLogout() {

    }

    renderActionContent() {
        switch (this.state.selectedAction) {
            case 'dashboard':
                return <div>Dashboard content...</div>;
            case 'settings':
                return <div>Settings content...</div>;
            // add more cases as your needs...
            default:
                return <div>Select a function...</div>;
        }
    }

    render() {
        const { role } = this.state;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
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
                            style={{ height: '100vh', borderRight: 0 }}
                        >
                            {this.menuItems}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
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