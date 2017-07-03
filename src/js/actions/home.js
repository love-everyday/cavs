import { HOME_SELECTEDINDEX, HOME_UPDATEFILMS, HOME_RESIZE } from './types';

import Films from '../app/home/images'
// const crypto = require('crypto');

export function homeListSelectedIndex(index: number) {
	return {
		type: HOME_SELECTEDINDEX,
		info: index,
	}
}
export function windowResize(type: number) {
	return {
		type: HOME_RESIZE,
		info: type,
	}
}

export function homeGradListHttpInfo(index) {
	return (dispatch) => {
		const filmList = Films[index - 1]
		if (filmList) {
			dispatch({type: HOME_UPDATEFILMS, info: filmList})
		}
	}
}
/*
const params = [
	{
		'Body': '{"AreaIds":"-1","Type":10,"KindIds":"-1","PubYear":"-1","PageSize":15,"PageIndex":1}',
		// 'Sign': "NnG18IfkRof2B9ITkA3YlkTUSWs="
	},
	{
		'Body': '{"AreaIds":"3","Type":10,"KindIds":"-1","PubYear":"-1","PageSize":15,"PageIndex":1}',
		// 'Sign': "49owsYJTTGfVUROIKbcyxDWVCyk="
	},
	{
		'Body': '{"AreaIds":"9","Type":10,"KindIds":"-1","PubYear":"-1","PageSize":15,"PageIndex":1}',
		// 'Sign': "OLbRN0/GBI4GQzERo+oFL2yGvx4="
	},
	{
		'Body': '{"AreaIds":"13","Type":10,"KindIds":"-1","PubYear":"-1","PageSize":15,"PageIndex":1}',
		// 'Sign': "3hI1mv8t4J5yAmSSVTzwEpht1V0="
	},
	{
		'Body': '{"AreaIds":"19","Type":10,"KindIds":"-1","PubYear":"-1","PageSize":15,"PageIndex":1}',
		// 'Sign': "YBPpG6fUCIdl3FCw0KMOTI51LLA="
	}
]
 // 尝试使用sha1来加密数据
export function homeGradListHttpInfo(index) {
	return (dispatch) => {
		const param = params[index - 1]
		param['Method'] = 'KanPian.Service.Contract.IApplicationService.GetProgramListV2';
		param['AppKey'] = '16031014';
		param['Format'] = 'json';
		param['SessionKey'] = '';
		param['Version'] = '';
		const str = 'AppKey=' + param['AppKey'] + '&Body=' + param['Body'] + '&Format=' + param['Format'] + '&Method=' + param['Method'];
		const sign = crypto.createHmac('sha1', '1b10c93e5c144be2b1fdddc93081d7eb');
		sign.update(str)
		const xiwen = sign.digest().toString('base64');
		param['Sign'] = xiwen
		console.log(param);
		let formData = new FormData()
		formData.append('Method', param['Method'])
		formData.append('AppKey', param['AppKey'])
		formData.append('Format', param['Format'])
		formData.append('SessionKey', param['SessionKey'])
		formData.append('Version', param['Version'])
		formData.append('Body', param['Body'])
		formData.append('Sign', param['Sign'])
	    fetch('http://api.piseneasy.com/Router/Rest/Post', {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      'Body': formData,
	    })
	    .then((response) => response.json())
	    .then((responseJSON) => {
			console.log(responseJSON);
	    })
	    .catch((error) => {
	      console.error(error);
	    })
	}
}
*/
