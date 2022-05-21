// import React from 'react';
// import logo from './logo.svg';
import "./App.css";

import Setting from "./componets/Setting";

import FullCalendar, { EventInput, EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import { format } from "date-fns/fp";
import * as holiday_jp from "@holiday-jp/holiday_jp";


// 現在の月を取得する関数
const thisMonth = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

// 日付成型関数
const formatDate = format("yyyy-MM-dd");

// シフト情報を作成
function createSchedule(): EventInput[] {


  // イベントを作成する日付の範囲
  const dateRange = {
    start: new Date(2022, 3, 1, 9),
    end: new Date(2023, 2, 31),
  };

  // 祝日
  const holidays = holiday_jp.between(dateRange.start, dateRange.end);

  // メンバー配列
  const memberArr: string[] = ["渡辺", "小川", "三好"];

  // 色配列
  const colorArr = [
    { text: "rgb(256, 256, 256)", background: "rgb(100, 181, 246)" },
    { text: "rgb(256, 256, 256)", background: "rgb(255, 167, 38)" },
    { text: "rgb(256, 256, 256)", background: "rgb(0, 150, 136)" },
  ];

  // 一人当たりの担当時間単位（デフォルト　1日）
  const timeUnit: number = 1;
  const eventArr: EventInput[] = [];
  let eventDate: Date = dateRange.start;
  let holidyaFlag: boolean;
  for (let i = 0, j = 0; i < 365; i++, j++) {
    if (j === memberArr.length) { j = 0; }
    holidyaFlag = false;

    // 祝日判定
    for (let k = 0; k < holidays.length; k++) {
      if (eventDate.getTime() == holidays[k].date.getTime()) {
        holidyaFlag = true;
        eventArr.push({
          title: `祝日: ${holidays[k].name}`,
          date: formatDate(eventDate),
          color: "rgb(256, 256, 256)",
          backgroundColor: "rgb(255, 112, 67)",
        });
        // console.log(`祝日${holidays[k].date}`);
      }
    }

    // 土日祝日を除き　イベント追加
    if (!holidyaFlag && (eventDate.getDay() != 0 && eventDate.getDay() != 6)) {
      eventArr.push({
        title: `担当者: ${memberArr[j]}`,
        date: formatDate(eventDate),
        color: colorArr[j].text,
        backgroundColor: colorArr[j].background,
      });
    }

    eventDate = new Date(eventDate.setDate(eventDate.getDate() + 1));
  }

  return eventArr;
}

const events = createSchedule();

function App() {
  return (
    <div>
      <Setting></Setting>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={allLocales}
        locale="ja"
        events={events}
        eventColor="#378006"
      />
    </div>
  );
}

export default App;
