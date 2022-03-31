import React, {FC, useContext, useEffect, useState} from "react";
import style from './style.module.scss';
import {DataContext} from "../../layout/layout.default";

interface IButtonDrop {
  list: {name: string, cb: () => void}[]
}

const ButtonDrop: FC<IButtonDrop> = ({list}) => {
  const { win } = useContext(DataContext)
  const [state, setState] = useState<boolean>(false);
  const clickDot = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    state ? setState(false) : setState(true);
  }

  useEffect(() => {
    if(state) setState(false);
  },[win])

  return (
    <div className={`${style.button_drop}`}>
      <div onClick={clickDot} className={`${style.button_drop__dot}`} />
      {state &&
        <div className={`flex flex-direction-column ${style.button_drop__fload}`}>
          {list.map((el, i) => (
            <button
              key={`list_btn-${i}`}
              onClick={el.cb}
              className={`${style.button_drop__btn}`}
            >{el.name}</button>
          ))}
        </div>
      }
    </div>
  )
}

export default ButtonDrop;