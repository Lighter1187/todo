import React from 'react';
import { Layout, Menu, Icon, Avatar, Divider } from 'antd';
import Link from 'umi/link'

const { Sider } = Layout;
const  MenuItem  = Menu.Item;

const siderStyle = {
    backgroundColor: '#acc', 
    height: '100vh'
};
const menuStyle = {
    backgroundColor: '#acc', 
    borderColor: '#acc',
    textAlign:'center'
};
const dividerStyle ={
    margin: '0',
    backgroundColor:'#fff',
};

// 侧边栏组件
class SiderMenu extends React.PureComponent {
    // 用于确定选择了哪个MenuItem
    state = {
        selectedKey: '',
    }
    // 点击时保存选择的MenuItem
    changeItem = (e) => {
        this.setState({
            selectedKey: e.key,
        });
    }

    render() {
        return (
            <Sider width={90} style={siderStyle}>
                <div style={{ height: '90px', padding: '10px 20px 0' }}>
                    <Avatar size={48} icon="user" />
                    <div style={{ fontSize: '12px' }}>我的私事</div>
                </div>
                <Divider style={dividerStyle} />
                <Menu style={menuStyle}
                    selectedKeys={[this.state.selectedKey]}
                    onClick={this.changeItem}>
                    <MenuItem key='task'>
                        <Link to="/task">
                            <Icon type="bars" />
                            <span>任务</span>
                        </Link>
                    </MenuItem>
                    <MenuItem key='note'>
                        <Link to="/note">
                            <Icon type="file-text" />
                            <span>便签</span>
                        </Link>
                    </MenuItem>
                    <MenuItem key='project'>
                        <Link to="/project">
                            <Icon type="folder" />
                            <span>项目</span>
                        </Link>
                    </MenuItem>
                </Menu>
                <div><Divider style={dividerStyle} /></div>
                <Menu style={menuStyle}
                    selectedKeys={[this.state.selectedKey]}
                    onClick={this.changeItem}>
                    <MenuItem key='position'>
                        <Link to="/position">
                            <Icon type="environment" />
                            <span>地点</span>
                        </Link>
                    </MenuItem>
                    <MenuItem key='tag'>
                        <Link to="/tag">
                            <Icon type="tags" />
                            <span>标签</span>
                        </Link>
                    </MenuItem>
                </Menu>
                <div><Divider style={dividerStyle} /></div>
                <Menu style={menuStyle}
                    selectedKeys={[this.state.selectedKey]}
                    onClick={this.changeItem}>
                    <MenuItem key='search'>
                        <Link to="/search">
                            <Icon type="search" />
                        </Link>
                    </MenuItem>
                    <MenuItem key='mail'>
                        <Icon type="mail" />
                    </MenuItem>
                    <MenuItem key='more'>
                        <span>...</span>
                    </MenuItem>
                </Menu>
            </Sider>
        );
    };
}

export default SiderMenu;