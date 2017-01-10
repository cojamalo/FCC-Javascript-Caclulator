/* Calculator Javascript and jQuery
Completed on November 22, 2016
For Amanda, mi amor.

*/


$(document).ready(function(){
  
  var current_output = "";
  var construct = "";
  var translated = "";
  var record = [];
  var trans_record = [];
  var entered = false;
  var answer = "";
  var open_power = false;
  
  function button(id, symbol, operator, trans_symbol) {
  this.name = id;
  this.Current = function() {
    current_output = trans_symbol;
    $('#main').text(current_output);
  };
  this.Construct = function() {
    if (entered && !operator) {
      construct = "";
      translated = "";
      entered = false;
    }
    else if (entered && operator) {
      construct = answer;
      translated = answer;
      record = [answer];
      trans_record = [answer];
      entered = false;
    }
    
    else if (operator && open_power) {
      construct = construct + ")";
      translated = translated + ")";
      record.push(")");
      trans_record.push(")");
      open_power = false;
    }
    
    construct = construct + symbol;
    translated = translated + trans_symbol;
    $('#sub-main').text(translated);
  };
   this.Clear = function() {
    construct = "";
    translated = "";
    record = [];
    trans_record = [];
     open_power = false;
    $('#sub-main').text(translated);
  };
    this.Back = function() {
      if (entered) {
        this.Clear();
      }
      if (translated.length <= 2) {
        $('#main').text(0);
      }
      if (record[record.length-1] == ")") {
        open_power = true;
      }
      
      var count = 0;
      construct = "";
    if (record[record.length-1] == ", ") {
      record.splice(record.length-1);
    }  
    for (var i = record.length - 1; i > -1; i--) {
      if (record[i] == record[i-1]) {
        count++;
      }
      else {
         if (record[i-1] == ", ") {
          record.splice(i-1,1);
         }
        if (record[i-1] == "Math.pow(") {
          record.splice(i-1,1);
          open_power = false;
        }
        else {record.splice(record.length-(1+count));}
        
        for (var i = 0; i < record.length; i++) {
          construct = construct + record[i];
        }
        break;
      }
      
    }
      
      var counts = 0;
      translated = "";
    for (var i = trans_record.length - 1; i > -1; i--) {
      if (trans_record[i] == trans_record[i-1]) {
        counts++;
      }
      else {
        trans_record.splice(trans_record.length-(1+counts));
        for (var i = 0; i < trans_record.length; i++) {
          translated = translated + trans_record[i];
        }
        break;
      }
      
    }
    $('#sub-main').text(translated);
  };
    
    this.Enter = function() {
       if (open_power) {
      construct = construct + ")";
      translated = translated + ")";
      record.push(")");
      trans_record.push(")");  
      $('#sub-main').text(translated);
      open_power = false;
      }
      console.log("the pre-eval statement is:" + construct);
      construct = eval(construct);
      
      console.log(construct.toString().length);
      if (construct.toString().length >= 9 && construct <= 99999999 && construct >= 0.00000001) {
        construct = construct.toString().substring(0,9);
        
      }
      else if (construct.toString().length >= 9 && construct > 99999999) {
        construct = construct.toExponential();
        var con_length = construct.toString().length;
        construct = construct.toString().substring(0,5) + construct.toString().substring(con_length-4); 
        
      }
      else if (construct.toString().length >= 9 && construct < 0.00000001) {
        construct = construct.toExponential();
        var con_length = construct.toString().length;
        construct = construct.toString().substring(0,5) + construct.toString().substring(con_length-4); 
      }
      $('#main').text(construct);
      answer = construct;
      entered = true;
  };
    this.Record = function() {
    record.push(symbol);
    trans_record.push(trans_symbol);
    };
    this.Power = function() {
      if (entered) {
      construct = answer;
      translated = answer;
      record = [answer];
      trans_record = [answer];
      entered = false;
    }
      var count = 0;
      construct = "";
      console.log("the input record is: " +record);
      //collect all values up to Math.pow(
    for (var i = record.length - 1; i > -1; i--) {
      if (i-1 != -1 && record[i-1] != "+" && record[i-1] != "-" && record[i-1] != "*" && record[i-1] != "/" && record[i-1] != ")") {
        count++;
      }
      else {
        var saved = record.splice(record.length-(1+count));
        
        for (var i = 0; i < record.length; i++) {
          construct = construct + record[i];
        }
        var new_saved = "";
        for (var i = 0; i < saved.length; i++) {
          new_saved = new_saved + saved[i];
        }
        
        construct = construct + "Math.pow("+ new_saved + ", ";
        record.push("Math.pow(");
        record.push(new_saved);
        record.push(", ");
        
        break;
      }
    }
     
    count = 0;
    translated = "";
    for (var i = trans_record.length - 1; i > -1; i--) {
      if (i-1 != -1 && record[i-1] != "+" && record[i-1] != "-" && record[i-1] != "x" && record[i-1] != "÷" && record[i-1] != ")") {
        count++;
      }
      else {
        var saved = trans_record.splice(trans_record.length-(1+count));
        for (var i = 0; i < trans_record.length; i++) {
          translated = translated + trans_record[i];
        }
        var new_saved = "";
        for (var i = 0; i < saved.length; i++) {
          new_saved = new_saved + saved[i];
        }
        translated = translated + new_saved + "^(";
        trans_record.push(new_saved);
        trans_record.push("^(")
        break;
      }
    }  
      
    $('#sub-main').text(translated);
      open_power = true;
  };
  }

  var clear = new button("#clear", "0", false, "0");
  var back = new button("#back", "", false, "");
  var power = new button("#power", "Math.pow(", true, "");
  var divide = new button("#divide", "/", true, "÷");
  var seven = new button("#seven", "7", false, "7");
  var eight = new button("#eight", "8", false, "8");
  var nine = new button("#nine", "9", false, "9");
  var multiply = new button("#multiply", "*", true, "x");
  var four = new button("#four", "4", false, "4");
  var five = new button("#five", "5", false, "5");
  var six = new button("#six", "6", false, "6");
  var subtract = new button("#subtract", "-", true, "-");
  var one = new button("#one", "1", false, "1");
  var two = new button("#two", "2", false, "2");
  var three = new button("#three", "3", false, "3");
  var add = new button("#add", "+", true, "+");
  var zero = new button("#zero", "0", false, "0");
  var decimal = new button("#decimal", ".", false, ".");
  var negate = new button("#negate", "-", false, "-");
  var enter = new button("#enter", "enter", false, "enter");
  
 
    
  $(clear.name).off().on("click", function() {clear.Current();clear.Clear();});
  $(back.name).off().on("click", function() {back.Back();});
  $(power.name).off().on("click", function() {power.Power();});
  $(divide.name).off().on("click", function() {divide.Current();divide.Construct();divide.Record();});
  $(seven.name).off().on("click", function() {seven.Current();seven.Construct();seven.Record();});
  $(eight.name).off().on("click", function() {eight.Current();eight.Construct();eight.Record();});
  $(nine.name).off().on("click", function() {nine.Current();nine.Construct();nine.Record();});
  $(multiply.name).off().on("click", function() {multiply.Current();multiply.Construct();multiply.Record();});
  $(four.name).off().on("click", function() {four.Current();four.Construct();four.Record();});
  $(five.name).off().on("click", function() {five.Current();five.Construct();five.Record();});
  $(six.name).off().on("click", function() {six.Current();six.Construct();six.Record();});
  $(subtract.name).off().on("click", function() {subtract.Current();subtract.Construct();subtract.Record();});
  $(one.name).off().on("click", function() {one.Current();one.Construct();one.Record();});
  $(two.name).off().on("click", function() {two.Current();two.Construct();two.Record();});
  $(three.name).off().on("click", function() {three.Current();three.Construct();three.Record();});
  $(add.name).off().on("click", function() {add.Current();add.Construct();add.Record();});
  $(zero.name).off().on("click", function() {zero.Current();zero.Construct();zero.Record();});
  $(decimal.name).off().on("click", function() {decimal.Current();decimal.Construct();decimal.Record();});
  $(negate.name).off().on("click", function() {negate.Current();negate.Construct();negate.Record();});
  $(enter.name).off().on("click", function() {enter.Enter();});
  
  //$(document).off().on("click", function() {console.log("the construct is: " + construct);console.log("the record is: " + record);console.log("the open power is: " + open_power);});
//End of docmunet ready
});
                  
