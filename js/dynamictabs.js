var count = 0;  //main counter
var day_count = 0;  //number of days entered, first initialized to zero
var t_title;  //tab title
var tab_data;  // tab type
var dispval = 0;  //used for storing last field id or value
var  i =1;  //inner counter for package days details and textbox
var dd;  //used to store the last character of string from div_id
var $ = jQuery;
var textcount = 1;

//used for adding active class for tabs
function addclass(){
    
    if(!$('#vert_tabs li').hasClass('active')){
        $('#vert_tabs li:first').addClass('active');
    }
    if(!$('#verttab_content div').hasClass('active')){
        $('#verttab_content div:first').addClass('active');
    }
}

//used for changing tab title if tab title changed in the title box appended
function changetitle(cn,vals){
	//alert(vals);
    $("#side_tab"+cn).text(vals);
}


//function for appending with parameter count-main counter, t_title-tab title, tab_data-tab type, _details-textarea details
function appendeditor(count,t_title,tab_data,_details){
    $("#vert_tabs").append("<li class=\"common tab-"+count+"\"><a href=\"#field-"+count+"\" id=\"side_tab"+count+"\" data-toggle=\"pill\">"+t_title.trim()+"</a></li>");
	$("#verttab_content").append("<div class=\"tab-pane tab-"+count+"\" id=\"field-"+count+"\"><div class=\"inner-tab\"><input type=\"hidden\" id=\"tab_id"+count+"\" name=\"tabs["+count+"]\" class=\"form-control\" value=\"" + count + "\"><input type=\"hidden\" id=\"tab_type"+count+"\" name=\"tabs["+count+"][type]\" class=\"form-control\" value=\"" + tab_data + "\"><input type=\"text\" class=\"form-control\" value=\"" + t_title.trim() + "\" name=\"tabs["+count+"][pill_title]\" onkeyup=\"changetitle('"+count+"',this.value)\"><div class=\"tab-content\"><textarea class=\"form-control\" name=\"tabs["+count+"][tab_details]\" id=\"tab_details" + count +"\">"+_details+"</textarea></div><div class=\"tab-button\"><button type=\"button\" name=\"bclose\" class=\"close1 btn btn-default button-primary button-primary button-large\" data=\"tab-" + count + "\">Remove Tab</button></div></div></div>"); 
		_load_editor();
}


//function for appending package days details with parameters count-main counter, t_title-tab title
function appendpddetails(count,t_title){
    $("#vert_tabs").append("<li class=\"common tab-"+count+"\"><a href=\"#field-"+count+"\" id=\"side_tab"+count+"\" data-toggle=\"pill\">"+t_title.trim()+"</a></li>");
    $("#verttab_content").append("<div class=\"tab-pane tab-"+count+"\" id=\"field-"+count+"\"><div class=\"inner-tab\"><div class=\"sub-inner-tab\"><div class=\"form-group\"><input type=\"hidden\" class=\"form-control\" value=\"" + count + "\"><input type=\"hidden\" id=\"tab_type"+count+"\" name=\"tabs["+count+"][type]\" class=\"form-control\" value=\"" + tab_data + "\"><input type=\"text\" class=\"form-control trim_title\" name=\"tabs["+count+"][pill_title]\" value=\""+t_title.trim()+"\" onkeyup=\"changetitle('"+count+"',this.value)\"><button type=\"button\" name=\"bclose\" class=\"close1 btn btn-default col-sm-4 button-primary button-large\" data=\"tab-" + count + "\">Remove Tab</button><label class=\"control-label col-sm-4\" for=\"no_of_days\">No of Days:</label><input type=\"number\" class=\"form-control form-mick\" id=\"no_of_days"+count+"\" value=\"\"><button type=\"button\" name=\"badd\" class=\"plus btn btn-default button-primary button-large\" onclick=\"adddays('no_of_days"+count+"','add_days_details-"+count+"','"+t_title.trim()+"')\">Add</button></div></div><div class=\"sub-inner-tab-content\"><div class=\"row\" id=\"add_days_details-"+count+"\"></div></div></div></div>");
   
        _load_editor();
} 

