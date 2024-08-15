const $ = (qry, doc=document) => doc.querySelector(qry)
const $$ = (qry, doc=document) => Array.from(doc.querySelectorAll(qry))

function El(name, value="", attributes=null) {
	if (typeof (value) == "object" && !Array.isArray(value)) {
			[value, attributes] = [attributes, value];
			if (value === null) value = "";
		}
	const el = document.createElement(name);
	for (const attr in attributes) {
			if (attr === "style") {
					const stlyAtrs = Object.keys(attributes.style);
					for (const stl of stlyAtrs) {
							el.style[stl]  = attributes.style[stl];
							}
				} else {
						el.setAttribute(attr, attributes[attr]);
						}
		}
	if (typeof(value) === "string") {
			el.innerText = value;
		} else if (Array.isArray(value)) {
				value.forEach( el.appendChild.bind(el) )
			}
	return el;
}


