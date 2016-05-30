var tabelle = new Table("table", "control")

// Ceils of row1
tabelle.createUpdateCeil(1, 0, 5, false);
tabelle.createUpdateCeil(1, 1, 7, false);
tabelle.createUpdateCeil(1, 6, 9, false);
// Ceils of row2
tabelle.createUpdateCeil(2, 0, 10, false);
tabelle.createUpdateCeil(2, 1, 12, false);
tabelle.createUpdateCeil(2, 2, 25, false);
tabelle.createUpdateCeil(2, 9, 56, false);
// Ceils of row3
tabelle.createUpdateCeil(3, 0, 89, false);
tabelle.createUpdateCeil(3, 1, 9, false);
tabelle.createUpdateCeil(3, 2, 34, false);
tabelle.createUpdateCeil(3, 3, 89, true);