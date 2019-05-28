import React from 'react';
import { Layout, Menu, Divider } from 'antd';
import SiderMenu from '@/components/SiderMenu/SiderMenu';

const { Content } = Layout;

class BaseLayout extends React.PureComponent {

    render() {
        const { children } = this.props;

        return (
            <div>
                <Layout>
                    <SiderMenu />
                    <Layout>
                        <Content>{children}</Content>
                    </Layout>
                </Layout>
            </div>
        );
    };
}

export default BaseLayout;

