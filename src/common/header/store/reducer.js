import * as constants from './constants'
import  {fromJS} from "immutable";

//immutable对象
const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1

});

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.SEARCH_FOCUS:
            return state.set("focused",true);
        case constants.SEARCH_BLUR:
            return state.set("focused",false);
    //注意list是immutable类型，我们也需要把action.data类型变成immutable类型
        case constants.CHANGE_LIST:
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false);
        case constants.CHANGE_PAGE:
            return state.set('page',action.page)
        default:
            return state;
    }
} 