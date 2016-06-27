/**
 * ccm table component
 * @author Viktor Riediger
 */

ccm.component( {

	name: "table",

	config: {
		html:  [ ccm.store, { local: 'template.json' } ],
		key:   'vriedi2s.myTable',
		maxCeilNumbers: 8,
		rowsNumber: 5,
		store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'vriedi2s.table' } ],
		style: [ ccm.load, 'style.css' ]
		//user:  [ ccm.instance, 'https://kaul.inf.h-brs.de/ccm/components/user2.js' ]
	},

	Instance: function () {

		var self = this;
		
		self.init = function ( callback ) {

		  self.store.onChange = function () { self.render(); };

		  callback();

		};

		self.render = function ( callback ) {

			var element = ccm.helper.element( this );
			
			self.store.get( self.key, function ( dataset ) {
				if ( dataset === null )
				  self.store.set( { key: self.key, messages: [] }, proceed );
				else
				  proceed( dataset );
				console.log(dataset);
				function proceed (dataset) {
					
					for (var i in dataset.messages) {
						for (var j in dataset.messages[i]) {
							if (dataset.messages[i][j] === undefined) {
								dataset.messages[i][j] = "&nbsp;";
							}
						}
					}
					
					self.rowsNumber = dataset.messages.length;
					dataset.messages[0] = new Array();
					if (self.maxCeilNumbers < dataset.messages[0].length) {
						self.maxCeilNumbers = dataset.messages[0].length;
					}

				element.html( ccm.helper.html( self.html.get( 'main' ) ) );

				var tbody = ccm.helper.find( self, '.tbody' );

				tbody.append( ccm.helper.html( self.html.get( 'header' )));

				var header_row = ccm.helper.find( self, '.header_row' );

				for ( var i = 0; i < self.maxCeilNumbers; i++ ) {

					if (i == 0) {
						header_row.append( ccm.helper.html( self.html.get( 'header_ceil' ), {

							header_ceil_text: ccm.helper.val( "&nbsp;" )

						} ) );					
					} else {
						header_row.append( ccm.helper.html( self.html.get( 'header_ceil' ), {

							header_ceil_text: ccm.helper.val( "col" + i )

						} ) );
					}
				}
				
				for (var i = 1; i < self.rowsNumber; i++) {
					self.addRow(tbody, i, dataset);
				}
				
				
				var content_div = ccm.helper.find( self, '.table' );
				
				content_div.append(ccm.helper.html( self.html.get( 'control' ), 
				{ 
					onclick_add_row: function () {
						if (dataset.messages.length < self.rowsNumber) {
							dataset.messages[self.rowsNumber] = new Array();
							
							self.store.set( dataset, function () { self.render(); } );
						}
						
						self.rowsNumber++;
						self.addRow(tbody, self.rowsNumber, dataset);
						
					}, 
					onclick_add_col: function () {
						self.addColumn(dataset);
					}
				}));

				if ( callback ) callback();
			}
			
			} );

		};
		
		self.addRow = function(parent, number, dataset) {
			parent.append( ccm.helper.html( self.html.get( 'row' ), {
				class: ccm.helper.val( "row" + number )
			}));
			
			var row1 = ccm.helper.find( self, '.row' + number );
			
			for ( var i = 0; i < self.maxCeilNumbers; i++ ) {
				
				if (i == 0) {
					row1.append( ccm.helper.html( self.html.get( 'row_ceil' ), {

						row_ceil_text: ccm.helper.val( "row" + number )

					} ) );					
				} else {
					if ((dataset.messages[number] === null || dataset.messages[number] === undefined)) {
						dataset.messages[number] = new Array();
						self.store.set( dataset, function () { self.render();  } );
					}
					row1.append( ccm.helper.html( self.html.get( 'row_ceil' ), {

						row_ceil_text: dataset.messages[number][i] === undefined || dataset.messages[number][i] === null ? "&nbsp;" : dataset.messages[number][i],
						column_number: ccm.helper.val( i ),
						row_number: ccm.helper.val( number ),
						id: ccm.helper.val( "ceil_" + number + "_" + i ),
						class: ccm.helper.val( "row_ceil" ),
						contenteditable: ccm.helper.val( true ),
						manage_content: function (e) {
							var row_ceil = e.currentTarget.id.replace("ceil_", "").split("_");
							console.log(row_ceil[0] + "," + row_ceil[1] + ": " + e.delegateTarget.innerText);
							dataset.messages[row_ceil[0]][row_ceil[1]] = e.delegateTarget.innerText;
							self.store.set( dataset, function () { self.render();  } );
						}
					} ) );
				}
			}

		};
		
		self.addColumn = function(dataset) {
			self.maxCeilNumbers++;
			
			self.render();
		}


	}
});