/**
 * ccm table component
 * @author Viktor Riediger
 */

ccm.component( {

	name: "table",

	config: {
		html:  [ ccm.store, { local: 'template.json' } ],
		key:   'myTable',
		maxCeilNumbers: 5,
		rowsNumber: 0,
		//store: [ ccm.store, { local: 'dataset.json', store: 'myTable' } ],
		style: [ ccm.load, 'style.css' ]
		//user:  [ ccm.instance, 'https://kaul.inf.h-brs.de/ccm/components/user2.js' ]
	},

	Instance: function () {

		var self = this;

		self.init = function ( callback ) {
			//self.store.onChange = function () { 
			self.render(); 
			//};
			callback();
		};

		self.render = function ( callback ) {

			var element = ccm.helper.element( this );

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
			
			for (var i = 1; i <= self.rowsNumber; i++) {
				self.addRow(tbody, i);
			}
			
			
			var content_div = ccm.helper.find( self, '.table' );
			
			content_div.append(ccm.helper.html( self.html.get( 'control' ), 
			{ 
				onclick_add_row: function () {
					self.rowsNumber++;
					self.addRow(tbody, self.rowsNumber);
				}, 
				onclick_add_col: function () {
					self.addColumn();
				}
			}));

			if ( callback ) callback();

		};
		
		self.addRow = function(parent, number) {
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
					row1.append( ccm.helper.html( self.html.get( 'row_ceil' ), {

						row_ceil_text: ccm.helper.val( number+""+i ),
						column_number: ccm.helper.val( i ),
						row_number: ccm.helper.val( number ),
						id: ccm.helper.val( "ceil_" + number + "_" + i ),
						class: ccm.helper.val( "row_ceil" ),
						contenteditable: ccm.helper.val( true ),
					} ) );
				}
			}
		};
		
		self.addColumn = function() {
			self.maxCeilNumbers++;
			self.render();
		}


	}
});