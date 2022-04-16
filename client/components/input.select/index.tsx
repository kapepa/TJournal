import React, {FC, useEffect, useState} from "react";
import style from './style.module.scss';

interface IInputSelect{
  change: (obj:{ name: string, val: string | boolean}) => void,
  label?: string,
  name: string,
  list: {name: string, val: boolean | string }[],
  selected: string | boolean | undefined,
  classes?: string,
}

const InputSelect: FC<IInputSelect> = ({change, label,name, list, selected, classes}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<any>(list.find(el => {return el.val === selected}));

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
    <div className={`${style.input_select__wrapper} ${classes ? classes : ''}`}>
      { label && <label className={`${style.input_select__label}`}>{label}</label>}
      <div onClick={clickSelect} className={`${style.input_select} ${open ? style.input_select__open : ''}`}>
        {select.name}
        {open &&
          <div className={`flex flex-direction-column ${style.input_select__drop}`}>
            {list.map((item, i) => {
              return <div
                key={`option-${i}`}
                className={`${style.input_select__option} ${ select.val === item.val ? style.input_select__active : '' }`}
                onClick={(e) => {
                  setSelect({ name: item.name, val: item.val });
                  change({ name, val: item.val });
                }}
                data-name={name}
                data-val={item.val}
              >{item.name}</div>
            })}
          </div>
        }
      </div>
    </div>
  )
};

export default InputSelect;