//function for appending textbox with parameters count-main counter, t_title-tab title,tab_data-tab type
function appendtextbox(count,t_title,tab_data){
    $("#vert_tabs").append("<li class=\"common tab-"+count+"\"><a href=\"#field-"+count+"\" id=\"side_tab"+count+"\" data-toggle=\"pill\">"+t_title.trim()+"</a></li>");
    $("#verttab_content").append("<div class=\"tab-pane tab-"+count+"\" id=\"field-"+count+"\"><div class=\"inner-tab\"><div class=\"sub-inner-tab\"><div class=\"form-group\"><input type=\"hidden\" class=\"form-control\" value=\"" + count + "\"><input type=\"hidden\" id=\"tab_type"+count+"\" name=\"tabs["+count+"][type]\" class=\"form-control\" value=\"" + tab_data + "\"><input type=\"text\" class=\"form-control trim_title\" name=\"tabs["+count+ "][pill_title]\" value=\""+t_title.trim()+ "\" onkeyup=\"changetitle('"+count+ "',this.value)\"><button type=\"button\" name=\"bclose\" class=\"close1 btn btn-default col-sm-4 button-primary button-large\" data=\"tab-"+count+"\">Remove Tab</button><button type=\"button\" name=\"badd\" class=\"plus btn btn-default button-primary button-large\" onclick=\"addtbox('tbox-"+count+ "','tbox_details-"+count+ "','"+t_title.trim()+ "')\">Add</button></div></div><div class=\"sub-inner-tab-content\"><div class=\"row\" id=\"tbox-"+count+ "\"></div></div></div></div>"); 
        _load_editor();
} 
function addform(tab_type,_title,_details) {
    
    
    
    //condition is checked if data is present in session
    if(tab_type == undefined){
        
        t_title = $(".tab_title").val();
        tab_data = $(".tab_data").val();
        _details = "";
    }
    else{        
        tab_data = tab_type;
        t_title = _title;
      
    } 
    
    if(t_title.trim()!=""){
        count++;
        $("#submit").css("display", "block");
        $(".tab_parent").css("border","1px solid #ddd");
        $("#verttab_content").css("border","1px solid #ddd","!important");
        switch(tab_data){
            case 'Editor':
                appendeditor(count,t_title,tab_data,_details);
                $(".tab_title").val("");
                break;
            case 'Package_Days_Details':
                appendpddetails(count,t_title,tab_data,_details);
                $(".tab_title").val("");
                break;
            case 'Textbox':
                appendtextbox(count,t_title,tab_data);
                $(".tab_title").val("");
                break;
        }
        addclass();
    }
	_load_editor();
    
}

function addtbox(field_id,div_id,t_title) {
    console.log('addtbox called');
    var d_count = 0;
    dd = field_id.split("-").pop();  //last character of 'add_days_details-'+count is stored e.g. add_days_details-1 then 1 is stored in dd
    console.log("div_id "+div_id);
    console.log("field_id "+field_id);
    console.log("dd "+dd);

    list_record_number = $("#"+field_id).find('.tbox_details'+dd+':last-child').attr('id');
    console.log("list_record_number "+list_record_number);
     
    //condition for if last id of element is defined or not
    if(list_record_number != undefined){
        
        i = list_record_number.split("-").pop();
        i++;
        console.log("i "+i);
        appendtbox(field_id,dd,i);
         
    }
    else{
        i = 1;
        console.log("i "+i);
        appendtbox(field_id,dd,i);
    }
    console.log('addtbox over');
}

function appendtbox(field_id,dd,i,_tboxtitle,_tboxdetails,_tboximg) {
    console.log("appendtbox called");
    console.log("dd "+dd);
    console.log("i "+i);
    _tboxtitle = (_tboxtitle) ? _tboxtitle : '';
    _tboxdetails = (_tboxdetails) ? _tboxdetails : '';
    _tboximg = (_tboximg) ? _tboximg : '';
    $("#"+field_id).append("<div class=\"tab-pane tbox_details"+dd+"\" id=\"tbox_details"+dd+"-"+i+"\"><div class=\"inner-tab\"><input type=\"text\" class=\"form-control\" value=\""+_tboxtitle+"\" name=\"tabs["+dd+ "][tbox]["+i+"][pill_title]\"><div class=\"tab-content\"><textarea class=\"form-control\" name=\"tabs["+dd+ "][tbox]["+i+"][tab_details]\" id=\"tab_details"+i+"\">"+_tboxdetails+"</textarea><input type=\"file\" value=\""+_tboximg+"\" onchange=\"disp_img('tab_img"+i+"',this.value)\" name=\"tabs["+dd+ "][tbox]["+i+"][tab_img]\" id=\"tab_img"+i+"\"><div><img src=\"\" alt=\"Dynamic Tabs\" class=\"tab_img"+i+"\"></div></div><div class=\"tab-button\"><button type=\"button\" name=\"badd\" class=\"plus btn btn-default button-primary button-large\" onclick=\"addtbox('tbox-"+dd+ "','tbox_details-"+i+ "')\">Add</button><button type=\"button\" name=\"bremove\" class=\"minus btn btn-default button-primary button-large\" id=\"minus-"+i+"\" data=\"tbox_details"+dd+"-"+i+"\">Remove</button></div></div></div>");
   
     
    _load_editor();
    console.log("appendtbox over");
}

