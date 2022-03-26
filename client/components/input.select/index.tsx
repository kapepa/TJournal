import React, {FC, useEffect, useState} from "react";
import style from './style.module.scss';

interface IInputSelect{
  change: (data: {name: string, value: string}) => void,
  label: string,
  name: string,
  list: string[]
}

const InputSelect: FC<IInputSelect> = ({change, label,name, list}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<string>(list[0]);

  const clickSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    open ? setOpen(false) : setOpen(true)
  }

  const closeSelect = () => {
    setOpen(false)
  };

  useEffect(() => {
    if(window) window.addEventListener('click',closeSelect);
    return () => window.removeEventListener('click',closeSelect);
  },[])

  return (
    <div className={`${style.input_select__wrapper}`}>
      <label className={`${style.input_select__label}`}>{label}</label>
      <div onClick={clickSelect} className={`${style.input_select} ${open ? style.input_select__open : ''}`}>
        {select}
        {open &&
          <div className={`flex flex-direction-column ${style.input_select__drop}`}>
            {list.map((el, i) => {
              return <div
                key={`option-${i}`}
                className={`${style.input_select__option} ${ select === el ? style.input_select__active : '' }`}
                onClick={(e) => {
                  setSelect(el);
                  change({name, value: el});
                }}
                data-option={name}
              >{el}</div>
            })}
          </div>
        }
      </div>
    </div>
  )
};

export default InputSelect;