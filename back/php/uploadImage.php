<?php

echo 1;
return false;
$tmp = $_FILES['myfile']['tmp_name'];

$filepath = __DIR__.DIRECTORY_SEPARATOR.'photo'.DIRECTORY_SEPARATOR;
$storeFileName=time().".jpg";

if (move_uploaded_file($tmp, $filepath . $storeFileName)) {
    echo json_encode($storeFileName);
} else {
    echo json_encode($storeFileName,false);
}


function returnData($fileName,$uploadResult=true){
    return [
        'Data'=>[
            'url'=>$fileName,
        ],
        'Status'=>$uploadResult?1:0,
        'Message'=>$uploadResult?"上传成功":"上传失败"
    ];
}