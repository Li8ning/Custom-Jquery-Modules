var count = 0;
var day_count = 0;
var days = 1;
var t_title;
var tab_data;
var dispval = 0;
var  i =1;
var dd;

function addclass(){
    
    if(!$('#vert_tabs li').hasClass('active')){
        $('#vert_tabs li:first').addClass('active');
    }
    if(!$('#verttab_content div').hasClass('active')){
        $('#verttab_content div:first').addClass('active');
    }
} 
function changetitle(cn){		
    $("#side_tab"+cn).text($("input[name=pill_title"+cn+"]").val());
}
function appendeditor(count,t_title,tab_data,_details){
    $("#vert_tabs").append("<li class=\"common tab-"+count+"\"><a href=\"#field-"+count+"\" id=\"side_tab"+count+"\" data-toggle=\"pill\">"+t_title.trim()+"</a></li>");
        $("#verttab_content").append("<div class=\"tab-pane tab-"+count+"\" id=\"field-"+count+"\"><div class=\"col-sm-10\"><div class=\"row\" style=\"margin-bottom:8px\"><input type=\"hidden\" id=\"tab_id"+count+"\" name=\"tabs["+t_title.trim()+"]\" class=\"form-control\" value=\"" + count + "\"><input type=\"hidden\" id=\"tab_type"+count+"\" name=\"tabs["+t_title.trim()+"][type]\" class=\"form-control\" value=\"" + tab_data + "\"><input type=\"text\" class=\"form-control\" value=\"" + t_title.trim() + "\" name=\"tabs["+t_title.trim()+"][pill_title]\" onkeyup=\"changetitle('"+count+"')\"></div><div class=\"row\" style=\"margin-bottom:8px\"></div><div class=\"row\"><div class=\"col-sm-10\"><textarea class=\"form-control\" name=\"tabs["+t_title.trim()+"][tab_details]\" id=\"tab_details" + count + "\">"+_details+"</textarea></div><div class=\"col-sm-2\"><button type=\"button\" name=\"bclose\" class=\"close1 btn btn-default\" data=\"tab-" + count + "\">Close</button></div></div></div></div>");
}

function appendpddetails(count,t_title){
    $("#vert_tabs").append("<li class=\"common tab-"+count+"\"><a href=\"#field-"+count+"\" id=\"side_tab"+count+"\" data-toggle=\"pill\">"+t_title.trim()+"</a></li>");
        $("#verttab_content").append("<div class=\"tab-pane tab-"+count+"\" id=\"field-"+count+"\"><div class=\"form-group fields\"><div class=\"col-sm-3\"><input type=\"hidden\" class=\"form-control\" value=\"" + count + "\"><input type=\"hidden\" id=\"tab_type"+count+"\" name=\"tabs["+t_title.trim()+"][type]\" class=\"form-control\" value=\"" + tab_data + "\"><input type=\"text\" class=\"form-control trim_title col-sm-8\" name=\"tabs["+t_title.trim()+"][pill_title]\" value=\""+t_title.trim()+"\" onkeyup=\"changetitle('"+count+"')\"><button type=\"button\" name=\"bclose\" class=\"close1 btn btn-default col-sm-4\" data=\"tab-" + count + "\">Close</button> </div><div class=\"col-sm-9\"><div class=\"row\"><div class=\"col-sm-10\"><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"no_of_days\">No of Days:</label><div class=\"col-sm-4\"><input type=\"number\" class=\"form-control\" id=\"no_of_days"+count+"\" value=\"\"></div><div class=\"col-sm-4\"><button type=\"button\" name=\"badd\" class=\"plus btn btn-default\" onclick=\"adddays('no_of_days"+count+"','add_days_details"+count+"','"+t_title.trim()+"')\">Add</button></div></div></div></div><div class=\"row\" id=\"add_days_details"+count+"\"></div></div></div></div>");
}



function addform(tab_type,_title,_details,_daysdetails) {
    
    console.log("addform called"); 
    if(tab_type == undefined){
        console.log('tabtype not predefined');
        t_title = $(".tab_title").val();
        tab_data = $(".tab_data").val();
        _details = "";
    }
    else{        
        tab_data = tab_type;
        t_title = _title;
        console.log('t_title in addform '+t_title);
    }
    
    console.log("tab type "+tab_data);
    console.log("tab title "+t_title);
    console.log("Detials "+_details);
    console.log("days details "+_daysdetails);
    
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
        }
        addclass();
    }
    console.log("addform exit");
}



function adddays(field_id,div_id) {
    console.log("adddays called");
    console.log("field_id "+field_id);
    console.log("div_id "+div_id);
    day_count = $("#"+field_id).val();
    
    dd = div_id.substr(div_id.length-1);
    list_record_number = $("#"+div_id).find('.days-details'+dd+':last-child').attr('id');
    
    if(list_record_number != undefined){
        dispval = list_record_number.substr(list_record_number.length-1);
    }
    else{
        dispval = 0;
    }
	
    if(dispval>0){        
        day_count = parseInt(dispval) + parseInt(day_count);
		
        for(i=parseInt(dispval)+1;i<=day_count;i++){
            appenddays(div_id,dd,i,t_title);
        }
        list_record_number = $("#"+div_id).find('.days-details'+dd+':last-child').attr('id');
    }
    else{
        for(i=1;i<=day_count;i++){
            appenddays(div_id,dd,i,t_title);
        }
        list_record_number = $("#"+div_id).find('.days-details'+dd+':last-child').attr('id');
    } 
    console.log("adddays exit"); 
}

function appenddays(div_id,dd,i,t_title,day_no,_daytitle,_daydetails){
    console.log("appenddays called");
    console.log('t_title in appenddays '+t_title);
    _daytitle = (_daytitle) ? _daytitle : '';
    _daydetails = (_daydetails) ? _daydetails : '';
    t_title = (t_title) ? t_title : '';
	day_no = (day_no) ? day_no : i;
    $("#"+div_id).append("<div class=\"days-details"+dd+"\" id=\"days_details" + dd+i + "\"><div class=\"row\"><div class=\"col-sm-8\"><div class=\"form-group\"><div class=\"col-sm-3\"><input type=\"text\" name=\"tabs["+t_title.trim()+"][days_details]["+i+"][day_no]\" value=\""+day_no+"\" class=\"form-control\"></div><div class=\"col-sm-9\"><input type=\"text\" name=\"tabs["+t_title.trim()+"][days_details]["+i+"][day_title]\" class=\"form-control\" id=\"" + i + "\" value=\""+_daytitle+"\"></div></div></div><div class=\"col-sm-4\"><button type=\"button\" name=\"bremove\" class=\"minus btn btn-default\" id=\"minus-"+i+"\" data=\"days_details"+dd+i+"\">Remove</button></div></div><div class=\"row\"><div class=\"col-sm-10\"><div class=\"form-group\"><textarea class=\"form-control\" name=\"tabs["+t_title.trim()+"][days_details]["+i+"][tab_details]\" id=\"tab_details" + i+ "\">"+_daydetails+"</textarea></div></div></div></div>");
    
    console.log("appenddays exit");
}


$(function () {
    $("#addnew").click(function () {
        addform();
    });
    
    $("#dynamic_tabs").on('click', '.minus', function () {
        if(confirm("Do you want to remove?")){
            var r = $(this).attr('data');
            r_id = r.substr(r.length-2).charAt(0);
            $("#" + r).remove();
            list_record_number = $("#add_days_details"+r_id).find('.days-details'+r_id+':last-child').attr('id');
        }
    });
    
    $("#dynamic_tabs").on('click', '.close1', function () {
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
});