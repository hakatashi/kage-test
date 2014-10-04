var fs = require('fs');
var paper = require('paper');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder({
	headless: true
});

paper.setup(new paper.Canvas(800, 800));

fs.readFile('01.svg', {encoding: 'utf-8'}, function (error, data) {

	parser.parseString(data, function (error, result) {
		var svgString = builder.buildObject(result);

		paper.project.importSVG(svgString);
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
});
