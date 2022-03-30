import React, {FC, useState} from "react";
import style from './style.module.scss';

interface IButtonDrop {
  list: {name: string, cb: () => void}[]
}

const ButtonDrop: FC<IButtonDrop> = ({list}) => {
  const [state, setState] = useState<boolean>(false);
  const clickDot = () => {
    state ? setState(false) : setState(true);
  }

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