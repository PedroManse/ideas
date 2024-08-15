// left: number
// right: number
// opts: {left, right, width, height}
// opts.left,right: {color, title}
function makeRatioBar(left, right, opts) {
	const total = left+right;
	const lprct = (left/total*100).toString()+"%";
	const rprct = (right/total*100).toString()+"%";
	const lratio = El("div", {
		class: "ratio-left",
		title: opts?.left?.title??left,
		style: {
			"width": lprct,
			"height": "100%",
			"background-color": opts?.left?.color??"green",
		}
	});
	const rratio = El("div", {
		class: "ratio-right",
		title: opts?.right?.title??right,
		style: {
			"width": rprct,
			"height": "100%",
			"background-color": opts?.right?.color??"red",
		}
	});
	return El("div", [lratio, rratio], {
		class: "ratio",
		style: {
			"height": opts?.height??"10px",
			"width": opts?.width??"50px",
			"display": "flex",
		}
	});
}

//<ratio height="" width="">
//	<left title="" color="">30</left>
//	/
//	<right title="" color="">70</right>
//</ratio>
function replaceRatioBarFromHTML(ratio) {
	const height = ratio.getAttribute("height")
	const width = ratio.getAttribute("width")
	const leftEl = $("left", ratio)
	const rightEl = $("right", ratio)
	const lvalue = parseFloat(leftEl.innerText);
	const rvalue = parseFloat(rightEl.innerText);
	const lopts = {
		color: leftEl.getAttribute("color"),
		title: leftEl.getAttribute("title")
	}
	const ropts = {
		color: rightEl.getAttribute("color"),
		title: rightEl.getAttribute("title")
	}
	const opts = {
		height, width, left: lopts, right: ropts
	};
	const newRatio = makeRatioBar(lvalue, rvalue, opts);
	ratio.replaceWith(newRatio)
	return newRatio;
}

function replaceAllRatioBars() {
	return $$("ratio").map(replaceRatioBarFromHTML)
}

window.onload = replaceAllRatioBars
