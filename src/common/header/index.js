import React , {Component} from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {actionCreators} from './store';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    Addition,
    Button,
    NavSearch,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoList,
    SearchInfoSwitch,
    SearchInfoItem
} from './style';



class Header extends Component {
    
    getListArea = ()=> {
        const {focused,list, page,handOnMouseEnter,handOnMouseLeave,mouseIn,hangleChangePage,totalPage} = this.props;
        const pageList = [];
        const newList = list.toJS();
        //这里AJAX获取列表数据是异步的，一开始的list是空的，要等获取数据后才执行下面
        if(newList.length) {
            for (let index = (page-1)*10; index < page*10; index++) {
                console.log(index);
                pageList.push(
                    <SearchInfoItem key={newList[index]}>{newList[index]}</SearchInfoItem>
                )
                
            }
        }
 
        if(focused || mouseIn) {
            return (
                <SearchInfo 
                    onMouseEnter={handOnMouseEnter}
                    onMouseLeave={handOnMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={()=>hangleChangePage(page,totalPage)}>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {
                          pageList
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        }
            else {
                return null;
            }
        }

    render() {
        const {focused,handleInputFocus,handleInputBlur} = this.props;
        return (
            <HeaderWrapper>
            < Logo href='/' />
            <Nav>
                <NavItem className="left active">首页</NavItem>
                <NavItem className="left">下载APP</NavItem>
                <NavItem className="right">登陆</NavItem>
                <NavItem className="right">
                    <i className="iconfont">&#xe636;</i>
                </NavItem>
                <SearchWrapper>
                    <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                        <NavSearch
                            className={focused ? 'focused': ''}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className="iconfont">&#xe614;</i>
                    {this.getListArea()}
                </SearchWrapper>
                
            </Nav>
            <Addition>
            <Button className="writting">
                <i className="iconfont">&#xe615;</i>
                写文章
            </Button>
                <Button className="reg">注册</Button>
                
            </Addition>
    </HeaderWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // focused: state.get("header").get('focused')
        focused: state.getIn(['header','focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header','mouseIn']),
        totalPage: state.getIn(['header','totalPage'])
    }
}

const mapDispathToProps = (dispatch) => {
    return {
         handleInputFocus() {
             //注意推荐数据是获取焦点后才会发送AJAX请求，所以上面的要判断一下数据空
             dispatch(actionCreators.getList());
             dispatch(actionCreators.searchFocus());
         },
         handleInputBlur() {
             dispatch(actionCreators.searchBlur());
         },
         handOnMouseEnter() {
            dispatch(actionCreators.mouseEnter());
         },
         handOnMouseLeave() {
             dispatch(actionCreators.mouseLeave());
         },
         hangleChangePage(page,totalPage) {
             if(page<totalPage) {
                 dispatch(actionCreators.changePage(page+1));
             }else {
                dispatch(actionCreators.changePage(1));
             }
             
         }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);