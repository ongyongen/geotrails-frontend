import React from "react"

export type handleInputOnChange = (event:React.ChangeEvent<HTMLInputElement>) => void
export type handleButtonOnClick = (event:any) => void
export type IHandleNavigate = (path: string) => void

export interface INoInputComponent {
  (): JSX.Element
}

export interface IFetchedData {
  [key: string]: string | number;
}

export interface IFetchDataFunction {
  (): void
}