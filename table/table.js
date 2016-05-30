var tableElem;
function Table(t_id, c_id) {
	this.table_id = t_id;
	this.table_control_id = c_id;
	this.table = new Array();
	this.maxCeilLength = 0;
	this.createUpdateCeil = createUpdateCeil;
	this.createUpdateCeilFromElem = createUpdateCeilFromElem;
	this.addRow = addRow;
	this.addColumn = addColumn;
	this.showTable = showTable;
	tableElem = this;
}

function addRow() {
	this.table[this.table.length] = {"head":"row_"+(this.table.length+1), "data":new Array()};;
	this.showTable();
}

function addColumn() {
	this.maxCeilLength++;
	this.showTable();
}

function createUpdateCeil(row, position, value, refresh) {
	console.log("update row: " + row + ", position: " + position + ", value: " + value);
	if (this.table[row-1] == undefined) {
		this.table[row-1] = {"head":"row"+row, "data":new Array()};
	}
	this.table[row-1].data[position] = value;
	if (position > this.maxCeilLength) {
		this.maxCeilLength = position;
	}
	if (refresh) {
		this.showTable();
	}
}

function createUpdateCeilFromElem(elem) {
	console.log("update elem: " + elem);
	this.createUpdateCeil(elem.getAttribute('row'), elem.getAttribute('column')-1, elem.innerHTML, false);
}


function showTable() {
	var tableInnerHTML = "<table rule='all' border='none'>";
	tableInnerHTML += "<tr>";
	for (var k = 0; k < this.maxCeilLength+2; k++) {
		if (k == 0) {
			tableInnerHTML += "<th><div style='min-width: 20px;'>&nbsp;</div></th>";
		} else {
			tableInnerHTML += ("<th><div style='min-width: 20px;'>col_" + k + "</div></th>");
		}
	}
	tableInnerHTML += "</tr>";
	for (var i = 0; i < this.table.length; i++) {
		tableInnerHTML += "<tr>";
		tableInnerHTML += "<td><div>" + this.table[i].head + "</div></td>";
		for (var j = 0; j < this.table[i].data.length; j++) {
			if (this.table[i].data[j] == undefined) {
				tableInnerHTML += "<td><div style='min-width: 20px;' contenteditable onkeyup='tableElem.createUpdateCeilFromElem(this)' column='" 
				+ (j+1) + "' row='" + (i+1) + "' id='ceil_" + (i+1) + "_" + (j+1) + "'>&nbsp;</div></td>";
			} else {
				tableInnerHTML += ("<td><div contenteditable onkeyup='tableElem.createUpdateCeilFromElem(this)' column='" 
				+ (j+1) + "' row='" + (i+1) + "' id='ceil_" + (i+1) + "_" + (j+1) + "'>" + this.table[i].data[j] + "</div></td>");
			}
		}
		if (this.table[i].data.length < this.maxCeilLength) {
			for (var k = this.table[i].data.length; k < this.maxCeilLength + 1; k++) {
				tableInnerHTML += ("<td><div style='min-width: 20px;' contenteditable onkeyup='tableElem.createUpdateCeilFromElem(this)' column='" 
				+ (k +1) + "' row='" + (i+1) + "' id='ceil_" + (i+1) + "_" 
				+ (k +1) + "'>&nbsp;</div></td>");
			}
		}
		tableInnerHTML += ("</tr>");
	}
	tableInnerHTML += ("</table>");
	document.getElementById(this.table_id).innerHTML = tableInnerHTML;
	var table_control = "<input type='button' onclick='tableElem.addColumn()' value='addColumn'/>";
	table_control += "<input type='button' onclick='tableElem.addRow()' value='addRow'/>";
	document.getElementById(this.table_control_id).innerHTML = table_control;
}
