import React, {FC, useState, useRef} from "react";
import style from './style.module.scss';

interface IInputDefault {
  defaultValue?: string,
  classes?: string,
  classesLabel?: string
  name: string,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDefault: FC<IInputDefault> = ({change, name, classes, classesLabel, defaultValue= ''}) => {
  const maxRef = useRef(30)
  const [simbol, setSimbol] = useState<number>(maxRef.current);
  return (
    <label className={`${style.input_default__label} ${classesLabel ? classesLabel : ''}`}>
      <input
        className={`${style.input_default__input} ${classes ? classes : ''}`}
        defaultValue={defaultValue}
        name={name}
        onChange={(e) => {
          const val = (e.target as HTMLInputElement)
          change(e);
          setSimbol(maxRef.current - val.value.length);
        }}
        maxLength={30}
      />
      <span className={style.input_default__span}>{simbol}</span>
    </label>
  )
};

export default InputDefault;