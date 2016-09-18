
ccm.component( {

  name: 'composition',
  
  config: {
	puzzle:  [ ccm.instance, '../puzzle/ccm.puzzle.js',
		{
			html: [ccm.store, {local: '../puzzle/template_puzzle.json'}]
		}
	],
	
	table: [ ccm.instance, '../table/ccm.table.js',
		{ 
			key: 'vriedi2s.myTable2', 
			html: [ccm.store, {local: '../table/template.json'}]
		}
	],
	
	style: [ ccm.load, '../table/style.css']
  },

  Instance: function () {
  	  
  	 var self = this;

    self.render = function ( ) {
    	var element = ccm.helper.element(self);
    	element.html('<div class="puzzle"></div><div class="table"></div>');
    	self.puzzle.element = ccm.helper.find(self, '.puzzle');
    	self.puzzle.render();
    	
    	self.table.element = ccm.helper.find(self, '.table');
    	self.table.render();
    }

  }

} );
