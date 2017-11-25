import IntlMessageFormat from 'intl-messageformat';

import zh from './locale/zh';
import en from './locale/en';

let MESSAGES 	= { en, zh };
let LOCALE 		= 'en';

class Intl {

	get(key, defaultMessage, options) {
		
		let msg = MESSAGES[LOCALE][key];
			if (msg == null) {
				if (defaultMessage != null) {
				return defaultMessage;
			}
			return key;
		}
		if (options) {
			msg = new IntlMessageFormat(msg, LOCALE);
			return msg.format(options);
		}
		return msg;
	}

}

let IntlMessage = new Intl;


export default IntlMessage;
