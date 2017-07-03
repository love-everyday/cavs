import { HOME_SELECTEDINDEX, HOME_UPDATEFILMS, HOME_RESIZE } from '../actions/types';


let index = window.localStorage.getItem('selectedIndex');
index = index ? Number(index) : 1
const initialState = {
	selectedIndex: index,
}
export default function converter(state = initialState, action) {
	switch (action.type) {
		case HOME_SELECTEDINDEX:
			window.localStorage.setItem('selectedIndex', action.info);
			return {
				...state,
				selectedIndex: action.info,
			};
		case HOME_UPDATEFILMS:
			return {
				...state,
				filmList: action.info,
			}
		case HOME_RESIZE:
			return {
				...state,
				screenType: action.info,
			}
		default:
			return state
	}
}
