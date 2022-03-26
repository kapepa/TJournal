import React, {FC, useState} from "react";
import style from './style.module.scss';
import Checkbox from "../checkbox";

interface ICheckList {
  title: string,
  list: {name: string, checked: boolean}[],
  cb: (name: string, checked: boolean) => void,
}

const CheckList: FC<ICheckList> = ({title,list, cb}) => {
  const [state, setState] = useState(list)
  const clickFrame = (i: number) => {
    const clone = JSON.parse(JSON.stringify(state))
    const check = clone[i];
    clone.splice(i,1, {...check, checked: check.checked ? false : true})
    setState(clone)
  }

  return (
    <div className={`flex flex-direction-column ${style.check_list}`}>
      <h4 className={`${style.check_list__h4}`}>{title}</h4>
      {state.map((el, i) => (
        <div
          key={`check-${i}`}
          className={`flex align-items-center ${style.check_list__frame}`}
          onClick={clickFrame.bind(null, i)}
        ><Checkbox cb={cb} name={el.name} checked={el.checked} classes={style.check_list__box}/> {el.name}</div>
      ))}
    </div>
  )
}

export default CheckList;