import React, {FC, useState, useRef} from "react";
import style from './style.module.scss';

interface IInputDefault {
  defaultValue?: string,
  placeholder?: string,
  classes?: string,
  classesLabel?: string,
  name: string,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string,
  wrapper?: string
  type: string
}

const InputDefault: FC<IInputDefault> = ({wrapper,change, name, label, classes, classesLabel, placeholder, defaultValue, type}) => {
  const maxRef = useRef(30)
  const [simbol, setSimbol] = useState<number>(maxRef.current);

  return (
    <div className={`${wrapper ? wrapper : ''}`}>
      {label && <label className={`${style.input_default__label}`}>{label}</label>}
      <div className={`${style.input_default__wrapper} ${classesLabel ? classesLabel : ''}`}>
        <input
          className={`${style.input_default__input} ${classes ? classes : ''}`}
          placeholder={placeholder ? placeholder : ''}
          defaultValue={defaultValue ? defaultValue : ''}
          name={name}
          onChange={(e) => {
            const val = (e.target as HTMLInputElement)
            change(e);
            setSimbol(maxRef.current - val.value.length);
          }}
          maxLength={30}
          type={type}
        />
        <span className={style.input_default__span}>{simbol}</span>
      </div>
    </div>
  )
};

export default InputDefault;