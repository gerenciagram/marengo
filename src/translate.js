import { isArray, isObj, isString, isFunction, replace } from 'cbo317110-helper'

const str = function(word, data, lang, langs, str = '', event) {
	lang = this['(MA)'].language.current
	langs = this['(MA)'].language.package
	if (langs[lang][word]) {
		str = langs[lang][word]
		if (!data || !isObj(data)) {
			return str
		} else {
			for (let key in data) {
				if (!isArray(data[key])) {
					str = str.replace(`{${key}}`, data[key])
				}
				if (isString(data[key][1])) {
					str = str.replace(`{${key}}`, `<a href="${data[key][1]}">${data[key][0]}</a>`)
				}
				if (isFunction(data[key][1])) {
					event = `${this['(MA)'].event.prefix}${replace(replace(word, '.', '_'), ' ', '_')}_${key}`
					str = str.replace(`{${key}}`, `<span id="${event}">${data[key][0]}</span>`)
					this['(MA)'].event.collection[event] = data[key][1]
				}
			}
			return str
		}
	}
	return word
}

const events = (ref) => {
	for (let event in ref['(MA)'].event.collection) {
		if (document.querySelector(`#${event}`)) {
			document.querySelector(`#${event}`).onclick = ref['(MA)'].event.collection[event]
		}
	}
} 

export default {
	str, 
	events
}