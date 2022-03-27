import React, {FC} from 'react';
import style from './style.module.scss';

interface ITimeCreate{
  time: Date,
}

const TimeCreate: FC<ITimeCreate> = ({time}) => {
  const data = new Date(time);
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const day = data.getDate();
  const month = data.getMonth() + 1;


  const calcDay = () => {
    const today = new Date(Date.now());
    const dayToday = today.getDate();
    const monthToday = today.getMonth() + 1;

    if(day === dayToday && month === monthToday) return 'сегодня';
    if((day - 1) === (dayToday - 1) && month === monthToday) return 'вчера';
    return `${dayToday}/${month}`
  }

  return (
    <div className={`${style.time_create}`}>
      {`${calcDay()} ${hours < 10 ? `0` + hours : hours}:${minutes < 10 ? `0` + minutes : minutes}`}
    </div>
  )
};

export default TimeCreate;