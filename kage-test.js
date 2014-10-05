var fs = require('fs');
var paper = require('paper');

paper.setup(new paper.Canvas(800, 800));

fs.readFile('01.svg', {encoding: 'utf-8'}, function (error, data) {
	paper.project.importSVG(data);
	var layer = paper.project.activeLayer;
	var rootObject = layer.firstChild;
	rootObject.children.forEach(function (child) {
		if (child.name === 'shape') {
			child.segments.forEach(function (segment) {
				console.log(segment.toString());
			})
		}
		layer.addChild(child.clone());
	});
	rootObject.remove();

	console.log(paper.project.exportSVG().outerHTML);
});
