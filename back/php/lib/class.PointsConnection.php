<?php

class PointsConnection extends Base{
    public static $table="points_connection";
    public function getSubParentId($pid){
        $sql=sprintf("select SubPID from %s where PID=%d",static::$table,$pid);
        $dataBaseData=$this->pdo->getRows($sql);
        return array_column($dataBaseData,'SubPID');
    }
}