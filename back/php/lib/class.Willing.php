<?php

class Willing extends Base{
    public static $table="Willing";

    public function Save(){
        $this->post=json_decode($this->post,1);
        $this->post['LastUpdateTime']=date("Y-m-d H:i:s");
        if (empty($this->post['note'])){
            return self::returnActionResult([],false,"Title can't be empty!");
        }
        empty($this->post['Point']) && $this->post['Point']=0;
        if (!empty($this->post['ID'])){
            // update
            $id=$this->post['ID'];
            unset($this->post['ID']);
            $this->handleSql($this->post,$id,'ID');
        }else{
            // insert
            $this->post['AddTime']=date("Y-m-d H:i:s");
            $this->handleSql($this->post,'','ID');
            $sql=sprintf("select ID from %s order by ID desc limit 1",static::$table);
            $willing=$this->pdo->getFirstRow($sql);
            $id=$willing['ID'];
        }
        return self::returnActionResult([
            'ID'=>$id
        ]);
    }
}