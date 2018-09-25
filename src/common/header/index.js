import React, { Component } from 'react';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    Addition,
    Button,
    NavSearch,
} from './style';

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                < Logo href='/' />
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载APP</NavItem>
                    <NavItem className="right">登陆</NavItem>
                    <NavItem className="right">Aa</NavItem>
                    <NavSearch></NavSearch>
                </Nav>
                <Addition>
                    <Button className="reg">注册</Button>
                    <Button className="writting">写文章</Button>
                </Addition>
            </HeaderWrapper>

        )
    }
}

export default Header;