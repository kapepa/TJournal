import React, {FC} from "react";
import style from './style.module.scss';
import Checkbox from "../checkbox";
import {IList} from "../../dto/list";

interface ICheckList {
  title: string,
  list: any,
  cb: (name: any | string, checked: boolean) => void,
}

const CheckList: FC<ICheckList> = ({title,list, cb}) => {
  return (
    <div className={`flex flex-direction-column ${style.check_list}`}>
      <h4 className={`${style.check_list__h4}`}>{title}</h4>
      { list &&
        Object.keys(list).map((key,i) => (
          <div
            key={`check-${key}-${i}`}
            className={`flex align-items-center ${style.check_list__frame}`}
          ><Checkbox cb={cb} name={key} checked={list[key].checked} classes={style.check_list__box}/>{list[key].name}</div>
        ))
      }
    </div>
  )
}

export default CheckList;