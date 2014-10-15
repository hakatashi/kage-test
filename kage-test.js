var fs = require('fs');
var paper = require('paper');
var xml2js = require('xml2js');

paper.setup(new paper.Canvas(800, 800));

var parser = new xml2js.Parser({});
var builder = new xml2js.Builder({headless: true});

function done(error) {
	if (error) console.error(error);
}

fs.readFile('01.svg', {encoding: 'utf-8'}, function (error, data) {
	if (error) return done(error);

	parser.parseString(data.toString(), function (error, result) {
		if (error) return done(error);

		var svg = builder.buildObject(result);

		paper.project.importSVG(svg);
		var layer = paper.project.activeLayer;
		var rootObject = layer.firstChild;
		rootObject.children.forEach(function (child) {
			if (child.name === 'shape') {
				child.segments.forEach(function (segment) {
					console.log(segment.toString());
				});
			}
			layer.addChild(child.clone());
		});
		rootObject.remove();

		console.log(paper.project.exportSVG().outerHTML);
	});
});
