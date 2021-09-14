<?php

class Points extends Base{
    public static $table="Points";

    const STATUS_NEW='new';
    const STATUS_SOLVED='solved';
    const STATUS_GIVE_UP='give_up';
    const STATUS_ARCHIVED='archived';

    public function Index(){
        $pid=$this->get["id"] ?? 0;
        $status=$this->post["status"] ?? sprintf("%s,%s",self::STATUS_NEW,self::STATUS_SOLVED);
        $searchStatus=[];
        foreach (explode(",",$status) as $str){
            $searchStatus[]=sprintf("'%s'",$str);
        }
        $searchStatus=implode(",",$searchStatus);
        $pointsConnection=new PointsConnection();
        $subPids=$pointsConnection->getSubParentId($pid);
        if (empty($subPids)){
            return self::returnActionResult([]);
        }
        $returnData=[
            'points'=>[]
        ];
        foreach ($subPids as $subPid){
            $childrenPids=$pointsConnection->getSubParentId($subPid);
            $point=$this->getPointDetail($subPid,$searchStatus);
            if ($point){
                $point['children']=[];
                if (!empty($childrenPids)){
                    foreach ($childrenPids as $childrenPid){
                        $childrenPoint=$this->getPointDetail($childrenPid,$searchStatus);
                        if($childrenPoint){
                            $point['children'][]=$childrenPoint;
                        }
                    }
                }
                $returnData['points'][]=$point;
            }
        }
        return self::returnActionResult($returnData);
    }

    public function GetAPoint(){
        $id=$this->get['id'] ?? 0;
        if (!$id){
            return self::returnActionResult([],false,"id error");
        }
        $sql=sprintf("select * from %s where ID=%d",static::$table,$id);
        return self::returnActionResult(
            $this->pdo->getFirstRow($sql)
        );
    }

    public function getPointDetail($pid,$staus=''){
        if ($staus){
            $sql=sprintf("select ID,keyword,status from %s where ID=%d and status in (%s);",static::$table,$pid,$staus);
        }else{
            $sql=sprintf("select ID,keyword,status from %s where ID=%d;",static::$table,$pid,$staus);
        }
        return $this->pdo->getFirstRow($sql);
    }
}