function dist(x1, y1, x2, y2) {
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function dist(one, two) {
	return Math.sqrt((one[0]-two[0])*(one[0]-two[0]) + (one[1]-two[1])*(one[1]-two[1]));
}