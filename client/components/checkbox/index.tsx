import React, {FC, useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import {IList} from "../../dto/list";

interface ICheckbox {
  name: string,
  classes?: string,
  checked: boolean,
  cb: (name: string, checked: boolean) => void,
}

const Checkbox: FC<ICheckbox> = ({name, checked, classes, cb}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<boolean>(checked);

  const clickBox = (e: React.MouseEvent<HTMLDivElement>) => {
    const checkbox = (inputRef.current as HTMLInputElement);
    checkbox.click();
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = (e.target as HTMLInputElement);
    if(state){
      input.checked = false;
      setState(false);
    } else {
      input.checked = true;
      setState(true);
    }
    cb(input.name, input.checked);
  }

  useEffect(() => {
    setState(checked)
  },[checked])

  return (
    <div onClick={clickBox} className={`${style.checkbox} ${classes ? classes : ''} ${state ? style.checkbox__active : ''}`}>
      <input name={name} ref={inputRef} onChange={changeInput} type="checkbox" checked={state} className={style.checkbox__input} />
    </div>
  )
}

export default Checkbox;