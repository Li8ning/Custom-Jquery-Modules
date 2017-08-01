<?php
session_start();
?>
    <!DOCTYPE html>
    <html>

    <head>
        <title>Dynamic Tabs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/bootstrap.min.js"></script>
    </head>

    <body>
        <div class="container">
            <div class="row">
                <h3 style="text-align:center">Dyanmic Tabs</h3> </div>
            <div class="row tab_header">
                <form class="form-horizontal" id="dynamic_tabs" name="dynamic_tabs" method="post">
                    <?php
                    if(!empty($_SESSION['dynamic_tabs'])){
                        $dyna_tabs = $_SESSION['dynamic_tabs'];
                        $undyna_tabs = unserialize($dyna_tabs);
                       print("<pre>");
                       print_r($undyna_tabs);
                       print("</pre>");
						$count=1;
                        echo "<script>$(function(){";
                        foreach($undyna_tabs['tabs'] as $k=>$v){
                            switch($v['type']){
                                case 'Editor':
                                    echo "addform('".$v['type']."','".$v['pill_title']."','".$v['tab_details']."');";
									$count++; 
                                    break;
                                case 'Package_Days_Details':
                                    echo "addform('".$v['type']."','".$v['pill_title']."');";
									$i=1;									
                                    foreach($v['days_details'] as $m=>$n){
										echo "appenddays('add_days_details-".$count."',".$count.",'".$i."','".$v['pill_title']."','".$n['day_no']."','".$n['day_title']."','".$n['tab_details']."');";
										$i++; 
                                    }
									$count++; 
                                    break;
                                case 'Textbox':
                                    echo "addform('".$v['type']."','".$v['pill_title']."');";
                                    $i=1;                                   
                                    foreach($v['tbox'] as $m=>$n){
                                        echo "appendtbox('tbox-".$count."','".$count."','".$i."','".$n['pill_title']."','".$n['tab_details']."','".$n['tab_img']."');";
                                        $i++;
                                    }
                                    $count++;
                                    break;
                            } 
                        }
                        echo "});</script>";
                    }
                ?>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="t_title">Tab Title:</label>
                            <div class="col-sm-10">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control tab_title" id="t_title"> </div>
                                    <div class="col-sm-6">
                                        <select class="form-control tab_data">
                                            <option value="Editor">Text Editor</option>
                                            <option value="Textbox">Textbox</option>
                                            <option value="Package_Days_Details">Package Days Details</option>
                                        </select>
                                    </div>
                                    <button type="button" class="btn btn-default col-sm-2" name="addtab" id="addnew">Add</button>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="tab_parent">
                                <ul class="nav nav-pills nav-stacked col-md-2" id="vert_tabs"></ul>
                                <div class="tab-content col-md-10" id="verttab_content"></div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-default" id="submit" name="bsubmit" style="display:none">Submit</button>
                                </div>
                            </div>
                        </div>
<!--
                        <div class="container">
                            <div class="tab-pane tab-" id="field-"><div class="form-group fields"><div class="col-sm-3"><input type="hidden" class="form-control"><input type="hidden" id="tab_type" name="tabs" class="form-control"><input type="text" class="form-control trim_title col-sm-8" name="tabs"><button type="button" name="bclose" class="close1 btn btn-default col-sm-4" data="tab-">Close</button></div><div class="col-sm-9"><div class="form-group"><div class="col-sm-4"><input type="text" class="form-control" id="no_of_days" value=""> </div><div class="col-sm-4"><button type="button" name="badd" class="plus btn btn-default">Remove</button></div></div><div><button type="button" name="badd" class="plus btn btn-default">Add</button></div></div></div></div>
                        </div>
-->
                </form>
                <div class="display_tabs"> </div>
                <?php
			//unset($_SESSION['dynamic_tabs']);
                if(isset($_POST['bsubmit'])){
                    // print("<pre>");
                    // print_r($_POST);
                    $ser = serialize($_POST);
                    $_SESSION['dynamic_tabs'] = $ser;
                }
            ?> </div>
        </div>
        <script src="js/dynamictabs.js"></script>
        <script src="js/tinymce/tinymce.min.js"></script>
    </body>

    </html>