function disp_img(img_src,img_val) {
    console.log('disp_img called');
    console.log('img_val '+img_val);
    $("."+img_src).attr('src',img_val);
    console.log('disp_img over');
}

function adddays(field_id,div_id,t_title) {
   
    day_count = $("#"+field_id).val();
    var d_count = 0;
    dd = div_id.split("-").pop();  //last character of 'add_days_details'+count is stored e.g. add_days_details1 then 1 is stored in dd
	 
    list_record_number = $("#"+div_id).find('.days-details'+dd+':last-child').attr('id');  
	 
    //condition for if last id of element is defined or not
    if(list_record_number != undefined){
		
        dispval = list_record_number.split("-").pop();
		 
    }
    else{
        dispval = 0;
    }
	
    if(dispval>0){        
        day_count = parseInt(dispval) + parseInt(day_count);
		
        for(i=parseInt(dispval)+1;i<=day_count;i++){
            appenddays(div_id,dd,i,t_title);
        }
    }
    else{
        for(i=1;i<=day_count;i++){
            appenddays(div_id,dd,i,t_title);
        }
    }
    
} 
function appenddays(div_id,dd,i,t_title,day_no,_daytitle,_daydetails){
    
    _daytitle = (_daytitle) ? _daytitle : '';
    _daydetails = (_daydetails) ? _daydetails : '';
    t_title = (t_title) ? t_title : '';
	day_no = (day_no) ? day_no : i;
	$("#"+div_id).append("<div class=\"days-details"+dd+" sub-tab\" id=\"days_details" + dd+"-"+i + "\"><div class=\"tabbing-top\"><input type=\"text\" name=\"tabs["+dd+"][days_details]["+i+"][day_no]\" value=\""+day_no+"\" class=\"form-control\"><input type=\"text\" name=\"tabs["+dd+"][days_details]["+i+"][day_title]\" class=\"form-control mick2\" id=\"" + i + "\" value=\""+_daytitle+"\"></div><div class=\"tab-content\"><textarea class=\"form-control tab_titles\" name=\"tabs["+dd+"][days_details]["+i+"][tab_details]\" id=\"tab_details"+dd+i+textcount+ "\">"+_daydetails+"</textarea></div><div class=\"tab-inner-button\"><button type=\"button\" name=\"bremove\" class=\"minus btn btn-default button-primary button-large\" id=\"minus-"+i+"\" data=\"days_details"+dd+"-"+i+"\">Remove</button></div></div>");
	
	textcount++;
   
	 
	_load_editor();
	//tinymce.execCommand('mceRemoveControl', true,'tab_details'+dd+i+'');
} 
function _load_editor(){
	 $(document).ready(function(){
	tinymce.init({
   selector: '#tour_meta_box textarea', 
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste code'
  ],
  toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css']
});
});
}
(function ($) {  
    $(document).on('click','#addnew',function () {
        addform();
    }); 
    //for removing days field from appended package days details
    $(document).on('click', '.tab-content .minus', function () {
        if(confirm("Do you want to remove?")){
            var r = $(this).attr('data');
			$("#" + r).remove();
        }
    }); 
    
    $(document).on('click','.tab-content .close1', function () { 
        if(confirm("Do you want to close?")){
            var c = $(this).attr("data");
            $("." + c).remove();
            if ($(".common").length == 0) {
                $("#submit").css("display", "none");
                $(".tab_parent").css("border","none");
                $("#verttab_content").css("border","none","!important");
            }
            addclass();
        }
    });
	 
	$(document).on('click','li.common',function(){ 
		var tab_id = $(this).find('a').attr('href');		
		$('#vert_tabs li').removeClass('active');
		$('.tab-content').find('.tab-pane').removeClass('active');
		$(this).addClass('active');
		$(tab_id).addClass('active');	
	})
	 
}(jQuery));
