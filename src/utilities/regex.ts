export const nameRegx = /^[A-Za-z ]*$/;
export const entityRegx = /^[0-9A-Za-zÀ-ÿ\s,._+;()*~'#@!?&-]+$/;
export const nameNumRegx = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
export const onlyCharRegx =/^[a-zA-Z]*$/;
export const amountRegx =/^\d+(\.\d{1,2})?$/;
export const numberRegx =/^\d+(\.\d{1,2})?$/;
export const mobileRegx = /^[6-9]\d{9}$/;
export const mobileRegxplus91 = /^([0]|\+91)?[789]\d{9}$/;
export const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const plus91 ="+91"
export const panRegx =/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
export const numRegx =/^([1-9]?\d|100)$/
export const addPercentage ="%"
export const pincodeRegx =/^(\d{4}|\d{6})$/
export const ifscRegx =/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/
export const accountNumRegx = /^[0-9]+$/
export const GSTINRegx = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
export const  adhaarRegx= /^\d{12}$/