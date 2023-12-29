import React from 'react';
import {Layout, Menu} from 'antd';
import ActionContentProvider from "./ActionContentProvider";
import resolveName from "./StaffNameResolver";
import {ReactNode} from "react";
import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import logout from "./api/logoutApi";
import {toast} from "react-toastify";

const {Header, Sider, Content} = Layout;

class StaffFrame extends React.Component {
    state : {
        role: String,
        selectedAction: String,
    } = {
        role: 'p-c_head', // this is just an example, you should get the current user's role from backend
        selectedAction: 0,
    };

    componentDidMount() {
        const media = window.matchMedia('(max-width: 800px)');
        media.addEventListener('change', this.handleMediaQueryChange);
    }

    componentWillUnmount() {
        const media = window.matchMedia('(max-width: 800px)');
        media.removeEventListener('change', this.handleMediaQueryChange);
    }

    handleMediaQueryChange = () => {
        const media = window.matchMedia('(max-width: 800px)');
        this.setState({
            isSmallScreen: media.matches,
        });
    };

    constructor({role, onLogout, props}) {
        super(props);
        if (role !== undefined) {
            this.state.role = role;
        }
        this.onLogout = () => {
            onLogout();
        };
        this.getMenuContent(this.state.role, this.handleMenuClick);
    }

    getMenuContent(role : String, handleMenuClick : Function) : void {
        this.provider = new ActionContentProvider();
        // Render menu items based on role
        let menuContent = this.provider.getMenuContent(role, handleMenuClick);
        if (menuContent !== null) {
            this.menuItems = menuContent.menuItems;
            this.dropdown = menuContent.dropdown;
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

    temp = () => {
        toast.success("Đăng xuất thành công");
        this.onLogout();
    };

    handleLogout = () => {
        logout().then(this.temp); // Use arrow function for correct `this` binding
    };

    renderActionContent(isSmallScreen) : ReactNode {
        const ActionContent = this.provider.renderActionContent(this.state.role, this.state.selectedAction);
        return <ActionContent small={isSmallScreen}/>;
    }

    render() : ReactNode {
        const {role} = this.state;
        return (
            <Layout>
                <Header className="header" style={{height: "8vh"}}>
                    <Menu theme="dark" mode="horizontal" >
                        {
                            this.state.isSmallScreen ? (
                                <Menu.SubMenu key="dropdown" icon={(<MenuOutlined/>)} defaultSelectedKeys={[this.state.selectedAction]} selectedKeys={[this.state.selectedAction]}>
                                    {this.menuItems}
                                </Menu.SubMenu>
                            ) : null
                        }
                        <div style={{margin: '0 10px 0 10px'}}>Role: {resolveName(role)}</div>
                        <Menu.Item key="3" onClick={this.handleLogout} title="Đăng xuất" icon={<LogoutOutlined/>}>
                            Đăng xuất
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {!this.state.isSmallScreen ? (
                        <Sider width={200} style={{minHeight: "91.5vh"}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[this.state.selectedAction]}
                                selectedKeys={[this.state.selectedAction]}
                                style={{height: "100%", borderRight: 0}}
                            >
                                {this.menuItems}
                            </Menu>
                        </Sider>
                    ) : null}
                    <Layout style={{padding: '10px'}}>
                        <Content
                            style={{
                                padding: '10px',
                                margin: 0,
                                minHeight: 280,
                                background: "white",
                                borderRadius: "5px",
                            }}
                        >
                            {this.renderActionContent(this.state.isSmallScreen)}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default StaffFrame;