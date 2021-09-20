<?php

class Points extends Base{
    public static $table="Points";

    const STATUS_NEW='new';
    const STATUS_SOLVED='solved';
    const STATUS_GIVE_UP='give_up';
    const STATUS_ARCHIVED='archived';

    public function Index(){
        $pid=$this->get["id"] ?? 0;
        $this->post=json_decode($this->post,1);
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

    public function Search(){
        $this->post=json_decode($this->post,1);
        $sql="select * from ".static::$table." where keyword like '%".$this->post['keyword']."%' and Deleted=0 order by ID desc;";
        return self::returnActionResult(
            $this->pdo->getRows($sql),
            true,
            $sql
        );
    }

    public function Save(){
        $postData=json_decode($this->post,1);
        $point=$postData['point'];
        if (empty($point['keyword'])){
            return self::returnActionResult([],false,"keyword不能为空");
        }
        if (!isset($postData['PID'])){
            return self::returnActionResult([],false,"PID Error");
        }
        $pid=$postData['PID'];
        if (!empty($point['ID'])){
            // update
            $point['LastUpdateTime']=date("Y-m-d H:i:s");
            $this->handleSql($point,$point['ID'],'keyword');
        }else{
            unset($point['ID']);
            // insert
            $point['AddTime']=date("Y-m-d H:i:s");
            $point['LastUpdateTime']=date("Y-m-d H:i:s");
            empty($point['status']) && $point['status']=self::STATUS_NEW;
            $this->handleSql($point,0,'keyword');
        }
        $sql=sprintf("select ID,status from %s where keyword='%s'",static::$table,$point['keyword']);
        $point=$this->pdo->getFirstRow($sql);
        $pointsConnection=new PointsConnection();
        $pointsConnection->updatePointsConnection($pid,$point['ID']);
        return self::returnActionResult([
            'ID'=>$point['ID'],
            'Status'=>$point['status']
        ]);
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
            $sql=sprintf("select ID,keyword,status,Point from %s where ID=%d and status in (%s) and Deleted=0",static::$table,$pid,$staus);
        }else{
            $sql=sprintf("select ID,keyword,status,Point from %s where ID=%d and Deleted=0;",static::$table,$pid,$staus);
        }
        return $this->pdo->getFirstRow($sql);
    }
}