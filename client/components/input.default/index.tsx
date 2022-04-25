import React, {FC, useState, useRef} from "react";
import style from './style.module.scss';

enum EName {
  'name',
  'email',
  'password',
  'confirme',
  'filter'
}

interface IInputDefault {
  defaultValue?: string,
  placeholder?: string,
  classes?: string,
  classesLabel?: string,
  name: keyof typeof EName,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string,
  wrapper?: string,
  type: string,
  warning?: boolean,
}

const InputDefault: FC<IInputDefault> = ({warning, wrapper,change, name, label, classes, classesLabel, placeholder, defaultValue, type}) => {
  const errorNameRef = useRef<string>();
  const maxRef = useRef(30)
  const [simbol, setSimbol] = useState<number>(maxRef.current);

  switch (name) {
    case 'name': errorNameRef.current = 'имя'; break;
    case 'email': errorNameRef.current = 'email'; break;
    case 'password': errorNameRef.current = 'пароль'; break;
  }

  return (
    <div className={`${wrapper ? wrapper : ''}`}>
      {label && <label className={`${style.input_default__label}`}>{label}</label>}
      <div className={`${style.input_default__wrapper} ${classesLabel ? classesLabel : ''}`}>
        <input
          className={`${style.input_default__input} ${classes ? classes : ''} ${warning ? style.input_default__warning : ''}`}
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
      <span
        className={`${style.input_default__float_text} ${warning ? style.input_default__show_text : '' }`}
      >{`Некорректный ${errorNameRef.current}`}</span>
    </div>
  )
};

export default InputDefault;