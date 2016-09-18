
ccm.component( {

  name: 'puzzle',
  
  config: {
		html:  [ ccm.store, { local: 'template_puzzle.json' } ],
		//key:   'vriedi2s.myTable',
		//maxCeilNumbers: 8,
		//rowsNumber: 5,
		//store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'vriedi2s.table' } ],
		style: [ ccm.load, 'style.css' ]
		//user:  [ ccm.instance, 'https://kaul.inf.h-brs.de/ccm/components/user2.js' ]
	},

  Instance: function () {
  	  
	var a = new Array('http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/a0.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/a1.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/a2.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/a3.png');
	var b = new Array('http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/b0.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/b1.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/b2.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/b3.png');
	var c = new Array('http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/c0.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/c1.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/c2.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/c3.png');
	var d = new Array('http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/d0.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/d1.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/d2.png', 'http://www2.inf.h-brs.de/~vriedi2s/phase4/puzzle/img/d3.png');
	
	var position = {
		"array": d,
		"pos": 3
	};

  	 var self = this;
		
  	  
		self.render = function ( callback ) {
		
		var element = ccm.helper.element( this );
		
		element.html( ccm.helper.html( self.html.get( 'main' ) ) );
		
		var tbody = ccm.helper.find( self, '.tbody' );
		
		tbody.append( ccm.helper.html( self.html.get( 'header' )));
		
		var header_row = ccm.helper.find( self, '.header_row' );
		
		header_row.append( ccm.helper.html( self.html.get( 'header_ceil' ), {
		
			header_ceil_text: ccm.helper.val( "Status" )
		
		} ) );
		
		for (var i = 0; i < 4; i++) {
			tbody.append(ccm.helper.html( self.html.get( 'row' ), {
				class: ccm.helper.val( "row" + i )
			}));
			var row_id;
			var array;
			switch (i) {
				case 0:
					row_id = "a";
					array = a;
					break;
				case 1:
					row_id = "b";
					array = b;
					break;
				case 2:
					row_id = "c";
					array = c;
					break;
				case 3:
					row_id = "d";
					array = d;
					break;
			}
			var row = ccm.helper.find( self, '.row'+i);
			for (var j = 0; j < 4; j++) {
				row.append(ccm.helper.html( self.html.get( 'row_ceil' ), {
						id: ccm.helper.val( row_id + j ),
						img_puzzle: array[j]
				}));
			}
		}
		
		tbody.append(ccm.helper.html( self.html.get( 'row' ), {
			class: ccm.helper.val( "row5" )
		}));
		var row5 = ccm.helper.find( self, '.row5');
		row5.append(ccm.helper.html( self.html.get( 'control' )));
		
		
		var move_btns = self.init_btns();
		//self.check();
		
		var btn_mix = document.getElementById("btn_mix");
		btn_mix.onclick = function() {
			for (i = 0; i < 20; i++) {
				var x = Math.floor((Math.random() * 4) + 0);
				console.log(move_btns[x].disabled === false);
				if (x < 4 && move_btns[x].disabled === false) {
						move_btns[x].click();
				}
			}
		}


      if ( callback ) callback();

    }
    
    self.switch_ = function(arr, direction) {	
		if (arr === position.array && direction != null) {
			if (position.pos === 0 && direction != "left") {
				var tmp_pos = position.array[position.pos];
				position.array[position.pos] = position.array[(position.pos + 1)];
				position.array[(position.pos) + 1] = tmp_pos;
				position.pos = position.pos + 1;
			} else if (position.pos === 3 && direction != "right") {
				var tmp_pos = position.array[position.pos];
				position.array[position.pos] = position.array[(position.pos - 1)];
				position.array[(position.pos - 1)] = tmp_pos;
				position.pos = position.pos - 1;
			} else {
				if (direction == "left") {
					var tmp_pos = position.array[position.pos];
					position.array[position.pos] = position.array[(position.pos - 1)];
					position.array[(position.pos - 1)] = tmp_pos;
					position.pos = position.pos - 1;
				} else if (direction == "right") {
					var tmp_pos = position.array[position.pos];
					position.array[position.pos] = position.array[(position.pos + 1)];
					position.array[(position.pos) + 1] = tmp_pos;
					position.pos = position.pos + 1;
				}
			}
		} else if (arr != position.array){
			var tmp_pos = position.array[position.pos];
			position.array[position.pos] = arr[position.pos];
			arr[position.pos] = tmp_pos;
			position.array = arr;
		}
		self.render();
		return arr + ":" + direction;
	}
	
	self.init_btns = function() {
		var btn_up = document.getElementById("btn_up");
		btn_up.disabled = false;
		var btn_down = document.getElementById("btn_down");
		btn_down.disabled = false;
		var btn_left = document.getElementById("btn_left");
		btn_left.disabled = false;
		var btn_right = document.getElementById("btn_right");
		btn_right.disabled = false;
		if (position.pos === 0) {
			btn_right.disabled = true;
		}
		if (position.pos === 3) {
			btn_left.disabled = true;
		}
		if (position.array === d) {
			btn_up.disabled = true;
		}
		if (position.array === a) {
			btn_down.disabled = true;
		}
		btn_down.onclick = function() {
			switch (position.array) {
				case d:
					self.switch_(c, null);
					break;
				case c: 
					self.switch_(b, null);
					break;
				case b:
					self.switch_(a, null);
					break;
			}
		}
		btn_up.onclick = function() {
			switch (position.array) {
				case a:
					self.switch_(b, null);
					break;
				case b: 
					self.switch_(c, null);
					break;
				case c:
					self.switch_(d, null);
					break;
			}
		}
		btn_left.onclick = function() {
			self.switch_(position.array, "right");
		}
		
		btn_right.onclick = function() {
			self.switch_(position.array, "left");
		}
		var move_btns = new Array(btn_down, btn_left, btn_up, btn_right);
		return move_btns;
	}

  }

} );