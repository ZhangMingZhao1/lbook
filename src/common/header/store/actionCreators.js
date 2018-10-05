import * as constants from './constants'
import axios from 'axios';
import {fromJS} from 'immutable';

const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data)
})

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
})

//redux-thunk允许action返回的是一个函数了
export const getList = ()=> {
    return (dispatch) => {
        axios.get('/api/headerList.json').then( (res)=>{
            const data = res.data;
            dispatch(changeList(data.data));
        } ).catch(()=> {
            console.log('error');
        })
    }
}